import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface AudioUploadResult {
  url: string;
  path: string;
  isFallback: boolean;
}

/**
 * Uploads a recorded detailing practice audio file to Supabase Storage
 * under the 'practice-audio' bucket.
 *
 * If Supabase Storage is offline, unconfigured, or the bucket has not been
 * created yet, it gracefully creates an in-memory object URL so audio playback
 * and user testing never break.
 */
export async function uploadPracticeAudio({
  audioBlob,
  campaignId,
  userId,
}: {
  audioBlob: Blob;
  campaignId: string;
  userId: string;
}): Promise<AudioUploadResult> {
  const localUrl = URL.createObjectURL(audioBlob);
  const timestamp = Date.now();
  const fileName = `${campaignId}/${userId}_${timestamp}.webm`;

  if (!isSupabaseConfigured()) {
    console.info("Supabase unconfigured, using local in-memory audio object URL");
    return {
      url: localUrl,
      path: fileName,
      isFallback: true,
    };
  }

  try {
    const { data, error } = await supabase.storage
      .from("practice-audio")
      .upload(fileName, audioBlob, {
        contentType: audioBlob.type || "audio/webm",
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.warn("Supabase Storage upload warning (falling back to local audio URL):", error.message);
      return {
        url: localUrl,
        path: fileName,
        isFallback: true,
      };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("practice-audio").getPublicUrl(data.path);

    return {
      url: publicUrl || localUrl,
      path: data.path,
      isFallback: false,
    };
  } catch (err: any) {
    console.warn("Storage upload exception, falling back to local URL:", err);
    return {
      url: localUrl,
      path: fileName,
      isFallback: true,
    };
  }
}
