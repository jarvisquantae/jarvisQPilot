-- ==============================================================================
-- Q-Pilot 2.0 — Vocabulary Tags: Pharmaceutical Terminology Ingestion
-- Migration: 20261019000000_vocabulary_tags.sql
--
-- Risk Tag → Scoring Action Mapping:
--   Block             → Prohibited claim: -25pt penalty + requires_human_review=true
--   Urgent PV flag    → Pharmacovigilance: requires_human_review=true, high-severity alert
--   PV flag           → Pharmacovigilance flag: route to supervisor queue
--   PV/Quality flag   → Quality + PV: route to supervisor queue
--   High-risk         → Caution: soft warning, potential review trigger
--   AE flag           → Adverse event mention: flag for human review
--   Caution           → Soft warning: noted in coaching but not penalized
--   No-risk           → Standard terminology: inject as vocabulary hint only
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.vocabulary_tags (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  therapy_area  TEXT NOT NULL DEFAULT 'All',
  category      TEXT NOT NULL,
  intent_tag    TEXT NOT NULL,
  risk_tag      TEXT NOT NULL CHECK (
    risk_tag IN (
      'No-risk',
      'Caution',
      'High-risk',
      'AE flag',
      'Block',
      'Urgent PV flag',
      'PV flag',
      'PV/Quality flag'
    )
  ),
  synonym_group   TEXT NOT NULL,  -- Canonical normalized form (e.g. ADVERSE_EVENT)
  spoken_variants TEXT[] DEFAULT '{}', -- Natural-language variants reps might say
  status          TEXT NOT NULL DEFAULT 'Approved for Demo',
  reviewer        TEXT DEFAULT 'Medical Advisor/Manager',
  source_basis    TEXT DEFAULT 'Demo vocabulary; medical review required before production',
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by therapy area & risk level
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

-- Allow anon read for development / demo environments
CREATE POLICY "Anon read vocabulary tags"
  ON public.vocabulary_tags FOR SELECT TO anon USING (true);

-- ==============================================================================
-- SEED: Vocabulary Tags from Vocabulary Tags.xlsx
-- Source: Demo vocabulary — medical review required before production use
-- Reviewer: Medical Advisor/Manager
-- ==============================================================================

INSERT INTO public.vocabulary_tags
  (therapy_area, category, intent_tag, risk_tag, synonym_group, spoken_variants, source_basis, status, reviewer)
VALUES

  -- ── CARDIOLOGY ──────────────────────────────────────────────────────────────
  ('Cardiology', 'Disease',        'General medical', 'No-risk',
   'HYPERTENSION',
   ARRAY['high blood pressure','hypertension','elevated BP','raised BP','BP problem'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('Cardiology', 'General medical','Efficacy',        'No-risk',
   'HYPERTENSION',
   ARRAY['hypertension control','BP lowering','blood pressure management'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('Cardiology', 'Disease status', 'Efficacy',        'No-risk',
   'UNCONTROLLED_HYPERTENSION',
   ARRAY['uncontrolled hypertension','poorly controlled BP','resistant hypertension'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('Cardiology', 'Safety/Emergency','Safety/Emergency','High-risk',
   'MYOCARDIAL_INFARCTION',
   ARRAY['heart attack','MI','myocardial infarction','cardiac event'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── DIABETES ────────────────────────────────────────────────────────────────
  ('Diabetes', 'Abbreviation', 'General medical', 'No-risk',
   'DIABETES_MELLITUS',
   ARRAY['diabetes','DM','diabetes mellitus','diabetic condition'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('Diabetes', 'Abbreviation', 'General medical', 'No-risk',
   'TYPE_2_DIABETES_MELLITUS',
   ARRAY['type 2 diabetes','T2D','T2DM','type two diabetes','adult-onset diabetes'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── ADVERSE EVENTS — ALL THERAPY AREAS ─────────────────────────────────────
  ('All', 'Safety',       'Safety',  'AE flag',
   'ADVERSE_EVENT',
   ARRAY['adverse event','AE','side effect','adverse reaction','unwanted effect','undesirable effect'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Abbreviation', 'Safety',  'AE flag',
   'ADVERSE_EVENT',
   ARRAY['AE','adverse event','side effect'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Abbreviation', 'Safety',  'AE flag',
   'ADVERSE_DRUG_REACTION',
   ARRAY['ADR','adverse drug reaction','drug reaction','drug side effect'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── DOSING ──────────────────────────────────────────────────────────────────
  ('All', 'Dosing', 'Dosage',        'No-risk',
   'DOSAGE',
   ARRAY['dose','dosage','milligrams','mg','daily dose','recommended dose','dosing'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Dosing', 'Dosage/Safety', 'Caution',
   'DOSE_ADJUSTMENT',
   ARRAY['dose adjustment','dose modification','reduce dose','titrate dose','dose titration'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── SPECIAL POPULATIONS ─────────────────────────────────────────────────────
  ('All', 'Special population', 'Dosage/Safety', 'Caution',
   'RENAL_IMPAIRMENT',
   ARRAY['kidney problem','renal impairment','reduced kidney function','CKD','chronic kidney disease','renal dysfunction'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Special population', 'Dosage/Safety', 'Caution',
   'HEPATIC_IMPAIRMENT',
   ARRAY['liver problem','hepatic impairment','liver disease','reduced liver function','hepatic dysfunction'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Special population', 'Safety',        'High-risk',
   'PREGNANCY',
   ARRAY['pregnancy','pregnant','expecting','maternal use','prenatal','gravid'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Special population', 'Safety',        'High-risk',
   'LACTATION',
   ARRAY['breastfeeding','lactation','nursing','breast milk','postpartum'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Special population', 'Safety',        'Caution',
   'ELDERLY',
   ARRAY['elderly','older patients','geriatric','aged patients','senior patients','over 65'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Special population', 'Safety',        'Caution',
   'PEDIATRIC_POPULATION',
   ARRAY['children','pediatric','kids','under 18','juvenile','paediatric'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── DRUG INTERACTIONS ───────────────────────────────────────────────────────
  ('All', 'Drug interaction', 'Interaction', 'Caution',
   'DRUG_DRUG_INTERACTION',
   ARRAY['drug interaction','drug-drug interaction','DDI','co-administration','concomitant use'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Drug interaction', 'Interaction', 'Caution',
   'DRUG_DRUG_INTERACTION_QUERY',
   ARRAY['any interactions','safe to combine','can I use with','interaction query'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── COMPLIANCE / OFF-LABEL ──────────────────────────────────────────────────
  ('All', 'Compliance', 'Off-label',       'High-risk',
   'OFF_LABEL_USE',
   ARRAY['off-label','unlicensed use','unapproved indication','beyond label','not in SmPC'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Compliance', 'Patient-specific','Block',
   'PATIENT_SPECIFIC_MEDICAL_ADVICE',
   ARRAY['specific advice for this patient','what should this patient take','prescribe for my patient','individual patient recommendation'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── EVIDENCE ────────────────────────────────────────────────────────────────
  ('All', 'Evidence', 'Evidence', 'No-risk',
   'CLINICAL_TRIAL',
   ARRAY['clinical trial','randomized trial','RCT','study','clinical study','trial data'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Evidence', 'Evidence', 'No-risk',
   'CLINICAL_ENDPOINT',
   ARRAY['endpoint','primary endpoint','secondary endpoint','clinical endpoint','outcome measure'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Evidence', 'Evidence', 'No-risk',
   'P_VALUE',
   ARRAY['p-value','statistical significance','p less than 0.05','statistically significant','p equals'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── RESPIRATORY ─────────────────────────────────────────────────────────────
  ('Respiratory', 'Disease event', 'Safety/Efficacy', 'Caution',
   'COPD_EXACERBATION',
   ARRAY['COPD exacerbation','flare-up','COPD attack','acute exacerbation','worsening COPD'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('Respiratory/Cardiology', 'Symptom', 'Dosage/Safety', 'Caution',
   'ASTHMA',
   ARRAY['asthma','bronchospasm','wheeze','wheezing','reactive airway disease'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── EVIDENCE GAP ────────────────────────────────────────────────────────────
  ('All', 'Evidence gap', 'No-data response', 'Caution',
   'EVIDENCE_NOT_AVAILABLE',
   ARRAY['no data available','we don''t have data','insufficient evidence','not studied','data not available'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── SAFETY — ADVERSE EVENT FULL HIERARCHY ───────────────────────────────────
  ('All', 'Safety', 'Safety', 'AE flag',
   'ADVERSE_EVENTS',
   ARRAY['adverse events','AEs','side effects','adverse reactions','undesirable effects'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Safety', 'Safety', 'AE flag',
   'SERIOUS_ADVERSE_EVENT',
   ARRAY['serious adverse event','SAE','serious side effect','serious reaction','serious AE'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Safety', 'Safety', 'Urgent PV flag',
   'FATAL_ADVERSE_EVENT',
   ARRAY['fatal adverse event','death','fatal reaction','fatal side effect','patient died','mortality'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Safety', 'Safety', 'Urgent PV flag',
   'HOSPITALIZATION_ADVERSE_EVENT',
   ARRAY['hospitalization','admitted to hospital','hospital admission','hospitalised','inpatient stay'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Safety/Special population', 'Safety', 'Urgent PV flag',
   'ADVERSE_EVENT_IN_PREGNANCY',
   ARRAY['adverse event in pregnancy','pregnancy complication','maternal adverse event','fetal adverse event'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  ('All', 'Safety/Special population', 'Safety', 'Urgent PV flag',
   'CONGENITAL_ANOMALY_CONCERN',
   ARRAY['birth defect','congenital anomaly','teratogenicity','fetal malformation','congenital abnormality'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── PRODUCT PERFORMANCE ─────────────────────────────────────────────────────
  ('All', 'Product performance', 'Efficacy/Safety', 'PV flag',
   'LACK_OF_EFFICACY',
   ARRAY['not working','lack of efficacy','LOE','drug not effective','no response to treatment','treatment failure'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager'),

  -- ── PRODUCT QUALITY ─────────────────────────────────────────────────────────
  ('All', 'Quality', 'Product complaint', 'PV/Quality flag',
   'PRODUCT_QUALITY_COMPLAINT',
   ARRAY['quality complaint','product complaint','damaged product','contamination','packaging defect','broken tablet'],
   'Demo vocabulary; medical review required before production', 'Approved for Demo', 'Medical Advisor/Manager')

ON CONFLICT DO NOTHING;
