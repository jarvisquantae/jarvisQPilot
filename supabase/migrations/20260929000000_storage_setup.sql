-- ==============================================================================
-- Supabase Storage Setup: practice-audio bucket and policies
-- ==============================================================================

-- 1. Create practice-audio bucket (public read for playback)
INSERT INTO storage.buckets (id, name, public)
VALUES ('practice-audio', 'practice-audio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Allow uploads by authenticated and anon users
DROP POLICY IF EXISTS "Practice audio upload policy" ON storage.objects;
CREATE POLICY "Practice audio upload policy"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'practice-audio');

-- 3. Allow public reading of practice audio recordings
DROP POLICY IF EXISTS "Practice audio select policy" ON storage.objects;
CREATE POLICY "Practice audio select policy"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'practice-audio');
