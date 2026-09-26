-- ==============================================================================
-- Q-Pilot 2.0 — Seed Data for Supabase
-- ==============================================================================

-- 1. Insert Products
INSERT INTO public.products (id, name, indication, therapy_area)
VALUES
  ('prd-cardiocare-a', 'CardioCare A', 'Hypertension', 'Cardiometabolic Health'),
  ('prd-neuroaid-b', 'NeuroAid B', 'Migraine', 'Neurology'),
  ('prd-metabocare-c', 'MetaboCare C', 'Type 2 Diabetes', 'Endocrinology')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Campaigns
INSERT INTO public.campaigns (id, slug, code, title, product_id, product_name, quarter, objective, due_date, status, progress, readiness, readiness_score, assigned)
VALUES
  (
    'cardiocare-a',
    'cardiocare-a',
    'CARD-Q2-01',
    'Spring Cardio Drive',
    'prd-cardiocare-a',
    'CardioCare A',
    'Q2 2025 Cardiovascular Care Campaign',
    'Drive appropriate use of CardioCare A as first-line therapy for hypertension.',
    '20 May 2025',
    'on_track',
    78,
    'ready',
    98,
    true
  ),
  (
    'neuroaid-b',
    'neuroaid-b',
    'NEUR-Q2-02',
    'Neuro Support Focus',
    'prd-neuroaid-b',
    'NeuroAid B',
    'Q2 2025 Neurology Campaign',
    'Position NeuroAid B for patients with frequent episodic migraine requiring preventive therapy.',
    '10 Jun 2025',
    'in_progress',
    45,
    'on_track',
    75,
    true
  ),
  (
    'metabocare-c',
    'metabocare-c',
    'META-Q2-03',
    'Metabolic Health Initiative',
    'prd-metabocare-c',
    'MetaboCare C',
    'Q2 2025 Metabolic Campaign',
    'Build awareness of MetaboCare C for patients needing additional glycaemic control.',
    '30 Jun 2025',
    'not_started',
    0,
    'not_started',
    0,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Promotional Inputs
INSERT INTO public.promotional_inputs (id, campaign_id, day, day_number, specialty, title, status, usage, format, validity, approved_by, last_updated, explanation)
VALUES
  (
    'inp-01',
    'cardiocare-a',
    'Monday',
    '19',
    'Cardiologist',
    'AHA Guideline Update',
    'completed',
    'For Doctor Use',
    'Digital Aid',
    '01 Apr – 30 Jun 2025',
    'Medical Affairs',
    '20 Apr 2025',
    'This aid highlights the clinical benefits of CardioCare A and supports appropriate patient selection and use.'
  ),
  (
    'inp-02',
    'neuroaid-b',
    'Tuesday',
    '20',
    'Neurologist',
    'Migraine Care Pathways',
    'pending',
    'For Doctor Use',
    'Digital Aid',
    '01 Apr – 30 Jun 2025',
    'Medical Affairs',
    '18 Apr 2025',
    'Explains the preventive care pathway and where NeuroAid B fits for episodic migraine patients.'
  ),
  (
    'inp-03',
    'metabocare-c',
    'Wednesday',
    '21',
    'Endocrinologist',
    'GLP-1 Patient Support',
    'pending',
    'For Doctor Use',
    'Leave Behind',
    '01 Apr – 30 Jun 2025',
    'Medical Affairs',
    '12 Apr 2025',
    'Supports the patient counselling conversation for treatment initiation and adherence.'
  ),
  (
    'inp-04',
    'cardiocare-a',
    'Friday',
    '23',
    'Cardiologist',
    'Patient Education Handout',
    'not_started',
    'For Patient Use',
    'Printed Handout',
    '01 Apr – 30 Jun 2025',
    'Medical Affairs',
    '08 Apr 2025',
    'Helps patients understand blood pressure control and the importance of daily adherence.'
  )
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Pitches
INSERT INTO public.pitches (id, campaign_id, status, total_duration, listening_focus, sections, objections)
VALUES
  (
    'pitch-cardiocare-a',
    'cardiocare-a',
    'approved',
    '09:32',
    '["Hook the HCP early with a relevant opener.", "Communicate the core value with clarity and confidence.", "Link benefits to patient outcomes.", "End with a confident close and next step."]'::jsonb,
    '[
      {
        "id": "sec-opening",
        "kind": "opening",
        "order": 1,
        "title": "Opening",
        "durationLabel": "00:48",
        "script": "Good morning Dr. Sharma, thank you for seeing me today. I would like to share how CardioCare A can help your patients better manage their cardiovascular risk and improve long-term outcomes.",
        "bullets": [],
        "reminders": ["Build rapport and thank the HCP for their time.", "State the purpose clearly and confidently.", "Link to patient benefit to create relevance."],
        "aiFocus": "Focus on a confident, warm opening that builds trust and sets the right tone.",
        "aiCriteria": ["Greeting & rapport", "Clarity of purpose", "Relevance to patient benefit"]
      },
      {
        "id": "sec-core",
        "kind": "core_messages",
        "order": 2,
        "title": "Core Messages",
        "durationLabel": "04:32",
        "script": "CardioCare A delivers proven and consistent BP reduction, with once daily dosing that simplifies treatment, and a strong safety and tolerability profile.",
        "bullets": [
          "CardioCare A delivers proven and consistent BP reduction.",
          "Once daily dosing simplifies treatment and improves adherence.",
          "Well tolerated with a strong safety profile."
        ],
        "reminders": ["Cover all three mandatory messages in order.", "Support each claim with the approved data.", "Pause and check for HCP agreement."],
        "aiFocus": "Ensure every mandatory message is delivered clearly, in approved language, without embellishment.",
        "aiCriteria": ["Mandatory message coverage", "Approved terminology", "Clarity of benefit"],
        "mandatory": true
      },
      {
        "id": "sec-closing",
        "kind": "closing",
        "order": 4,
        "title": "Closing",
        "durationLabel": "01:02",
        "script": "Based on what we discussed, would you consider CardioCare A for your next three uncontrolled hypertension patients? I will follow up in two weeks to see how they are progressing.",
        "bullets": [],
        "reminders": ["Make a clear, specific commitment ask.", "Agree on a follow-up date and next step.", "Thank the HCP and close warmly."],
        "aiFocus": "Check that the commitment ask is clear, specific, and includes a confirmed follow-up.",
        "aiCriteria": ["Specific ask made", "Follow-up agreed", "Warm, professional close"]
      }
    ]'::jsonb,
    '[
      {
        "id": "obj-1",
        "objection": "I already have a preferred first-line agent that works well.",
        "response": "Acknowledge the existing choice. Reiterate CardioCare A 24-hour BP control data and once-daily tolerability advantage."
      },
      {
        "id": "obj-2",
        "objection": "Cost is a concern for many of my patients.",
        "response": "Highlight the patient support program and the long-term economic value of avoiding dose escalation."
      }
    ]'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Rubrics
INSERT INTO public.assessment_rubrics (id, campaign_id, weights, mandatory_messages, approved_synonyms, prohibited_claims, readiness_threshold)
VALUES
  (
    'rubric-cardiocare-a',
    'cardiocare-a',
    '{"accuracy": 40, "adherence": 35, "mandatoryMessages": 25}'::jsonb,
    '["Proven and consistent BP reduction", "Once daily dosing simplifies treatment", "Well tolerated with a strong safety profile"]'::jsonb,
    '[
      {"spoken": "blood pressure drop", "approved": "BP reduction"},
      {"spoken": "single pill", "approved": "once daily dosing"},
      {"spoken": "no major side effects", "approved": "well tolerated with a strong safety profile"}
    ]'::jsonb,
    '["100% cure rate", "completely risk-free", "superior to all alternatives"]'::jsonb,
    80
  )
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Coaching Actions
INSERT INTO public.coaching_actions (id, tm_name, campaign_name, action, due_date, status)
VALUES
  ('act-01', 'Arjun Mehta', 'CardioCare A', 'Review objection handling for cost concerns', '28 Apr 2025', 'open'),
  ('act-02', 'Priya Sharma', 'NeuroAid B', 'Practice opening hook to increase engagement', '02 May 2025', 'in_progress'),
  ('act-03', 'Rohan Gupta', 'MetaboCare C', 'Ensure all 3 mandatory messages covered in sequence', '05 May 2025', 'open')
ON CONFLICT (id) DO NOTHING;
