-- ==============================================================================
-- Q-Pilot 2.0 — Initial Supabase Database Schema
-- ==============================================================================

-- 1. Profiles (linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('TM', 'SM', 'MM', 'ADMIN')),
  role_label TEXT NOT NULL,
  email TEXT NOT NULL,
  territory TEXT,
  reporting_manager TEXT,
  current_campaign_id TEXT,
  initials TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 2. Products
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  indication TEXT NOT NULL,
  therapy_area TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products viewable by authenticated users"
  ON public.products FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and MMs can manage products"
  ON public.products FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('MM', 'ADMIN')
    )
  );

-- 3. Campaigns
CREATE TABLE IF NOT EXISTS public.campaigns (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quarter TEXT NOT NULL,
  objective TEXT,
  due_date TEXT,
  status TEXT NOT NULL DEFAULT 'in_progress',
  progress INT NOT NULL DEFAULT 0,
  readiness TEXT NOT NULL DEFAULT 'not_started',
  readiness_score INT NOT NULL DEFAULT 0,
  assigned BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Campaigns viewable by authenticated users"
  ON public.campaigns FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and MMs can manage campaigns"
  ON public.campaigns FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('MM', 'ADMIN')
    )
  );

-- 4. Promotional Inputs (Detailing schedule / field assets)
CREATE TABLE IF NOT EXISTS public.promotional_inputs (
  id TEXT PRIMARY KEY,
  campaign_id TEXT REFERENCES public.campaigns(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  day_number TEXT NOT NULL,
  specialty TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  usage TEXT,
  format TEXT,
  validity TEXT,
  approved_by TEXT,
  last_updated TEXT,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.promotional_inputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Promotional inputs viewable by authenticated users"
  ON public.promotional_inputs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and MMs can manage promotional inputs"
  ON public.promotional_inputs FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('MM', 'ADMIN')
    )
  );

-- 5. Pitches & Detailing Structures
CREATE TABLE IF NOT EXISTS public.pitches (
  id TEXT PRIMARY KEY,
  campaign_id TEXT REFERENCES public.campaigns(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'approved',
  total_duration TEXT,
  listening_focus JSONB DEFAULT '[]'::jsonb,
  sections JSONB DEFAULT '[]'::jsonb,
  objections JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pitches viewable by authenticated users"
  ON public.pitches FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and MMs can manage pitches"
  ON public.pitches FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('MM', 'ADMIN')
    )
  );

-- 6. Assessment Rubrics
CREATE TABLE IF NOT EXISTS public.assessment_rubrics (
  id TEXT PRIMARY KEY,
  campaign_id TEXT REFERENCES public.campaigns(id) ON DELETE CASCADE,
  weights JSONB NOT NULL DEFAULT '{"accuracy": 40, "adherence": 35, "mandatoryMessages": 25}'::jsonb,
  mandatory_messages JSONB DEFAULT '[]'::jsonb,
  approved_synonyms JSONB DEFAULT '[]'::jsonb,
  prohibited_claims JSONB DEFAULT '[]'::jsonb,
  readiness_threshold INT DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.assessment_rubrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rubrics viewable by authenticated users"
  ON public.assessment_rubrics FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and MMs can manage rubrics"
  ON public.assessment_rubrics FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('MM', 'ADMIN')
    )
  );

-- 7. Practice Attempts
CREATE TABLE IF NOT EXISTS public.practice_attempts (
  id TEXT PRIMARY KEY,
  campaign_id TEXT REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL,
  date TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  rating NUMERIC NOT NULL DEFAULT 0,
  verdict TEXT,
  duration_seconds INT NOT NULL DEFAULT 0,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.practice_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own practice attempts"
  ON public.practice_attempts FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('SM', 'ADMIN')
    )
  );

CREATE POLICY "Users can insert their own practice attempts"
  ON public.practice_attempts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 8. Transcripts
CREATE TABLE IF NOT EXISTS public.transcripts (
  id TEXT PRIMARY KEY,
  attempt_id TEXT REFERENCES public.practice_attempts(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES public.campaigns(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'complete',
  turns JSONB DEFAULT '[]'::jsonb,
  vocabulary_mapping JSONB DEFAULT '[]'::jsonb,
  corrections JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.transcripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Transcripts viewable by authorized users"
  ON public.transcripts FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.practice_attempts pa
      WHERE pa.id = transcripts.attempt_id AND (
        pa.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('SM', 'ADMIN')
        )
      )
    )
  );

-- 9. Assessment Results
CREATE TABLE IF NOT EXISTS public.assessment_results (
  id TEXT PRIMARY KEY,
  attempt_id TEXT REFERENCES public.practice_attempts(id) ON DELETE CASCADE,
  campaign_id TEXT REFERENCES public.campaigns(id) ON DELETE CASCADE,
  accuracy INT NOT NULL DEFAULT 0,
  adherence INT NOT NULL DEFAULT 0,
  rating NUMERIC NOT NULL DEFAULT 0,
  readiness TEXT NOT NULL DEFAULT 'on_track',
  calculated_by TEXT DEFAULT 'application',
  positives JSONB DEFAULT '[]'::jsonb,
  improvements JSONB DEFAULT '[]'::jsonb,
  coverage JSONB DEFAULT '[]'::jsonb,
  requires_human_review BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assessment results viewable by authorized users"
  ON public.assessment_results FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.practice_attempts pa
      WHERE pa.id = assessment_results.attempt_id AND (
        pa.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('SM', 'ADMIN')
        )
      )
    )
  );

-- 10. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  time TEXT NOT NULL,
  unread BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own notifications"
  ON public.notifications FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- 11. Coaching Actions
CREATE TABLE IF NOT EXISTS public.coaching_actions (
  id TEXT PRIMARY KEY,
  tm_name TEXT NOT NULL,
  campaign_name TEXT NOT NULL,
  action TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coaching_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Coaching actions viewable by authenticated users"
  ON public.coaching_actions FOR SELECT TO authenticated USING (true);

CREATE POLICY "SMs and Admins can manage coaching actions"
  ON public.coaching_actions FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('SM', 'ADMIN')
    )
  );

-- Storage bucket creation (Note: also configurable in Supabase Dashboard)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('practice-audio', 'practice-audio', false),
  ('pitch-audio', 'pitch-audio', true),
  ('campaign-assets', 'campaign-assets', true)
ON CONFLICT (id) DO NOTHING;
