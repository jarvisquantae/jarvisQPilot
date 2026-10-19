-- ==============================================================================
-- Q-Pilot 2.0 — Vocabulary Tags Migration
-- Source: Vocabulary Tags.xlsx (Sheet 2: "500 Vocabulary Tags")
-- "Term Entered by User" → spoken_variants (colloquial / field rep language)
-- "Standard Term"        → synonym_group   (canonical clinical normalisation)
--
-- Risk Tag → Scoring Action:
--   Block           → Prohibited: -25pt penalty + requires_human_review=true
--   Urgent PV flag  → Pharmacovigilance: requires_human_review=true, alert SM
--   PV flag         → Route to supervisor review queue
--   PV/Quality flag → Quality + PV: route to supervisor review queue
--   High-risk       → Caution warning, potential review trigger
--   AE flag         → Adverse Event: flag for human review
--   Caution         → Soft coaching note, no score penalty
--   No-risk         → Vocabulary hint only (improves transcription accuracy)
--
-- Run this in: Supabase SQL Editor → New Query → Paste → Run
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.vocabulary_tags (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  therapy_area    TEXT NOT NULL DEFAULT 'All',
  category        TEXT NOT NULL,
  intent_tag      TEXT NOT NULL,
  risk_tag        TEXT NOT NULL CHECK (
    risk_tag IN (
      'No-risk', 'Caution', 'High-risk', 'AE flag',
      'Block', 'Urgent PV flag', 'PV flag', 'PV/Quality flag'
    )
  ),
  synonym_group    TEXT NOT NULL,
  spoken_variants  TEXT[] DEFAULT '{}',
  standard_term    TEXT,
  status           TEXT NOT NULL DEFAULT 'Approved for Demo',
  reviewer         TEXT DEFAULT 'Medical Advisor/Manager',
  source_basis     TEXT DEFAULT 'Demo vocabulary; medical review required before production',
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vocab_therapy_area  ON public.vocabulary_tags(therapy_area);
CREATE INDEX IF NOT EXISTS idx_vocab_risk_tag       ON public.vocabulary_tags(risk_tag);
CREATE INDEX IF NOT EXISTS idx_vocab_synonym_group  ON public.vocabulary_tags(synonym_group);

ALTER TABLE public.vocabulary_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vocabulary tags viewable by authenticated users"
  ON public.vocabulary_tags FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and MMs can manage vocabulary tags"
  ON public.vocabulary_tags FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('MM', 'ADMIN')
    )
  );

CREATE POLICY "Anon read vocabulary tags"
  ON public.vocabulary_tags FOR SELECT TO anon USING (true);


-- ==============================================================================
-- SEED: All 49 rows from Vocabulary Tags.xlsx Sheet 2
-- "Term Entered by User" values are stored as spoken_variants[]
-- These are the EXACT words field reps use — the model maps them to Synonym Group
-- ==============================================================================

INSERT INTO public.vocabulary_tags
  (therapy_area, category, intent_tag, risk_tag, synonym_group, standard_term, spoken_variants)
VALUES

  -- ── Row 1: HTN → Hypertension ──────────────────────────────────────────────
  ('Cardiology', 'Disease', 'General medical', 'No-risk',
   'HYPERTENSION', 'Hypertension',
   ARRAY['HTN', 'high blood pressure', 'hypertension', 'elevated BP', 'raised blood pressure', 'BP problem', 'High BP']),

  -- ── Row 3: BP uncontrolled → Uncontrolled Hypertension ─────────────────────
  ('Cardiology', 'Disease status', 'Efficacy', 'No-risk',
   'UNCONTROLLED_HYPERTENSION', 'Uncontrolled hypertension',
   ARRAY['BP uncontrolled', 'uncontrolled hypertension', 'poorly controlled BP', 'resistant hypertension', 'BP not controlled']),

  -- ── Rows 4-5: Heart attack / MI → Myocardial Infarction ────────────────────
  ('Cardiology', 'Disease event', 'Safety/Emergency', 'High-risk',
   'MYOCARDIAL_INFARCTION', 'Myocardial infarction',
   ARRAY['Heart attack', 'MI', 'myocardial infarction', 'cardiac event', 'heart event', 'coronary event']),

  -- ── Row 6: Sugar → Diabetes mellitus ───────────────────────────────────────
  ('Diabetes', 'Disease', 'General medical', 'No-risk',
   'DIABETES_MELLITUS', 'Diabetes mellitus',
   ARRAY['Sugar', 'diabetes', 'DM', 'diabetes mellitus', 'blood sugar problem', 'sugar disease']),

  -- ── Row 7: T2DM → Type 2 diabetes mellitus ─────────────────────────────────
  ('Diabetes', 'Abbreviation', 'General medical', 'No-risk',
   'TYPE_2_DIABETES_MELLITUS', 'Type 2 diabetes mellitus',
   ARRAY['T2DM', 'T2D', 'type 2 diabetes', 'type two diabetes', 'adult-onset diabetes', 'non-insulin-dependent diabetes']),

  -- ── Rows 8-9, 32: Side effect / AE / Adverse effect → Adverse Event ────────
  ('All', 'Safety', 'Safety', 'AE flag',
   'ADVERSE_EVENT', 'Adverse event',
   ARRAY['Side effect', 'AE', 'adverse event', 'adverse effect', 'unwanted effect', 'undesirable effect', 'undesired reaction']),

  -- ── Rows 10, 33-34: ADR / Adverse reaction / Drug reaction ─────────────────
  ('All', 'Abbreviation', 'Safety', 'AE flag',
   'ADVERSE_DRUG_REACTION', 'Adverse drug reaction',
   ARRAY['ADR', 'adverse drug reaction', 'adverse reaction', 'drug reaction', 'drug side effect', 'Drug reaction']),

  -- ── Row 11: Dose → Dosage ───────────────────────────────────────────────────
  ('All', 'Dosing', 'Dosage', 'No-risk',
   'DOSAGE', 'Dosage',
   ARRAY['Dose', 'dosage', 'milligrams', 'mg', 'daily dose', 'recommended dose', 'dosing regimen', 'tablet strength']),

  -- ── Row 12: Dose adjustment → Dose Adjustment ──────────────────────────────
  ('All', 'Dosing', 'Dosage/Safety', 'Caution',
   'DOSE_ADJUSTMENT', 'Dose adjustment',
   ARRAY['Dose adjustment', 'dose modification', 'reduce dose', 'titrate dose', 'dose titration', 'lower the dose', 'adjust the dose']),

  -- ── Rows 13-14: Kidney problem / Renal issue → Renal Impairment ─────────────
  ('All', 'Special population', 'Dosage/Safety', 'Caution',
   'RENAL_IMPAIRMENT', 'Renal impairment',
   ARRAY['Kidney problem', 'Renal issue', 'renal impairment', 'reduced kidney function', 'CKD', 'chronic kidney disease',
         'renal dysfunction', 'kidney failure', 'kidney disease', 'poor renal function']),

  -- ── Row 15: Liver issue → Hepatic Impairment ───────────────────────────────
  ('All', 'Special population', 'Dosage/Safety', 'Caution',
   'HEPATIC_IMPAIRMENT', 'Hepatic impairment',
   ARRAY['Liver issue', 'liver problem', 'hepatic impairment', 'liver disease', 'reduced liver function',
         'hepatic dysfunction', 'liver failure', 'liver damage', 'poor liver function']),

  -- ── Row 16: Pregnant woman → Pregnancy ─────────────────────────────────────
  ('All', 'Special population', 'Safety', 'High-risk',
   'PREGNANCY', 'Pregnancy',
   ARRAY['Pregnant woman', 'pregnancy', 'pregnant', 'expecting', 'maternal use', 'prenatal', 'gravid', 'with child']),

  -- ── Row 17: Lactating mother → Lactation ───────────────────────────────────
  ('All', 'Special population', 'Safety', 'High-risk',
   'LACTATION', 'Lactation',
   ARRAY['Lactating mother', 'breastfeeding', 'lactation', 'nursing', 'breast milk', 'postpartum', 'nursing mother']),

  -- ── Row 18: Old age → Elderly ───────────────────────────────────────────────
  ('All', 'Special population', 'Dosage/Safety', 'Caution',
   'ELDERLY', 'Elderly',
   ARRAY['Old age', 'elderly', 'older patients', 'geriatric', 'aged patients', 'senior patients',
         'over 65', 'old patients', 'aging patients', 'elderly population']),

  -- ── Row 19: Children → Pediatric Population ────────────────────────────────
  ('All', 'Special population', 'Safety', 'Caution',
   'PEDIATRIC_POPULATION', 'Pediatric population',
   ARRAY['Children', 'pediatric', 'kids', 'under 18', 'juvenile', 'paediatric', 'child patients', 'young patients']),

  -- ── Row 20: Drug interaction ────────────────────────────────────────────────
  ('All', 'Drug interaction', 'Interaction', 'Caution',
   'DRUG_DRUG_INTERACTION', 'Drug-drug interaction',
   ARRAY['Drug interaction', 'drug-drug interaction', 'DDI', 'co-administration', 'concomitant use',
         'combining drugs', 'taking together', 'together with']),

  -- ── Row 21: Can I give with Drug Y? ────────────────────────────────────────
  ('All', 'Drug interaction', 'Interaction', 'Caution',
   'DRUG_DRUG_INTERACTION_QUERY', 'Drug-drug interaction query',
   ARRAY['Can I give with Drug Y?', 'any interactions', 'safe to combine', 'can I use with',
         'interaction query', 'combined with other drugs', 'used alongside']),

  -- ── Rows 22-23: Off label use / Unapproved indication ──────────────────────
  ('All', 'Compliance', 'Off-label', 'High-risk',
   'OFF_LABEL_USE', 'Off-label use',
   ARRAY['Off label use', 'Unapproved indication', 'off-label', 'unlicensed use', 'unapproved use',
         'beyond label', 'not in SmPC', 'outside the indication', 'unapproved population']),

  -- ── Row 24: Can I give it to my patient? (BLOCK) ───────────────────────────
  ('All', 'Compliance', 'Patient-specific', 'Block',
   'PATIENT_SPECIFIC_MEDICAL_ADVICE', 'Patient-specific medical advice',
   ARRAY['Can I give it to my patient?', 'specific advice for this patient',
         'what should this patient take', 'prescribe for my patient',
         'individual patient recommendation', 'recommend for this specific patient']),

  -- ── Row 25: Trial → Clinical Trial ─────────────────────────────────────────
  ('All', 'Evidence', 'Evidence', 'No-risk',
   'CLINICAL_TRIAL', 'Clinical trial',
   ARRAY['Trial', 'clinical trial', 'randomized trial', 'RCT', 'study', 'clinical study',
         'trial data', 'research study', 'phase 3 trial', 'pivotal trial']),

  -- ── Row 26: Endpoint → Clinical Endpoint ───────────────────────────────────
  ('All', 'Evidence', 'Evidence', 'No-risk',
   'CLINICAL_ENDPOINT', 'Clinical endpoint',
   ARRAY['Endpoint', 'clinical endpoint', 'primary endpoint', 'secondary endpoint',
         'outcome measure', 'trial outcome', 'study endpoint']),

  -- ── Row 27: p value → P_VALUE ───────────────────────────────────────────────
  ('All', 'Evidence', 'Evidence', 'No-risk',
   'P_VALUE', 'p-value',
   ARRAY['p value', 'p-value', 'statistical significance', 'p less than 0.05',
         'statistically significant', 'p equals', 'p <0.001', 'significant result']),

  -- ── Row 28: Lung attack → COPD Exacerbation ────────────────────────────────
  ('Respiratory', 'Disease event', 'Safety/Efficacy', 'Caution',
   'COPD_EXACERBATION', 'COPD exacerbation',
   ARRAY['Lung attack', 'COPD exacerbation', 'flare-up', 'COPD attack',
         'acute exacerbation', 'worsening COPD', 'COPD flare']),

  -- ── Row 29: Breathlessness → Dyspnea ───────────────────────────────────────
  ('Respiratory/Cardiology', 'Symptom', 'Dosage/Safety', 'Caution',
   'DYSPNEA', 'Dyspnea',
   ARRAY['Breathlessness', 'dyspnea', 'shortness of breath', 'SOB', 'difficulty breathing',
         'breathing difficulty', 'breathless', 'can not breathe']),

  -- ── Row 30: No data available → Evidence Not Available ─────────────────────
  ('All', 'Evidence gap', 'No-data response', 'Caution',
   'EVIDENCE_NOT_AVAILABLE', 'Evidence not available',
   ARRAY['No data available', 'no data', 'we don''t have data', 'insufficient evidence',
         'not studied', 'data not available', 'no evidence', 'no clinical data']),

  -- ── Row 31: Side effects → Adverse Events ──────────────────────────────────
  ('All', 'Safety', 'Safety', 'AE flag',
   'ADVERSE_EVENTS', 'Adverse events',
   ARRAY['Side effects', 'adverse events', 'AEs', 'adverse reactions', 'undesirable effects',
         'unwanted events', 'safety concerns', 'reported side effects']),

  -- ── Rows 35-37: Serious side effect / SAE / Severe AE ──────────────────────
  ('All', 'Safety', 'Safety', 'AE flag',
   'SERIOUS_ADVERSE_EVENT', 'Serious adverse event',
   ARRAY['Serious side effect', 'SAE', 'Severe AE', 'serious adverse event',
         'serious reaction', 'life-threatening side effect', 'serious safety event']),

  -- ── Row 38: Death after medicine → Fatal Adverse Event ─────────────────────
  ('All', 'Safety', 'Safety', 'Urgent PV flag',
   'FATAL_ADVERSE_EVENT', 'Fatal adverse event',
   ARRAY['Death after medicine', 'fatal adverse event', 'death', 'patient died',
         'fatal reaction', 'fatal side effect', 'mortality', 'lethal reaction']),

  -- ── Row 39: Hospitalized after drug → Hospitalization AE ───────────────────
  ('All', 'Safety', 'Safety', 'Urgent PV flag',
   'HOSPITALIZATION_ADVERSE_EVENT', 'Hospitalization adverse event',
   ARRAY['Hospitalized after drug', 'hospitalization adverse event', 'admitted to hospital',
         'hospital admission', 'hospitalised', 'inpatient stay', 'emergency admission']),

  -- ── Rows 40-41: Medicine reaction in pregnancy ──────────────────────────────
  ('All', 'Safety/Special population', 'Safety', 'Urgent PV flag',
   'ADVERSE_EVENT_IN_PREGNANCY', 'Adverse event in pregnancy',
   ARRAY['Medicine reaction in pregnancy', 'adverse event in pregnancy',
         'pregnancy complication', 'maternal adverse event', 'reaction during pregnancy',
         'side effect in pregnancy']),

  -- ── Row 42: Birth defect concern → Congenital Anomaly ──────────────────────
  ('All', 'Safety/Special population', 'Safety', 'Urgent PV flag',
   'CONGENITAL_ANOMALY_CONCERN', 'Congenital anomaly concern',
   ARRAY['Birth defect concern', 'congenital anomaly', 'birth defect', 'teratogenicity',
         'fetal malformation', 'congenital abnormality', 'birth abnormality']),

  -- ── Rows 43-45: Lack of effect / Drug not working / No response ─────────────
  ('All', 'Product performance', 'Efficacy/Safety', 'PV flag',
   'LACK_OF_EFFICACY', 'Lack of efficacy',
   ARRAY['Lack of effect', 'Drug not working', 'No response to drug', 'lack of efficacy',
         'LOE', 'drug not effective', 'no response to treatment', 'treatment failure',
         'medicine not working', 'no improvement', 'drug failure']),

  -- ── Rows 46-49: Product complaint / Quality issue / Tablet broken ────────────
  ('All', 'Quality', 'Product complaint', 'PV/Quality flag',
   'PRODUCT_QUALITY_COMPLAINT', 'Product quality complaint',
   ARRAY['Product complaint', 'Quality issue', 'Tablet broken', 'Injection leakage',
         'product quality complaint', 'quality complaint', 'damaged product',
         'contamination', 'packaging defect', 'leaking injection', 'broken tablet',
         'packaging issue', 'product defect'])

ON CONFLICT DO NOTHING;
