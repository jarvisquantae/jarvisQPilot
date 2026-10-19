import type { VocabularyTag, VocabularyRiskTag } from "@/types";

/**
 * 500 Vocabulary Tags ingested from WhatsApp Vocabulary Tags.csv
 * Source: Clinical & medical affairs dictionary for RAG query classification,
 * synonym mapping, deterministic risk tagging, and compliance evaluation.
 */
export const VOCABULARY_TAGS_DATA: VocabularyTag[] = [
  {
    "id": "vocab-1",
    "no": 1,
    "termEnteredByUser": "HTN",
    "standardTerm": "Hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HYPERTENSION",
    "spokenVariants": [
      "HTN",
      "Hypertension",
      "High BP",
      "High blood pressure",
      "Raised BP"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-2",
    "no": 2,
    "termEnteredByUser": "High BP",
    "standardTerm": "Hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HYPERTENSION",
    "spokenVariants": [
      "HTN",
      "Hypertension",
      "High BP",
      "High blood pressure",
      "Raised BP"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-3",
    "no": 3,
    "termEnteredByUser": "BP uncontrolled",
    "standardTerm": "Uncontrolled hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease status",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "UNCONTROLLED_HYPERTENSION",
    "spokenVariants": [
      "BP uncontrolled",
      "Uncontrolled hypertension",
      "Uncontrolled BP"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-4",
    "no": 4,
    "termEnteredByUser": "Heart attack",
    "standardTerm": "Myocardial infarction",
    "therapyArea": "Cardiology",
    "category": "Disease event",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "MYOCARDIAL_INFARCTION",
    "spokenVariants": [
      "Heart attack",
      "Myocardial infarction",
      "MI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-5",
    "no": 5,
    "termEnteredByUser": "MI",
    "standardTerm": "Myocardial infarction",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "MYOCARDIAL_INFARCTION",
    "spokenVariants": [
      "Heart attack",
      "Myocardial infarction",
      "MI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-6",
    "no": 6,
    "termEnteredByUser": "Sugar",
    "standardTerm": "Diabetes mellitus",
    "therapyArea": "Diabetes",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "DIABETES_MELLITUS",
    "spokenVariants": [
      "Sugar",
      "Diabetes mellitus",
      "Diabetes",
      "DM"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-7",
    "no": 7,
    "termEnteredByUser": "T2DM",
    "standardTerm": "Type 2 diabetes mellitus",
    "therapyArea": "Diabetes",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "TYPE_2_DIABETES_MELLITUS",
    "spokenVariants": [
      "T2DM",
      "Type 2 diabetes mellitus",
      "Type 2 diabetes"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-8",
    "no": 8,
    "termEnteredByUser": "Side effect",
    "standardTerm": "Adverse event",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_EVENT",
    "spokenVariants": [
      "Side effect",
      "Adverse event",
      "AE",
      "Adverse effect"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-9",
    "no": 9,
    "termEnteredByUser": "AE",
    "standardTerm": "Adverse event",
    "therapyArea": "All",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_EVENT",
    "spokenVariants": [
      "Side effect",
      "Adverse event",
      "AE",
      "Adverse effect"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-10",
    "no": 10,
    "termEnteredByUser": "ADR",
    "standardTerm": "Adverse drug reaction",
    "therapyArea": "All",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_DRUG_REACTION",
    "spokenVariants": [
      "ADR",
      "Adverse drug reaction",
      "Adverse reaction",
      "Drug reaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-11",
    "no": 11,
    "termEnteredByUser": "Dose",
    "standardTerm": "Dosage",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "DOSAGE",
    "spokenVariants": [
      "Dose",
      "Dosage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-12",
    "no": 12,
    "termEnteredByUser": "Dose adjustment",
    "standardTerm": "Dose adjustment",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "DOSE_ADJUSTMENT",
    "spokenVariants": [
      "Dose adjustment"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-13",
    "no": 13,
    "termEnteredByUser": "Kidney problem",
    "standardTerm": "Renal impairment",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "RENAL_IMPAIRMENT",
    "spokenVariants": [
      "Kidney problem",
      "Renal impairment",
      "Renal issue"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-14",
    "no": 14,
    "termEnteredByUser": "Renal issue",
    "standardTerm": "Renal impairment",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "RENAL_IMPAIRMENT",
    "spokenVariants": [
      "Kidney problem",
      "Renal impairment",
      "Renal issue"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-15",
    "no": 15,
    "termEnteredByUser": "Liver issue",
    "standardTerm": "Hepatic impairment",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "HEPATIC_IMPAIRMENT",
    "spokenVariants": [
      "Liver issue",
      "Hepatic impairment"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-16",
    "no": 16,
    "termEnteredByUser": "Pregnant woman",
    "standardTerm": "Pregnancy",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "PREGNANCY",
    "spokenVariants": [
      "Pregnant woman",
      "Pregnancy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-17",
    "no": 17,
    "termEnteredByUser": "Lactating mother",
    "standardTerm": "Lactation",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "LACTATION",
    "spokenVariants": [
      "Lactating mother",
      "Lactation",
      "Breastfeeding",
      "Nursing mother"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-18",
    "no": 18,
    "termEnteredByUser": "Old age",
    "standardTerm": "Elderly",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "ELDERLY",
    "spokenVariants": [
      "Old age",
      "Elderly"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-19",
    "no": 19,
    "termEnteredByUser": "Children",
    "standardTerm": "Pediatric population",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "PEDIATRIC_POPULATION",
    "spokenVariants": [
      "Children",
      "Pediatric population",
      "Pediatric use",
      "Paediatric use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-20",
    "no": 20,
    "termEnteredByUser": "Drug interaction",
    "standardTerm": "Drug-drug interaction",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "DRUG_DRUG_INTERACTION",
    "spokenVariants": [
      "Drug interaction",
      "Drug-drug interaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-21",
    "no": 21,
    "termEnteredByUser": "Can I give with Drug Y?",
    "standardTerm": "Drug-drug interaction query",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "DRUG_DRUG_INTERACTION_QUERY",
    "spokenVariants": [
      "Can I give with Drug Y?",
      "Drug-drug interaction query"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-22",
    "no": 22,
    "termEnteredByUser": "Off label use",
    "standardTerm": "Off-label use",
    "therapyArea": "All",
    "category": "Compliance",
    "intentTag": "Off-label",
    "riskTag": "High-risk",
    "synonymGroup": "OFF_LABEL_USE",
    "spokenVariants": [
      "Off label use",
      "Off-label use",
      "Unapproved indication"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-23",
    "no": 23,
    "termEnteredByUser": "Unapproved indication",
    "standardTerm": "Off-label use",
    "therapyArea": "All",
    "category": "Compliance",
    "intentTag": "Off-label",
    "riskTag": "High-risk",
    "synonymGroup": "OFF_LABEL_USE",
    "spokenVariants": [
      "Off label use",
      "Off-label use",
      "Unapproved indication"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-24",
    "no": 24,
    "termEnteredByUser": "Can I give to my patient?",
    "standardTerm": "Patient-specific medical advice",
    "therapyArea": "All",
    "category": "Compliance",
    "intentTag": "Patient-specific",
    "riskTag": "Block",
    "synonymGroup": "PATIENT_SPECIFIC_MEDICAL_ADVICE",
    "spokenVariants": [
      "Can I give to my patient?",
      "Patient-specific medical advice"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-25",
    "no": 25,
    "termEnteredByUser": "Trial",
    "standardTerm": "Clinical trial",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_TRIAL",
    "spokenVariants": [
      "Trial",
      "Clinical trial"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-26",
    "no": 26,
    "termEnteredByUser": "Endpoint",
    "standardTerm": "Study endpoint",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "STUDY_ENDPOINT",
    "spokenVariants": [
      "Endpoint",
      "Study endpoint"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-27",
    "no": 27,
    "termEnteredByUser": "p value",
    "standardTerm": "p-value",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "P_VALUE",
    "spokenVariants": [
      "p value",
      "p-value"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-28",
    "no": 28,
    "termEnteredByUser": "Lung attack",
    "standardTerm": "COPD exacerbation",
    "therapyArea": "Respiratory",
    "category": "Disease event",
    "intentTag": "Safety/Efficacy",
    "riskTag": "Caution",
    "synonymGroup": "COPD_EXACERBATION",
    "spokenVariants": [
      "Lung attack",
      "COPD exacerbation",
      "COPD attack"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-29",
    "no": 29,
    "termEnteredByUser": "Breathlessness",
    "standardTerm": "Dyspnea",
    "therapyArea": "Respiratory/Cardiology",
    "category": "Symptom",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "DYSPNEA",
    "spokenVariants": [
      "Breathlessness",
      "Dyspnea",
      "Shortness of breath",
      "SOB"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-30",
    "no": 30,
    "termEnteredByUser": "No data available",
    "standardTerm": "Evidence not available",
    "therapyArea": "All",
    "category": "Evidence gap",
    "intentTag": "No-data response",
    "riskTag": "Caution",
    "synonymGroup": "EVIDENCE_NOT_AVAILABLE",
    "spokenVariants": [
      "No data available",
      "Evidence not available"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-31",
    "no": 31,
    "termEnteredByUser": "Side effects",
    "standardTerm": "Adverse events",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_EVENTS",
    "spokenVariants": [
      "Side effects",
      "Adverse events"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-32",
    "no": 32,
    "termEnteredByUser": "Adverse effect",
    "standardTerm": "Adverse event",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_EVENT",
    "spokenVariants": [
      "Side effect",
      "Adverse event",
      "AE",
      "Adverse effect"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-33",
    "no": 33,
    "termEnteredByUser": "Adverse reaction",
    "standardTerm": "Adverse drug reaction",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_DRUG_REACTION",
    "spokenVariants": [
      "ADR",
      "Adverse drug reaction",
      "Adverse reaction",
      "Drug reaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-34",
    "no": 34,
    "termEnteredByUser": "Drug reaction",
    "standardTerm": "Adverse drug reaction",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_DRUG_REACTION",
    "spokenVariants": [
      "ADR",
      "Adverse drug reaction",
      "Adverse reaction",
      "Drug reaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-35",
    "no": 35,
    "termEnteredByUser": "Serious side effect",
    "standardTerm": "Serious adverse event",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "SERIOUS_ADVERSE_EVENT",
    "spokenVariants": [
      "Serious side effect",
      "Serious adverse event",
      "SAE",
      "Severe AE"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-36",
    "no": 36,
    "termEnteredByUser": "SAE",
    "standardTerm": "Serious adverse event",
    "therapyArea": "All",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "SERIOUS_ADVERSE_EVENT",
    "spokenVariants": [
      "Serious side effect",
      "Serious adverse event",
      "SAE",
      "Severe AE"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-37",
    "no": 37,
    "termEnteredByUser": "Severe AE",
    "standardTerm": "Serious adverse event",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "SERIOUS_ADVERSE_EVENT",
    "spokenVariants": [
      "Serious side effect",
      "Serious adverse event",
      "SAE",
      "Severe AE"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-38",
    "no": 38,
    "termEnteredByUser": "Death after medicine",
    "standardTerm": "Fatal adverse event",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "FATAL_ADVERSE_EVENT",
    "spokenVariants": [
      "Death after medicine",
      "Fatal adverse event"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-39",
    "no": 39,
    "termEnteredByUser": "Hospitalized after drug",
    "standardTerm": "Hospitalization adverse event",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "HOSPITALIZATION_ADVERSE_EVENT",
    "spokenVariants": [
      "Hospitalized after drug",
      "Hospitalization adverse event",
      "Hospitalisation after medicine"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-40",
    "no": 40,
    "termEnteredByUser": "Hospitalisation after medicine",
    "standardTerm": "Hospitalization adverse event",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "HOSPITALIZATION_ADVERSE_EVENT",
    "spokenVariants": [
      "Hospitalized after drug",
      "Hospitalization adverse event",
      "Hospitalisation after medicine"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-41",
    "no": 41,
    "termEnteredByUser": "Medicine reaction in pregnancy",
    "standardTerm": "Adverse event in pregnancy",
    "therapyArea": "All",
    "category": "Safety/Special population",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "ADVERSE_EVENT_IN_PREGNANCY",
    "spokenVariants": [
      "Medicine reaction in pregnancy",
      "Adverse event in pregnancy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-42",
    "no": 42,
    "termEnteredByUser": "Birth defect concern",
    "standardTerm": "Congenital anomaly concern",
    "therapyArea": "All",
    "category": "Safety/Special population",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "CONGENITAL_ANOMALY_CONCERN",
    "spokenVariants": [
      "Birth defect concern",
      "Congenital anomaly concern"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-43",
    "no": 43,
    "termEnteredByUser": "Lack of effect",
    "standardTerm": "Lack of efficacy",
    "therapyArea": "All",
    "category": "Product performance",
    "intentTag": "Efficacy/Safety",
    "riskTag": "PV flag",
    "synonymGroup": "LACK_OF_EFFICACY",
    "spokenVariants": [
      "Lack of effect",
      "Lack of efficacy",
      "Drug not working",
      "No response to drug"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-44",
    "no": 44,
    "termEnteredByUser": "Drug not working",
    "standardTerm": "Lack of efficacy",
    "therapyArea": "All",
    "category": "Product performance",
    "intentTag": "Efficacy/Safety",
    "riskTag": "PV flag",
    "synonymGroup": "LACK_OF_EFFICACY",
    "spokenVariants": [
      "Lack of effect",
      "Lack of efficacy",
      "Drug not working",
      "No response to drug"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-45",
    "no": 45,
    "termEnteredByUser": "No response to drug",
    "standardTerm": "Lack of efficacy",
    "therapyArea": "All",
    "category": "Product performance",
    "intentTag": "Efficacy/Safety",
    "riskTag": "PV flag",
    "synonymGroup": "LACK_OF_EFFICACY",
    "spokenVariants": [
      "Lack of effect",
      "Lack of efficacy",
      "Drug not working",
      "No response to drug"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-46",
    "no": 46,
    "termEnteredByUser": "Product complaint",
    "standardTerm": "Product quality complaint",
    "therapyArea": "All",
    "category": "Quality",
    "intentTag": "Product complaint",
    "riskTag": "PV/Quality flag",
    "synonymGroup": "PRODUCT_QUALITY_COMPLAINT",
    "spokenVariants": [
      "Product complaint",
      "Product quality complaint",
      "Quality issue",
      "Tablet broken",
      "Injection leakage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-47",
    "no": 47,
    "termEnteredByUser": "Quality issue",
    "standardTerm": "Product quality complaint",
    "therapyArea": "All",
    "category": "Quality",
    "intentTag": "Product complaint",
    "riskTag": "PV/Quality flag",
    "synonymGroup": "PRODUCT_QUALITY_COMPLAINT",
    "spokenVariants": [
      "Product complaint",
      "Product quality complaint",
      "Quality issue",
      "Tablet broken",
      "Injection leakage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-48",
    "no": 48,
    "termEnteredByUser": "Tablet broken",
    "standardTerm": "Product quality complaint",
    "therapyArea": "All",
    "category": "Quality",
    "intentTag": "Product complaint",
    "riskTag": "PV/Quality flag",
    "synonymGroup": "PRODUCT_QUALITY_COMPLAINT",
    "spokenVariants": [
      "Product complaint",
      "Product quality complaint",
      "Quality issue",
      "Tablet broken",
      "Injection leakage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-49",
    "no": 49,
    "termEnteredByUser": "Injection leakage",
    "standardTerm": "Product quality complaint",
    "therapyArea": "All",
    "category": "Quality",
    "intentTag": "Product complaint",
    "riskTag": "PV/Quality flag",
    "synonymGroup": "PRODUCT_QUALITY_COMPLAINT",
    "spokenVariants": [
      "Product complaint",
      "Product quality complaint",
      "Quality issue",
      "Tablet broken",
      "Injection leakage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-50",
    "no": 50,
    "termEnteredByUser": "Wrong strength",
    "standardTerm": "Medication error",
    "therapyArea": "All",
    "category": "Medication safety",
    "intentTag": "Safety",
    "riskTag": "PV flag",
    "synonymGroup": "MEDICATION_ERROR",
    "spokenVariants": [
      "Wrong strength",
      "Medication error",
      "Wrong dose given"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-51",
    "no": 51,
    "termEnteredByUser": "Wrong dose given",
    "standardTerm": "Medication error",
    "therapyArea": "All",
    "category": "Medication safety",
    "intentTag": "Safety",
    "riskTag": "PV flag",
    "synonymGroup": "MEDICATION_ERROR",
    "spokenVariants": [
      "Wrong strength",
      "Medication error",
      "Wrong dose given"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-52",
    "no": 52,
    "termEnteredByUser": "Missed dose",
    "standardTerm": "Missed dose",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "MISSED_DOSE",
    "spokenVariants": [
      "Missed dose",
      "Forgot dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-53",
    "no": 53,
    "termEnteredByUser": "Forgot dose",
    "standardTerm": "Missed dose",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "MISSED_DOSE",
    "spokenVariants": [
      "Missed dose",
      "Forgot dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-54",
    "no": 54,
    "termEnteredByUser": "Overdose",
    "standardTerm": "Overdose",
    "therapyArea": "All",
    "category": "Medication safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "OVERDOSE",
    "spokenVariants": [
      "Overdose",
      "Took extra dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-55",
    "no": 55,
    "termEnteredByUser": "Took extra dose",
    "standardTerm": "Overdose",
    "therapyArea": "All",
    "category": "Medication safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "OVERDOSE",
    "spokenVariants": [
      "Overdose",
      "Took extra dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-56",
    "no": 56,
    "termEnteredByUser": "Under dose",
    "standardTerm": "Underdose",
    "therapyArea": "All",
    "category": "Medication safety",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "UNDERDOSE",
    "spokenVariants": [
      "Under dose",
      "Underdose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-57",
    "no": 57,
    "termEnteredByUser": "Dose titration",
    "standardTerm": "Dose titration",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "DOSE_TITRATION",
    "spokenVariants": [
      "Dose titration",
      "Titrate dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-58",
    "no": 58,
    "termEnteredByUser": "Titrate dose",
    "standardTerm": "Dose titration",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "DOSE_TITRATION",
    "spokenVariants": [
      "Dose titration",
      "Titrate dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-59",
    "no": 59,
    "termEnteredByUser": "Dose reduction",
    "standardTerm": "Dose reduction",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "DOSE_REDUCTION",
    "spokenVariants": [
      "Dose reduction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-60",
    "no": 60,
    "termEnteredByUser": "Dose escalation",
    "standardTerm": "Dose escalation",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "DOSE_ESCALATION",
    "spokenVariants": [
      "Dose escalation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-61",
    "no": 61,
    "termEnteredByUser": "Starting dose",
    "standardTerm": "Starting dose",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "STARTING_DOSE",
    "spokenVariants": [
      "Starting dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-62",
    "no": 62,
    "termEnteredByUser": "Maintenance dose",
    "standardTerm": "Maintenance dose",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "MAINTENANCE_DOSE",
    "spokenVariants": [
      "Maintenance dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-63",
    "no": 63,
    "termEnteredByUser": "Max dose",
    "standardTerm": "Maximum dose",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "MAXIMUM_DOSE",
    "spokenVariants": [
      "Max dose",
      "Maximum dose",
      "Maximum dosage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-64",
    "no": 64,
    "termEnteredByUser": "Maximum dosage",
    "standardTerm": "Maximum dose",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "MAXIMUM_DOSE",
    "spokenVariants": [
      "Max dose",
      "Maximum dose",
      "Maximum dosage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-65",
    "no": 65,
    "termEnteredByUser": "Route of administration",
    "standardTerm": "Route of administration",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "ROUTE_OF_ADMINISTRATION",
    "spokenVariants": [
      "Route of administration"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-66",
    "no": 66,
    "termEnteredByUser": "Oral use",
    "standardTerm": "Oral administration",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "ORAL_ADMINISTRATION",
    "spokenVariants": [
      "Oral use",
      "Oral administration"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-67",
    "no": 67,
    "termEnteredByUser": "Injection use",
    "standardTerm": "Parenteral administration",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "PARENTERAL_ADMINISTRATION",
    "spokenVariants": [
      "Injection use",
      "Parenteral administration"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-68",
    "no": 68,
    "termEnteredByUser": "SC injection",
    "standardTerm": "Subcutaneous administration",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "SUBCUTANEOUS_ADMINISTRATION",
    "spokenVariants": [
      "SC injection",
      "Subcutaneous administration"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-69",
    "no": 69,
    "termEnteredByUser": "IV injection",
    "standardTerm": "Intravenous administration",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "INTRAVENOUS_ADMINISTRATION",
    "spokenVariants": [
      "IV injection",
      "Intravenous administration"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-70",
    "no": 70,
    "termEnteredByUser": "With food",
    "standardTerm": "Administration with food",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "ADMINISTRATION_WITH_FOOD",
    "spokenVariants": [
      "With food",
      "Administration with food"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-71",
    "no": 71,
    "termEnteredByUser": "Empty stomach",
    "standardTerm": "Administration without food",
    "therapyArea": "All",
    "category": "Dosing",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "ADMINISTRATION_WITHOUT_FOOD",
    "spokenVariants": [
      "Empty stomach",
      "Administration without food"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-72",
    "no": 72,
    "termEnteredByUser": "Renal dose",
    "standardTerm": "Dose adjustment in renal impairment",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage",
    "riskTag": "Caution",
    "synonymGroup": "DOSE_ADJUSTMENT_IN_RENAL_IMPAIRMENT",
    "spokenVariants": [
      "Renal dose",
      "Dose adjustment in renal impairment"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-73",
    "no": 73,
    "termEnteredByUser": "CKD patient",
    "standardTerm": "Chronic kidney disease",
    "therapyArea": "Nephrology/All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "CHRONIC_KIDNEY_DISEASE",
    "spokenVariants": [
      "CKD patient",
      "Chronic kidney disease",
      "CKD",
      "Kidney disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-74",
    "no": 74,
    "termEnteredByUser": "eGFR low",
    "standardTerm": "Reduced estimated glomerular filtration rate",
    "therapyArea": "Nephrology/All",
    "category": "Lab/renal",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "REDUCED_ESTIMATED_GLOMERULAR_FILTRATION_RATE",
    "spokenVariants": [
      "eGFR low",
      "Reduced estimated glomerular filtration rate"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-75",
    "no": 75,
    "termEnteredByUser": "Dialysis patient",
    "standardTerm": "Dialysis population",
    "therapyArea": "Nephrology/All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "DIALYSIS_POPULATION",
    "spokenVariants": [
      "Dialysis patient",
      "Dialysis population"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-76",
    "no": 76,
    "termEnteredByUser": "Liver dose",
    "standardTerm": "Dose adjustment in hepatic impairment",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage",
    "riskTag": "Caution",
    "synonymGroup": "DOSE_ADJUSTMENT_IN_HEPATIC_IMPAIRMENT",
    "spokenVariants": [
      "Liver dose",
      "Dose adjustment in hepatic impairment",
      "Hepatic dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-77",
    "no": 77,
    "termEnteredByUser": "Hepatic dose",
    "standardTerm": "Dose adjustment in hepatic impairment",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage",
    "riskTag": "Caution",
    "synonymGroup": "DOSE_ADJUSTMENT_IN_HEPATIC_IMPAIRMENT",
    "spokenVariants": [
      "Liver dose",
      "Dose adjustment in hepatic impairment",
      "Hepatic dose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-78",
    "no": 78,
    "termEnteredByUser": "Child-Pugh",
    "standardTerm": "Child-Pugh classification",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "CHILD_PUGH_CLASSIFICATION",
    "spokenVariants": [
      "Child-Pugh",
      "Child-Pugh classification"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-79",
    "no": 79,
    "termEnteredByUser": "Elderly patient",
    "standardTerm": "Geriatric population",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "GERIATRIC_POPULATION",
    "spokenVariants": [
      "Elderly patient",
      "Geriatric population",
      "Senior citizen"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-80",
    "no": 80,
    "termEnteredByUser": "Senior citizen",
    "standardTerm": "Geriatric population",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "GERIATRIC_POPULATION",
    "spokenVariants": [
      "Elderly patient",
      "Geriatric population",
      "Senior citizen"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-81",
    "no": 81,
    "termEnteredByUser": "Pediatric use",
    "standardTerm": "Pediatric population",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "PEDIATRIC_POPULATION",
    "spokenVariants": [
      "Children",
      "Pediatric population",
      "Pediatric use",
      "Paediatric use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-82",
    "no": 82,
    "termEnteredByUser": "Paediatric use",
    "standardTerm": "Pediatric population",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "PEDIATRIC_POPULATION",
    "spokenVariants": [
      "Children",
      "Pediatric population",
      "Pediatric use",
      "Paediatric use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-83",
    "no": 83,
    "termEnteredByUser": "Pregnancy use",
    "standardTerm": "Use in pregnancy",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "USE_IN_PREGNANCY",
    "spokenVariants": [
      "Pregnancy use",
      "Use in pregnancy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-84",
    "no": 84,
    "termEnteredByUser": "Breastfeeding",
    "standardTerm": "Lactation",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "LACTATION",
    "spokenVariants": [
      "Lactating mother",
      "Lactation",
      "Breastfeeding",
      "Nursing mother"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-85",
    "no": 85,
    "termEnteredByUser": "Nursing mother",
    "standardTerm": "Lactation",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "LACTATION",
    "spokenVariants": [
      "Lactating mother",
      "Lactation",
      "Breastfeeding",
      "Nursing mother"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-86",
    "no": 86,
    "termEnteredByUser": "Fertility concern",
    "standardTerm": "Fertility",
    "therapyArea": "All",
    "category": "Special population",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "FERTILITY",
    "spokenVariants": [
      "Fertility concern",
      "Fertility"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-87",
    "no": 87,
    "termEnteredByUser": "Contraindication",
    "standardTerm": "Contraindication",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "CONTRAINDICATION",
    "spokenVariants": [
      "Contraindication",
      "Cannot use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-88",
    "no": 88,
    "termEnteredByUser": "Cannot use",
    "standardTerm": "Contraindication",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "CONTRAINDICATION",
    "spokenVariants": [
      "Contraindication",
      "Cannot use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-89",
    "no": 89,
    "termEnteredByUser": "Not recommended",
    "standardTerm": "Not recommended use",
    "therapyArea": "All",
    "category": "Safety/Compliance",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "NOT_RECOMMENDED_USE",
    "spokenVariants": [
      "Not recommended",
      "Not recommended use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-90",
    "no": 90,
    "termEnteredByUser": "Precaution",
    "standardTerm": "Precaution",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "PRECAUTION",
    "spokenVariants": [
      "Precaution"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-91",
    "no": 91,
    "termEnteredByUser": "Warning",
    "standardTerm": "Warning",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "WARNING",
    "spokenVariants": [
      "Warning"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-92",
    "no": 92,
    "termEnteredByUser": "Boxed warning",
    "standardTerm": "Boxed warning",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "BOXED_WARNING",
    "spokenVariants": [
      "Boxed warning",
      "Black box warning"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-93",
    "no": 93,
    "termEnteredByUser": "Black box warning",
    "standardTerm": "Boxed warning",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "BOXED_WARNING",
    "spokenVariants": [
      "Boxed warning",
      "Black box warning"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-94",
    "no": 94,
    "termEnteredByUser": "Drug allergy",
    "standardTerm": "Hypersensitivity",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPERSENSITIVITY",
    "spokenVariants": [
      "Drug allergy",
      "Hypersensitivity"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-95",
    "no": 95,
    "termEnteredByUser": "Allergic reaction",
    "standardTerm": "Hypersensitivity reaction",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPERSENSITIVITY_REACTION",
    "spokenVariants": [
      "Allergic reaction",
      "Hypersensitivity reaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-96",
    "no": 96,
    "termEnteredByUser": "Anaphylaxis",
    "standardTerm": "Anaphylaxis",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "ANAPHYLAXIS",
    "spokenVariants": [
      "Anaphylaxis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-97",
    "no": 97,
    "termEnteredByUser": "Rash after medicine",
    "standardTerm": "Drug rash",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DRUG_RASH",
    "spokenVariants": [
      "Rash after medicine",
      "Drug rash"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-98",
    "no": 98,
    "termEnteredByUser": "Swelling after medicine",
    "standardTerm": "Angioedema",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ANGIOEDEMA",
    "spokenVariants": [
      "Swelling after medicine",
      "Angioedema"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-99",
    "no": 99,
    "termEnteredByUser": "Lab abnormality",
    "standardTerm": "Laboratory abnormality",
    "therapyArea": "All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "LABORATORY_ABNORMALITY",
    "spokenVariants": [
      "Lab abnormality",
      "Laboratory abnormality"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-100",
    "no": 100,
    "termEnteredByUser": "LFT high",
    "standardTerm": "Elevated liver enzymes",
    "therapyArea": "All",
    "category": "Lab/safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ELEVATED_LIVER_ENZYMES",
    "spokenVariants": [
      "LFT high",
      "Elevated liver enzymes"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-101",
    "no": 101,
    "termEnteredByUser": "Creatinine high",
    "standardTerm": "Increased serum creatinine",
    "therapyArea": "Nephrology/All",
    "category": "Lab/safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "INCREASED_SERUM_CREATININE",
    "spokenVariants": [
      "Creatinine high",
      "Increased serum creatinine"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-102",
    "no": 102,
    "termEnteredByUser": "Platelet low",
    "standardTerm": "Thrombocytopenia",
    "therapyArea": "All",
    "category": "Lab/safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "THROMBOCYTOPENIA",
    "spokenVariants": [
      "Platelet low",
      "Thrombocytopenia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-103",
    "no": 103,
    "termEnteredByUser": "Hb low",
    "standardTerm": "Anemia",
    "therapyArea": "All",
    "category": "Lab/safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ANEMIA",
    "spokenVariants": [
      "Hb low",
      "Anemia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-104",
    "no": 104,
    "termEnteredByUser": "QT prolongation",
    "standardTerm": "QT interval prolongation",
    "therapyArea": "Cardiology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "QT_INTERVAL_PROLONGATION",
    "spokenVariants": [
      "QT prolongation",
      "QT interval prolongation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-105",
    "no": 105,
    "termEnteredByUser": "Can combine",
    "standardTerm": "Combination therapy query",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "COMBINATION_THERAPY_QUERY",
    "spokenVariants": [
      "Can combine",
      "Combination therapy query"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-106",
    "no": 106,
    "termEnteredByUser": "Use together",
    "standardTerm": "Concomitant use query",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "CONCOMITANT_USE_QUERY",
    "spokenVariants": [
      "Use together",
      "Concomitant use query"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-107",
    "no": 107,
    "termEnteredByUser": "Concomitant medication",
    "standardTerm": "Concomitant medication",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "CONCOMITANT_MEDICATION",
    "spokenVariants": [
      "Concomitant medication"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-108",
    "no": 108,
    "termEnteredByUser": "Interaction with antibiotic",
    "standardTerm": "Drug-drug interaction with antibiotic",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "DRUG_DRUG_INTERACTION_WITH_ANTIBIOTIC",
    "spokenVariants": [
      "Interaction with antibiotic",
      "Drug-drug interaction with antibiotic"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-109",
    "no": 109,
    "termEnteredByUser": "Interaction with anticoagulant",
    "standardTerm": "Drug-drug interaction with anticoagulant",
    "therapyArea": "Cardiology/All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "DRUG_DRUG_INTERACTION_WITH_ANTICOAGULANT",
    "spokenVariants": [
      "Interaction with anticoagulant",
      "Drug-drug interaction with anticoagulant"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-110",
    "no": 110,
    "termEnteredByUser": "Interaction with alcohol",
    "standardTerm": "Drug-alcohol interaction",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "DRUG_ALCOHOL_INTERACTION",
    "spokenVariants": [
      "Interaction with alcohol",
      "Drug-alcohol interaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-111",
    "no": 111,
    "termEnteredByUser": "Food interaction",
    "standardTerm": "Drug-food interaction",
    "therapyArea": "All",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "DRUG_FOOD_INTERACTION",
    "spokenVariants": [
      "Food interaction",
      "Drug-food interaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-112",
    "no": 112,
    "termEnteredByUser": "Guideline",
    "standardTerm": "Clinical guideline",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_GUIDELINE",
    "spokenVariants": [
      "Guideline",
      "Clinical guideline"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-113",
    "no": 113,
    "termEnteredByUser": "Recommendation",
    "standardTerm": "Clinical recommendation",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_RECOMMENDATION",
    "spokenVariants": [
      "Recommendation",
      "Clinical recommendation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-114",
    "no": 114,
    "termEnteredByUser": "Evidence",
    "standardTerm": "Clinical evidence",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_EVIDENCE",
    "spokenVariants": [
      "Evidence",
      "Clinical evidence"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-115",
    "no": 115,
    "termEnteredByUser": "Data",
    "standardTerm": "Clinical data",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_DATA",
    "spokenVariants": [
      "Data",
      "Clinical data"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-116",
    "no": 116,
    "termEnteredByUser": "Study",
    "standardTerm": "Clinical study",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_STUDY",
    "spokenVariants": [
      "Study",
      "Clinical study"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-117",
    "no": 117,
    "termEnteredByUser": "RCT",
    "standardTerm": "Randomized controlled trial",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "RANDOMIZED_CONTROLLED_TRIAL",
    "spokenVariants": [
      "RCT",
      "Randomized controlled trial",
      "Randomised trial"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-118",
    "no": 118,
    "termEnteredByUser": "Randomised trial",
    "standardTerm": "Randomized controlled trial",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "RANDOMIZED_CONTROLLED_TRIAL",
    "spokenVariants": [
      "RCT",
      "Randomized controlled trial",
      "Randomised trial"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-119",
    "no": 119,
    "termEnteredByUser": "Meta analysis",
    "standardTerm": "Meta-analysis",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "META_ANALYSIS",
    "spokenVariants": [
      "Meta analysis",
      "Meta-analysis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-120",
    "no": 120,
    "termEnteredByUser": "Systematic review",
    "standardTerm": "Systematic review",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "SYSTEMATIC_REVIEW",
    "spokenVariants": [
      "Systematic review"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-121",
    "no": 121,
    "termEnteredByUser": "Real world data",
    "standardTerm": "Real-world evidence",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "REAL_WORLD_EVIDENCE",
    "spokenVariants": [
      "Real world data",
      "Real-world evidence",
      "RWE"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-122",
    "no": 122,
    "termEnteredByUser": "RWE",
    "standardTerm": "Real-world evidence",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "REAL_WORLD_EVIDENCE",
    "spokenVariants": [
      "Real world data",
      "Real-world evidence",
      "RWE"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-123",
    "no": 123,
    "termEnteredByUser": "Observational study",
    "standardTerm": "Observational study",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "OBSERVATIONAL_STUDY",
    "spokenVariants": [
      "Observational study"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-124",
    "no": 124,
    "termEnteredByUser": "Cohort study",
    "standardTerm": "Cohort study",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "COHORT_STUDY",
    "spokenVariants": [
      "Cohort study"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-125",
    "no": 125,
    "termEnteredByUser": "Pooled analysis",
    "standardTerm": "Pooled analysis",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "POOLED_ANALYSIS",
    "spokenVariants": [
      "Pooled analysis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-126",
    "no": 126,
    "termEnteredByUser": "Subgroup",
    "standardTerm": "Subgroup analysis",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "SUBGROUP_ANALYSIS",
    "spokenVariants": [
      "Subgroup",
      "Subgroup analysis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-127",
    "no": 127,
    "termEnteredByUser": "Primary endpoint",
    "standardTerm": "Primary endpoint",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "PRIMARY_ENDPOINT",
    "spokenVariants": [
      "Primary endpoint"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-128",
    "no": 128,
    "termEnteredByUser": "Secondary endpoint",
    "standardTerm": "Secondary endpoint",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "SECONDARY_ENDPOINT",
    "spokenVariants": [
      "Secondary endpoint"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-129",
    "no": 129,
    "termEnteredByUser": "Hazard ratio",
    "standardTerm": "Hazard ratio",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "HAZARD_RATIO",
    "spokenVariants": [
      "Hazard ratio",
      "HR"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-130",
    "no": 130,
    "termEnteredByUser": "HR",
    "standardTerm": "Hazard ratio",
    "therapyArea": "All",
    "category": "Evidence",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "HAZARD_RATIO",
    "spokenVariants": [
      "Hazard ratio",
      "HR"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-131",
    "no": 131,
    "termEnteredByUser": "Hypertension",
    "standardTerm": "Hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HYPERTENSION",
    "spokenVariants": [
      "HTN",
      "Hypertension",
      "High BP",
      "High blood pressure",
      "Raised BP"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-132",
    "no": 132,
    "termEnteredByUser": "High blood pressure",
    "standardTerm": "Hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HYPERTENSION",
    "spokenVariants": [
      "HTN",
      "Hypertension",
      "High BP",
      "High blood pressure",
      "Raised BP"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-133",
    "no": 133,
    "termEnteredByUser": "Raised BP",
    "standardTerm": "Hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HYPERTENSION",
    "spokenVariants": [
      "HTN",
      "Hypertension",
      "High BP",
      "High blood pressure",
      "Raised BP"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-134",
    "no": 134,
    "termEnteredByUser": "Uncontrolled BP",
    "standardTerm": "Uncontrolled hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease status",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "UNCONTROLLED_HYPERTENSION",
    "spokenVariants": [
      "BP uncontrolled",
      "Uncontrolled hypertension",
      "Uncontrolled BP"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-135",
    "no": 135,
    "termEnteredByUser": "Resistant HTN",
    "standardTerm": "Resistant hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease status",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "RESISTANT_HYPERTENSION",
    "spokenVariants": [
      "Resistant HTN",
      "Resistant hypertension"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-136",
    "no": 136,
    "termEnteredByUser": "Stage 1 HTN",
    "standardTerm": "Stage 1 hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease status",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "STAGE_1_HYPERTENSION",
    "spokenVariants": [
      "Stage 1 HTN",
      "Stage 1 hypertension"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-137",
    "no": 137,
    "termEnteredByUser": "Stage 2 HTN",
    "standardTerm": "Stage 2 hypertension",
    "therapyArea": "Cardiology",
    "category": "Disease status",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "STAGE_2_HYPERTENSION",
    "spokenVariants": [
      "Stage 2 HTN",
      "Stage 2 hypertension"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-138",
    "no": 138,
    "termEnteredByUser": "Hypertensive crisis",
    "standardTerm": "Hypertensive crisis",
    "therapyArea": "Cardiology",
    "category": "Disease event",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "HYPERTENSIVE_CRISIS",
    "spokenVariants": [
      "Hypertensive crisis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-139",
    "no": 139,
    "termEnteredByUser": "Hypertensive emergency",
    "standardTerm": "Hypertensive emergency",
    "therapyArea": "Cardiology",
    "category": "Disease event",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "HYPERTENSIVE_EMERGENCY",
    "spokenVariants": [
      "Hypertensive emergency"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-140",
    "no": 140,
    "termEnteredByUser": "Low BP",
    "standardTerm": "Hypotension",
    "therapyArea": "Cardiology",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPOTENSION",
    "spokenVariants": [
      "Low BP",
      "Hypotension"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-141",
    "no": 141,
    "termEnteredByUser": "Hypotension",
    "standardTerm": "Hypotension",
    "therapyArea": "Cardiology",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPOTENSION",
    "spokenVariants": [
      "Low BP",
      "Hypotension"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-142",
    "no": 142,
    "termEnteredByUser": "Dizziness BP medicine",
    "standardTerm": "Dizziness associated with antihypertensive therapy",
    "therapyArea": "Cardiology",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DIZZINESS_ASSOCIATED_WITH_ANTIHYPERTENSIVE_THERAPY",
    "spokenVariants": [
      "Dizziness BP medicine",
      "Dizziness associated with antihypertensive therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-143",
    "no": 143,
    "termEnteredByUser": "CAD",
    "standardTerm": "Coronary artery disease",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "CORONARY_ARTERY_DISEASE",
    "spokenVariants": [
      "CAD",
      "Coronary artery disease",
      "Coronary disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-144",
    "no": 144,
    "termEnteredByUser": "Coronary disease",
    "standardTerm": "Coronary artery disease",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "CORONARY_ARTERY_DISEASE",
    "spokenVariants": [
      "CAD",
      "Coronary artery disease",
      "Coronary disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-145",
    "no": 145,
    "termEnteredByUser": "ACS",
    "standardTerm": "Acute coronary syndrome",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "ACUTE_CORONARY_SYNDROME",
    "spokenVariants": [
      "ACS",
      "Acute coronary syndrome"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-146",
    "no": 146,
    "termEnteredByUser": "Angina",
    "standardTerm": "Angina pectoris",
    "therapyArea": "Cardiology",
    "category": "Symptom/Disease",
    "intentTag": "General medical",
    "riskTag": "Caution",
    "synonymGroup": "ANGINA_PECTORIS",
    "spokenVariants": [
      "Angina",
      "Angina pectoris"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-147",
    "no": 147,
    "termEnteredByUser": "Chest pain",
    "standardTerm": "Chest pain",
    "therapyArea": "Cardiology",
    "category": "Symptom",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "CHEST_PAIN",
    "spokenVariants": [
      "Chest pain"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-148",
    "no": 148,
    "termEnteredByUser": "NSTEMI",
    "standardTerm": "Non-ST-elevation myocardial infarction",
    "therapyArea": "Cardiology",
    "category": "Disease event",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "NON_ST_ELEVATION_MYOCARDIAL_INFARCTION",
    "spokenVariants": [
      "NSTEMI",
      "Non-ST-elevation myocardial infarction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-149",
    "no": 149,
    "termEnteredByUser": "STEMI",
    "standardTerm": "ST-elevation myocardial infarction",
    "therapyArea": "Cardiology",
    "category": "Disease event",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "ST_ELEVATION_MYOCARDIAL_INFARCTION",
    "spokenVariants": [
      "STEMI",
      "ST-elevation myocardial infarction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-150",
    "no": 150,
    "termEnteredByUser": "Stroke",
    "standardTerm": "Cerebrovascular accident",
    "therapyArea": "Cardiology/Neurology",
    "category": "Disease event",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "CEREBROVASCULAR_ACCIDENT",
    "spokenVariants": [
      "Stroke",
      "Cerebrovascular accident",
      "CVA"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-151",
    "no": 151,
    "termEnteredByUser": "CVA",
    "standardTerm": "Cerebrovascular accident",
    "therapyArea": "Cardiology/Neurology",
    "category": "Abbreviation",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "CEREBROVASCULAR_ACCIDENT",
    "spokenVariants": [
      "Stroke",
      "Cerebrovascular accident",
      "CVA"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-152",
    "no": 152,
    "termEnteredByUser": "TIA",
    "standardTerm": "Transient ischemic attack",
    "therapyArea": "Cardiology/Neurology",
    "category": "Abbreviation",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "TRANSIENT_ISCHEMIC_ATTACK",
    "spokenVariants": [
      "TIA",
      "Transient ischemic attack"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-153",
    "no": 153,
    "termEnteredByUser": "Heart failure",
    "standardTerm": "Heart failure",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HEART_FAILURE",
    "spokenVariants": [
      "Heart failure",
      "HF"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-154",
    "no": 154,
    "termEnteredByUser": "HF",
    "standardTerm": "Heart failure",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HEART_FAILURE",
    "spokenVariants": [
      "Heart failure",
      "HF"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-155",
    "no": 155,
    "termEnteredByUser": "HFrEF",
    "standardTerm": "Heart failure with reduced ejection fraction",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "HEART_FAILURE_WITH_REDUCED_EJECTION_FRACTION",
    "spokenVariants": [
      "HFrEF",
      "Heart failure with reduced ejection fraction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-156",
    "no": 156,
    "termEnteredByUser": "HFpEF",
    "standardTerm": "Heart failure with preserved ejection fraction",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "HEART_FAILURE_WITH_PRESERVED_EJECTION_FRACTION",
    "spokenVariants": [
      "HFpEF",
      "Heart failure with preserved ejection fraction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-157",
    "no": 157,
    "termEnteredByUser": "Low EF",
    "standardTerm": "Reduced ejection fraction",
    "therapyArea": "Cardiology",
    "category": "Disease marker",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "REDUCED_EJECTION_FRACTION",
    "spokenVariants": [
      "Low EF",
      "Reduced ejection fraction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-158",
    "no": 158,
    "termEnteredByUser": "Ejection fraction",
    "standardTerm": "Ejection fraction",
    "therapyArea": "Cardiology",
    "category": "Disease marker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "EJECTION_FRACTION",
    "spokenVariants": [
      "Ejection fraction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-159",
    "no": 159,
    "termEnteredByUser": "Fluid overload",
    "standardTerm": "Volume overload",
    "therapyArea": "Cardiology",
    "category": "Symptom/Disease status",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "VOLUME_OVERLOAD",
    "spokenVariants": [
      "Fluid overload",
      "Volume overload"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-160",
    "no": 160,
    "termEnteredByUser": "Edema",
    "standardTerm": "Peripheral edema",
    "therapyArea": "Cardiology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PERIPHERAL_EDEMA",
    "spokenVariants": [
      "Edema",
      "Peripheral edema",
      "Swelling feet"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-161",
    "no": 161,
    "termEnteredByUser": "Swelling feet",
    "standardTerm": "Peripheral edema",
    "therapyArea": "Cardiology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PERIPHERAL_EDEMA",
    "spokenVariants": [
      "Edema",
      "Peripheral edema",
      "Swelling feet"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-162",
    "no": 162,
    "termEnteredByUser": "AF",
    "standardTerm": "Atrial fibrillation",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ATRIAL_FIBRILLATION",
    "spokenVariants": [
      "AF",
      "Atrial fibrillation",
      "A fib"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-163",
    "no": 163,
    "termEnteredByUser": "A fib",
    "standardTerm": "Atrial fibrillation",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ATRIAL_FIBRILLATION",
    "spokenVariants": [
      "AF",
      "Atrial fibrillation",
      "A fib"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-164",
    "no": 164,
    "termEnteredByUser": "Atrial flutter",
    "standardTerm": "Atrial flutter",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ATRIAL_FLUTTER",
    "spokenVariants": [
      "Atrial flutter"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-165",
    "no": 165,
    "termEnteredByUser": "Arrhythmia",
    "standardTerm": "Cardiac arrhythmia",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "CARDIAC_ARRHYTHMIA",
    "spokenVariants": [
      "Arrhythmia",
      "Cardiac arrhythmia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-166",
    "no": 166,
    "termEnteredByUser": "Palpitation",
    "standardTerm": "Palpitations",
    "therapyArea": "Cardiology",
    "category": "Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PALPITATIONS",
    "spokenVariants": [
      "Palpitation",
      "Palpitations"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-167",
    "no": 167,
    "termEnteredByUser": "Bradycardia",
    "standardTerm": "Bradycardia",
    "therapyArea": "Cardiology",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "BRADYCARDIA",
    "spokenVariants": [
      "Bradycardia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-168",
    "no": 168,
    "termEnteredByUser": "Tachycardia",
    "standardTerm": "Tachycardia",
    "therapyArea": "Cardiology",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "TACHYCARDIA",
    "spokenVariants": [
      "Tachycardia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-169",
    "no": 169,
    "termEnteredByUser": "Blood thinner",
    "standardTerm": "Anticoagulant",
    "therapyArea": "Cardiology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "ANTICOAGULANT",
    "spokenVariants": [
      "Blood thinner",
      "Anticoagulant"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-170",
    "no": 170,
    "termEnteredByUser": "Anticoagulant",
    "standardTerm": "Anticoagulant therapy",
    "therapyArea": "Cardiology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "ANTICOAGULANT_THERAPY",
    "spokenVariants": [
      "Anticoagulant",
      "Anticoagulant therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-171",
    "no": 171,
    "termEnteredByUser": "NOAC",
    "standardTerm": "Non-vitamin K antagonist oral anticoagulant",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "NON_VITAMIN_K_ANTAGONIST_ORAL_ANTICOAGULANT",
    "spokenVariants": [
      "NOAC",
      "Non-vitamin K antagonist oral anticoagulant"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-172",
    "no": 172,
    "termEnteredByUser": "DOAC",
    "standardTerm": "Direct oral anticoagulant",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "DIRECT_ORAL_ANTICOAGULANT",
    "spokenVariants": [
      "DOAC",
      "Direct oral anticoagulant"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-173",
    "no": 173,
    "termEnteredByUser": "Warfarin interaction",
    "standardTerm": "Warfarin drug interaction",
    "therapyArea": "Cardiology",
    "category": "Drug interaction",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "WARFARIN_DRUG_INTERACTION",
    "spokenVariants": [
      "Warfarin interaction",
      "Warfarin drug interaction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-174",
    "no": 174,
    "termEnteredByUser": "Bleeding risk",
    "standardTerm": "Bleeding risk",
    "therapyArea": "Cardiology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "BLEEDING_RISK",
    "spokenVariants": [
      "Bleeding risk"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-175",
    "no": 175,
    "termEnteredByUser": "Major bleeding",
    "standardTerm": "Major bleeding",
    "therapyArea": "Cardiology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "MAJOR_BLEEDING",
    "spokenVariants": [
      "Major bleeding"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-176",
    "no": 176,
    "termEnteredByUser": "GI bleed",
    "standardTerm": "Gastrointestinal bleeding",
    "therapyArea": "Cardiology/Gastroenterology",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "GASTROINTESTINAL_BLEEDING",
    "spokenVariants": [
      "GI bleed",
      "Gastrointestinal bleeding"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-177",
    "no": 177,
    "termEnteredByUser": "Hemorrhage",
    "standardTerm": "Hemorrhage",
    "therapyArea": "Cardiology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HEMORRHAGE",
    "spokenVariants": [
      "Hemorrhage"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-178",
    "no": 178,
    "termEnteredByUser": "Clot",
    "standardTerm": "Thrombus",
    "therapyArea": "Cardiology",
    "category": "Disease event",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "THROMBUS",
    "spokenVariants": [
      "Clot",
      "Thrombus"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-179",
    "no": 179,
    "termEnteredByUser": "DVT",
    "standardTerm": "Deep vein thrombosis",
    "therapyArea": "Cardiology",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "DEEP_VEIN_THROMBOSIS",
    "spokenVariants": [
      "DVT",
      "Deep vein thrombosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-180",
    "no": 180,
    "termEnteredByUser": "PE",
    "standardTerm": "Pulmonary embolism",
    "therapyArea": "Cardiology/Respiratory",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "PULMONARY_EMBOLISM",
    "spokenVariants": [
      "PE",
      "Pulmonary embolism"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-181",
    "no": 181,
    "termEnteredByUser": "Cholesterol",
    "standardTerm": "Dyslipidemia",
    "therapyArea": "Cardiology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "DYSLIPIDEMIA",
    "spokenVariants": [
      "Cholesterol",
      "Dyslipidemia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-182",
    "no": 182,
    "termEnteredByUser": "High LDL",
    "standardTerm": "Elevated LDL cholesterol",
    "therapyArea": "Cardiology",
    "category": "Lab/Disease",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "ELEVATED_LDL_CHOLESTEROL",
    "spokenVariants": [
      "High LDL",
      "Elevated LDL cholesterol"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-183",
    "no": 183,
    "termEnteredByUser": "LDL-C",
    "standardTerm": "Low-density lipoprotein cholesterol",
    "therapyArea": "Cardiology",
    "category": "Lab",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "LOW_DENSITY_LIPOPROTEIN_CHOLESTEROL",
    "spokenVariants": [
      "LDL-C",
      "Low-density lipoprotein cholesterol"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-184",
    "no": 184,
    "termEnteredByUser": "HDL",
    "standardTerm": "High-density lipoprotein cholesterol",
    "therapyArea": "Cardiology",
    "category": "Lab",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "HIGH_DENSITY_LIPOPROTEIN_CHOLESTEROL",
    "spokenVariants": [
      "HDL",
      "High-density lipoprotein cholesterol"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-185",
    "no": 185,
    "termEnteredByUser": "Triglyceride",
    "standardTerm": "Triglycerides",
    "therapyArea": "Cardiology",
    "category": "Lab",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "TRIGLYCERIDES",
    "spokenVariants": [
      "Triglyceride",
      "Triglycerides"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-186",
    "no": 186,
    "termEnteredByUser": "Diabetes",
    "standardTerm": "Diabetes mellitus",
    "therapyArea": "Diabetes",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "DIABETES_MELLITUS",
    "spokenVariants": [
      "Sugar",
      "Diabetes mellitus",
      "Diabetes",
      "DM"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-187",
    "no": 187,
    "termEnteredByUser": "DM",
    "standardTerm": "Diabetes mellitus",
    "therapyArea": "Diabetes",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "DIABETES_MELLITUS",
    "spokenVariants": [
      "Sugar",
      "Diabetes mellitus",
      "Diabetes",
      "DM"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-188",
    "no": 188,
    "termEnteredByUser": "Type 2 diabetes",
    "standardTerm": "Type 2 diabetes mellitus",
    "therapyArea": "Diabetes",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "TYPE_2_DIABETES_MELLITUS",
    "spokenVariants": [
      "T2DM",
      "Type 2 diabetes mellitus",
      "Type 2 diabetes"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-189",
    "no": 189,
    "termEnteredByUser": "Type 1 diabetes",
    "standardTerm": "Type 1 diabetes mellitus",
    "therapyArea": "Diabetes",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "TYPE_1_DIABETES_MELLITUS",
    "spokenVariants": [
      "Type 1 diabetes",
      "Type 1 diabetes mellitus",
      "T1DM"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-190",
    "no": 190,
    "termEnteredByUser": "T1DM",
    "standardTerm": "Type 1 diabetes mellitus",
    "therapyArea": "Diabetes",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "TYPE_1_DIABETES_MELLITUS",
    "spokenVariants": [
      "Type 1 diabetes",
      "Type 1 diabetes mellitus",
      "T1DM"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-191",
    "no": 191,
    "termEnteredByUser": "Blood sugar",
    "standardTerm": "Blood glucose",
    "therapyArea": "Diabetes",
    "category": "Lab",
    "intentTag": "Monitoring",
    "riskTag": "No-risk",
    "synonymGroup": "BLOOD_GLUCOSE",
    "spokenVariants": [
      "Blood sugar",
      "Blood glucose",
      "Glucose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-192",
    "no": 192,
    "termEnteredByUser": "Glucose",
    "standardTerm": "Blood glucose",
    "therapyArea": "Diabetes",
    "category": "Lab",
    "intentTag": "Monitoring",
    "riskTag": "No-risk",
    "synonymGroup": "BLOOD_GLUCOSE",
    "spokenVariants": [
      "Blood sugar",
      "Blood glucose",
      "Glucose"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-193",
    "no": 193,
    "termEnteredByUser": "Fasting sugar",
    "standardTerm": "Fasting plasma glucose",
    "therapyArea": "Diabetes",
    "category": "Lab",
    "intentTag": "Monitoring",
    "riskTag": "No-risk",
    "synonymGroup": "FASTING_PLASMA_GLUCOSE",
    "spokenVariants": [
      "Fasting sugar",
      "Fasting plasma glucose",
      "FPG"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-194",
    "no": 194,
    "termEnteredByUser": "FPG",
    "standardTerm": "Fasting plasma glucose",
    "therapyArea": "Diabetes",
    "category": "Abbreviation",
    "intentTag": "Monitoring",
    "riskTag": "No-risk",
    "synonymGroup": "FASTING_PLASMA_GLUCOSE",
    "spokenVariants": [
      "Fasting sugar",
      "Fasting plasma glucose",
      "FPG"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-195",
    "no": 195,
    "termEnteredByUser": "PP sugar",
    "standardTerm": "Postprandial glucose",
    "therapyArea": "Diabetes",
    "category": "Lab",
    "intentTag": "Monitoring",
    "riskTag": "No-risk",
    "synonymGroup": "POSTPRANDIAL_GLUCOSE",
    "spokenVariants": [
      "PP sugar",
      "Postprandial glucose",
      "PPG"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-196",
    "no": 196,
    "termEnteredByUser": "PPG",
    "standardTerm": "Postprandial glucose",
    "therapyArea": "Diabetes",
    "category": "Abbreviation",
    "intentTag": "Monitoring",
    "riskTag": "No-risk",
    "synonymGroup": "POSTPRANDIAL_GLUCOSE",
    "spokenVariants": [
      "PP sugar",
      "Postprandial glucose",
      "PPG"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-197",
    "no": 197,
    "termEnteredByUser": "HbA1c",
    "standardTerm": "Glycated hemoglobin",
    "therapyArea": "Diabetes",
    "category": "Lab",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "GLYCATED_HEMOGLOBIN",
    "spokenVariants": [
      "HbA1c",
      "Glycated hemoglobin",
      "A1C"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-198",
    "no": 198,
    "termEnteredByUser": "A1C",
    "standardTerm": "Glycated hemoglobin",
    "therapyArea": "Diabetes",
    "category": "Lab",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "GLYCATED_HEMOGLOBIN",
    "spokenVariants": [
      "HbA1c",
      "Glycated hemoglobin",
      "A1C"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-199",
    "no": 199,
    "termEnteredByUser": "High HbA1c",
    "standardTerm": "Elevated glycated hemoglobin",
    "therapyArea": "Diabetes",
    "category": "Disease status",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "ELEVATED_GLYCATED_HEMOGLOBIN",
    "spokenVariants": [
      "High HbA1c",
      "Elevated glycated hemoglobin"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-200",
    "no": 200,
    "termEnteredByUser": "Uncontrolled sugar",
    "standardTerm": "Uncontrolled diabetes",
    "therapyArea": "Diabetes",
    "category": "Disease status",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "UNCONTROLLED_DIABETES",
    "spokenVariants": [
      "Uncontrolled sugar",
      "Uncontrolled diabetes"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-201",
    "no": 201,
    "termEnteredByUser": "Poor glycemic control",
    "standardTerm": "Poor glycemic control",
    "therapyArea": "Diabetes",
    "category": "Disease status",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "POOR_GLYCEMIC_CONTROL",
    "spokenVariants": [
      "Poor glycemic control"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-202",
    "no": 202,
    "termEnteredByUser": "Glycemic control",
    "standardTerm": "Glycemic control",
    "therapyArea": "Diabetes",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "GLYCEMIC_CONTROL",
    "spokenVariants": [
      "Glycemic control"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-203",
    "no": 203,
    "termEnteredByUser": "Hypoglycemia",
    "standardTerm": "Hypoglycemia",
    "therapyArea": "Diabetes",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPOGLYCEMIA",
    "spokenVariants": [
      "Hypoglycemia",
      "Low sugar"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-204",
    "no": 204,
    "termEnteredByUser": "Low sugar",
    "standardTerm": "Hypoglycemia",
    "therapyArea": "Diabetes",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPOGLYCEMIA",
    "spokenVariants": [
      "Hypoglycemia",
      "Low sugar"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-205",
    "no": 205,
    "termEnteredByUser": "Severe hypo",
    "standardTerm": "Severe hypoglycemia",
    "therapyArea": "Diabetes",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "SEVERE_HYPOGLYCEMIA",
    "spokenVariants": [
      "Severe hypo",
      "Severe hypoglycemia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-206",
    "no": 206,
    "termEnteredByUser": "Hyperglycemia",
    "standardTerm": "Hyperglycemia",
    "therapyArea": "Diabetes",
    "category": "Disease status/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPERGLYCEMIA",
    "spokenVariants": [
      "Hyperglycemia",
      "High sugar"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-207",
    "no": 207,
    "termEnteredByUser": "High sugar",
    "standardTerm": "Hyperglycemia",
    "therapyArea": "Diabetes",
    "category": "Disease status/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPERGLYCEMIA",
    "spokenVariants": [
      "Hyperglycemia",
      "High sugar"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-208",
    "no": 208,
    "termEnteredByUser": "DKA",
    "standardTerm": "Diabetic ketoacidosis",
    "therapyArea": "Diabetes",
    "category": "Abbreviation",
    "intentTag": "Safety/Emergency",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "DIABETIC_KETOACIDOSIS",
    "spokenVariants": [
      "DKA",
      "Diabetic ketoacidosis",
      "Ketoacidosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-209",
    "no": 209,
    "termEnteredByUser": "Ketoacidosis",
    "standardTerm": "Diabetic ketoacidosis",
    "therapyArea": "Diabetes",
    "category": "Safety/Emergency",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "DIABETIC_KETOACIDOSIS",
    "spokenVariants": [
      "DKA",
      "Diabetic ketoacidosis",
      "Ketoacidosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-210",
    "no": 210,
    "termEnteredByUser": "Euglycemic DKA",
    "standardTerm": "Euglycemic diabetic ketoacidosis",
    "therapyArea": "Diabetes",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "EUGLYCEMIC_DIABETIC_KETOACIDOSIS",
    "spokenVariants": [
      "Euglycemic DKA",
      "Euglycemic diabetic ketoacidosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-211",
    "no": 211,
    "termEnteredByUser": "Genital infection",
    "standardTerm": "Genital mycotic infection",
    "therapyArea": "Diabetes",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "GENITAL_MYCOTIC_INFECTION",
    "spokenVariants": [
      "Genital infection",
      "Genital mycotic infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-212",
    "no": 212,
    "termEnteredByUser": "UTI",
    "standardTerm": "Urinary tract infection",
    "therapyArea": "Diabetes/Urology",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "URINARY_TRACT_INFECTION",
    "spokenVariants": [
      "UTI",
      "Urinary tract infection",
      "Urine infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-213",
    "no": 213,
    "termEnteredByUser": "Urine infection",
    "standardTerm": "Urinary tract infection",
    "therapyArea": "Diabetes/Urology",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "URINARY_TRACT_INFECTION",
    "spokenVariants": [
      "UTI",
      "Urinary tract infection",
      "Urine infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-214",
    "no": 214,
    "termEnteredByUser": "Weight loss drug",
    "standardTerm": "Anti-obesity/GLP-1 therapy query",
    "therapyArea": "Diabetes/Obesity",
    "category": "Treatment class",
    "intentTag": "Efficacy/Safety",
    "riskTag": "Caution",
    "synonymGroup": "ANTI_OBESITY_GLP_1_THERAPY_QUERY",
    "spokenVariants": [
      "Weight loss drug",
      "Anti-obesity/GLP-1 therapy query"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-215",
    "no": 215,
    "termEnteredByUser": "Obesity",
    "standardTerm": "Obesity",
    "therapyArea": "Diabetes/Obesity",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "OBESITY",
    "spokenVariants": [
      "Obesity"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-216",
    "no": 216,
    "termEnteredByUser": "BMI",
    "standardTerm": "Body mass index",
    "therapyArea": "Diabetes/Obesity",
    "category": "Measure",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "BODY_MASS_INDEX",
    "spokenVariants": [
      "BMI",
      "Body mass index"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-217",
    "no": 217,
    "termEnteredByUser": "Metformin",
    "standardTerm": "Metformin",
    "therapyArea": "Diabetes",
    "category": "Molecule",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "METFORMIN",
    "spokenVariants": [
      "Metformin"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-218",
    "no": 218,
    "termEnteredByUser": "SGLT2",
    "standardTerm": "Sodium-glucose cotransporter 2 inhibitor",
    "therapyArea": "Diabetes/Cardiology/Nephrology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "SODIUM_GLUCOSE_COTRANSPORTER_2_INHIBITOR",
    "spokenVariants": [
      "SGLT2",
      "Sodium-glucose cotransporter 2 inhibitor",
      "SGLT2i"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-219",
    "no": 219,
    "termEnteredByUser": "SGLT2i",
    "standardTerm": "Sodium-glucose cotransporter 2 inhibitor",
    "therapyArea": "Diabetes/Cardiology/Nephrology",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "SODIUM_GLUCOSE_COTRANSPORTER_2_INHIBITOR",
    "spokenVariants": [
      "SGLT2",
      "Sodium-glucose cotransporter 2 inhibitor",
      "SGLT2i"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-220",
    "no": 220,
    "termEnteredByUser": "GLP1",
    "standardTerm": "Glucagon-like peptide-1 receptor agonist",
    "therapyArea": "Diabetes/Obesity",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "GLUCAGON_LIKE_PEPTIDE_1_RECEPTOR_AGONIST",
    "spokenVariants": [
      "GLP1",
      "Glucagon-like peptide-1 receptor agonist",
      "GLP-1 RA"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-221",
    "no": 221,
    "termEnteredByUser": "GLP-1 RA",
    "standardTerm": "Glucagon-like peptide-1 receptor agonist",
    "therapyArea": "Diabetes/Obesity",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "GLUCAGON_LIKE_PEPTIDE_1_RECEPTOR_AGONIST",
    "spokenVariants": [
      "GLP1",
      "Glucagon-like peptide-1 receptor agonist",
      "GLP-1 RA"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-222",
    "no": 222,
    "termEnteredByUser": "DPP4",
    "standardTerm": "Dipeptidyl peptidase-4 inhibitor",
    "therapyArea": "Diabetes",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "DIPEPTIDYL_PEPTIDASE_4_INHIBITOR",
    "spokenVariants": [
      "DPP4",
      "Dipeptidyl peptidase-4 inhibitor",
      "DPP-4 inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-223",
    "no": 223,
    "termEnteredByUser": "DPP-4 inhibitor",
    "standardTerm": "Dipeptidyl peptidase-4 inhibitor",
    "therapyArea": "Diabetes",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "DIPEPTIDYL_PEPTIDASE_4_INHIBITOR",
    "spokenVariants": [
      "DPP4",
      "Dipeptidyl peptidase-4 inhibitor",
      "DPP-4 inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-224",
    "no": 224,
    "termEnteredByUser": "Insulin",
    "standardTerm": "Insulin therapy",
    "therapyArea": "Diabetes",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "INSULIN_THERAPY",
    "spokenVariants": [
      "Insulin",
      "Insulin therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-225",
    "no": 225,
    "termEnteredByUser": "Basal insulin",
    "standardTerm": "Basal insulin therapy",
    "therapyArea": "Diabetes",
    "category": "Treatment class",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "BASAL_INSULIN_THERAPY",
    "spokenVariants": [
      "Basal insulin",
      "Basal insulin therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-226",
    "no": 226,
    "termEnteredByUser": "Bolus insulin",
    "standardTerm": "Prandial insulin therapy",
    "therapyArea": "Diabetes",
    "category": "Treatment class",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "PRANDIAL_INSULIN_THERAPY",
    "spokenVariants": [
      "Bolus insulin",
      "Prandial insulin therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-227",
    "no": 227,
    "termEnteredByUser": "Premix insulin",
    "standardTerm": "Premixed insulin therapy",
    "therapyArea": "Diabetes",
    "category": "Treatment class",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "PREMIXED_INSULIN_THERAPY",
    "spokenVariants": [
      "Premix insulin",
      "Premixed insulin therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-228",
    "no": 228,
    "termEnteredByUser": "Sulfonylurea",
    "standardTerm": "Sulfonylurea therapy",
    "therapyArea": "Diabetes",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "SULFONYLUREA_THERAPY",
    "spokenVariants": [
      "Sulfonylurea",
      "Sulfonylurea therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-229",
    "no": 229,
    "termEnteredByUser": "TZD",
    "standardTerm": "Thiazolidinedione",
    "therapyArea": "Diabetes",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "THIAZOLIDINEDIONE",
    "spokenVariants": [
      "TZD",
      "Thiazolidinedione"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-230",
    "no": 230,
    "termEnteredByUser": "Pioglitazone",
    "standardTerm": "Pioglitazone",
    "therapyArea": "Diabetes",
    "category": "Molecule",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "PIOGLITAZONE",
    "spokenVariants": [
      "Pioglitazone"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-231",
    "no": 231,
    "termEnteredByUser": "Semaglutide",
    "standardTerm": "Semaglutide",
    "therapyArea": "Diabetes/Obesity",
    "category": "Molecule",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "SEMAGLUTIDE",
    "spokenVariants": [
      "Semaglutide"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-232",
    "no": 232,
    "termEnteredByUser": "Empagliflozin",
    "standardTerm": "Empagliflozin",
    "therapyArea": "Diabetes/Cardiology/Nephrology",
    "category": "Molecule",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "EMPAGLIFLOZIN",
    "spokenVariants": [
      "Empagliflozin"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-233",
    "no": 233,
    "termEnteredByUser": "Dapagliflozin",
    "standardTerm": "Dapagliflozin",
    "therapyArea": "Diabetes/Cardiology/Nephrology",
    "category": "Molecule",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "DAPAGLIFLOZIN",
    "spokenVariants": [
      "Dapagliflozin"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-234",
    "no": 234,
    "termEnteredByUser": "Tirzepatide",
    "standardTerm": "Tirzepatide",
    "therapyArea": "Diabetes/Obesity",
    "category": "Molecule",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "TIRZEPATIDE",
    "spokenVariants": [
      "Tirzepatide"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-235",
    "no": 235,
    "termEnteredByUser": "Nausea GLP1",
    "standardTerm": "Nausea associated with GLP-1 therapy",
    "therapyArea": "Diabetes/Obesity",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "NAUSEA_ASSOCIATED_WITH_GLP_1_THERAPY",
    "spokenVariants": [
      "Nausea GLP1",
      "Nausea associated with GLP-1 therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-236",
    "no": 236,
    "termEnteredByUser": "Vomiting GLP1",
    "standardTerm": "Vomiting associated with GLP-1 therapy",
    "therapyArea": "Diabetes/Obesity",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "VOMITING_ASSOCIATED_WITH_GLP_1_THERAPY",
    "spokenVariants": [
      "Vomiting GLP1",
      "Vomiting associated with GLP-1 therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-237",
    "no": 237,
    "termEnteredByUser": "Pancreatitis risk",
    "standardTerm": "Pancreatitis risk",
    "therapyArea": "Diabetes/Gastroenterology",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "PANCREATITIS_RISK",
    "spokenVariants": [
      "Pancreatitis risk"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-238",
    "no": 238,
    "termEnteredByUser": "Thyroid cancer warning",
    "standardTerm": "Thyroid C-cell tumor warning",
    "therapyArea": "Diabetes/Endocrinology",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "THYROID_C_CELL_TUMOR_WARNING",
    "spokenVariants": [
      "Thyroid cancer warning",
      "Thyroid C-cell tumor warning"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-239",
    "no": 239,
    "termEnteredByUser": "Diabetic kidney disease",
    "standardTerm": "Diabetic kidney disease",
    "therapyArea": "Diabetes/Nephrology",
    "category": "Disease",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "DIABETIC_KIDNEY_DISEASE",
    "spokenVariants": [
      "Diabetic kidney disease",
      "DKD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-240",
    "no": 240,
    "termEnteredByUser": "DKD",
    "standardTerm": "Diabetic kidney disease",
    "therapyArea": "Diabetes/Nephrology",
    "category": "Abbreviation",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "DIABETIC_KIDNEY_DISEASE",
    "spokenVariants": [
      "Diabetic kidney disease",
      "DKD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-241",
    "no": 241,
    "termEnteredByUser": "COPD",
    "standardTerm": "Chronic obstructive pulmonary disease",
    "therapyArea": "Respiratory",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "CHRONIC_OBSTRUCTIVE_PULMONARY_DISEASE",
    "spokenVariants": [
      "COPD",
      "Chronic obstructive pulmonary disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-242",
    "no": 242,
    "termEnteredByUser": "Chronic bronchitis",
    "standardTerm": "Chronic bronchitis",
    "therapyArea": "Respiratory",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "CHRONIC_BRONCHITIS",
    "spokenVariants": [
      "Chronic bronchitis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-243",
    "no": 243,
    "termEnteredByUser": "Emphysema",
    "standardTerm": "Emphysema",
    "therapyArea": "Respiratory",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "EMPHYSEMA",
    "spokenVariants": [
      "Emphysema"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-244",
    "no": 244,
    "termEnteredByUser": "Asthma",
    "standardTerm": "Asthma",
    "therapyArea": "Respiratory",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ASTHMA",
    "spokenVariants": [
      "Asthma",
      "Bronchial asthma"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-245",
    "no": 245,
    "termEnteredByUser": "Bronchial asthma",
    "standardTerm": "Asthma",
    "therapyArea": "Respiratory",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ASTHMA",
    "spokenVariants": [
      "Asthma",
      "Bronchial asthma"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-246",
    "no": 246,
    "termEnteredByUser": "Asthma attack",
    "standardTerm": "Asthma exacerbation",
    "therapyArea": "Respiratory",
    "category": "Disease event",
    "intentTag": "Safety/Efficacy",
    "riskTag": "Caution",
    "synonymGroup": "ASTHMA_EXACERBATION",
    "spokenVariants": [
      "Asthma attack",
      "Asthma exacerbation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-247",
    "no": 247,
    "termEnteredByUser": "Exacerbation",
    "standardTerm": "Exacerbation",
    "therapyArea": "Respiratory",
    "category": "Disease event",
    "intentTag": "Safety/Efficacy",
    "riskTag": "Caution",
    "synonymGroup": "EXACERBATION",
    "spokenVariants": [
      "Exacerbation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-248",
    "no": 248,
    "termEnteredByUser": "COPD attack",
    "standardTerm": "COPD exacerbation",
    "therapyArea": "Respiratory",
    "category": "Disease event",
    "intentTag": "Safety/Efficacy",
    "riskTag": "Caution",
    "synonymGroup": "COPD_EXACERBATION",
    "spokenVariants": [
      "Lung attack",
      "COPD exacerbation",
      "COPD attack"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-249",
    "no": 249,
    "termEnteredByUser": "Flare up",
    "standardTerm": "Disease exacerbation",
    "therapyArea": "Respiratory",
    "category": "Disease event",
    "intentTag": "Safety/Efficacy",
    "riskTag": "Caution",
    "synonymGroup": "DISEASE_EXACERBATION",
    "spokenVariants": [
      "Flare up",
      "Disease exacerbation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-250",
    "no": 250,
    "termEnteredByUser": "Wheezing",
    "standardTerm": "Wheezing",
    "therapyArea": "Respiratory",
    "category": "Symptom",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "WHEEZING",
    "spokenVariants": [
      "Wheezing"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-251",
    "no": 251,
    "termEnteredByUser": "Cough",
    "standardTerm": "Cough",
    "therapyArea": "Respiratory",
    "category": "Symptom",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "COUGH",
    "spokenVariants": [
      "Cough"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-252",
    "no": 252,
    "termEnteredByUser": "Dry cough",
    "standardTerm": "Dry cough",
    "therapyArea": "Respiratory",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DRY_COUGH",
    "spokenVariants": [
      "Dry cough"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-253",
    "no": 253,
    "termEnteredByUser": "Sputum",
    "standardTerm": "Sputum production",
    "therapyArea": "Respiratory",
    "category": "Symptom",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "SPUTUM_PRODUCTION",
    "spokenVariants": [
      "Sputum",
      "Sputum production",
      "Phlegm"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-254",
    "no": 254,
    "termEnteredByUser": "Phlegm",
    "standardTerm": "Sputum production",
    "therapyArea": "Respiratory",
    "category": "Symptom",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "SPUTUM_PRODUCTION",
    "spokenVariants": [
      "Sputum",
      "Sputum production",
      "Phlegm"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-255",
    "no": 255,
    "termEnteredByUser": "Shortness of breath",
    "standardTerm": "Dyspnea",
    "therapyArea": "Respiratory/Cardiology",
    "category": "Symptom",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "DYSPNEA",
    "spokenVariants": [
      "Breathlessness",
      "Dyspnea",
      "Shortness of breath",
      "SOB"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-256",
    "no": 256,
    "termEnteredByUser": "SOB",
    "standardTerm": "Dyspnea",
    "therapyArea": "Respiratory/Cardiology",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "DYSPNEA",
    "spokenVariants": [
      "Breathlessness",
      "Dyspnea",
      "Shortness of breath",
      "SOB"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-257",
    "no": 257,
    "termEnteredByUser": "Oxygen low",
    "standardTerm": "Hypoxemia",
    "therapyArea": "Respiratory",
    "category": "Symptom/Lab",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "HYPOXEMIA",
    "spokenVariants": [
      "Oxygen low",
      "Hypoxemia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-258",
    "no": 258,
    "termEnteredByUser": "SpO2 low",
    "standardTerm": "Low oxygen saturation",
    "therapyArea": "Respiratory",
    "category": "Lab/Symptom",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "LOW_OXYGEN_SATURATION",
    "spokenVariants": [
      "SpO2 low",
      "Low oxygen saturation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-259",
    "no": 259,
    "termEnteredByUser": "Rescue inhaler",
    "standardTerm": "Reliever inhaler",
    "therapyArea": "Respiratory",
    "category": "Treatment class",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "RELIEVER_INHALER",
    "spokenVariants": [
      "Rescue inhaler",
      "Reliever inhaler"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-260",
    "no": 260,
    "termEnteredByUser": "Preventer inhaler",
    "standardTerm": "Controller inhaler",
    "therapyArea": "Respiratory",
    "category": "Treatment class",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "CONTROLLER_INHALER",
    "spokenVariants": [
      "Preventer inhaler",
      "Controller inhaler"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-261",
    "no": 261,
    "termEnteredByUser": "Controller inhaler",
    "standardTerm": "Controller inhaler",
    "therapyArea": "Respiratory",
    "category": "Treatment class",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "CONTROLLER_INHALER",
    "spokenVariants": [
      "Preventer inhaler",
      "Controller inhaler"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-262",
    "no": 262,
    "termEnteredByUser": "Reliever inhaler",
    "standardTerm": "Reliever inhaler",
    "therapyArea": "Respiratory",
    "category": "Treatment class",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "RELIEVER_INHALER",
    "spokenVariants": [
      "Rescue inhaler",
      "Reliever inhaler"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-263",
    "no": 263,
    "termEnteredByUser": "ICS",
    "standardTerm": "Inhaled corticosteroid",
    "therapyArea": "Respiratory",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "INHALED_CORTICOSTEROID",
    "spokenVariants": [
      "ICS",
      "Inhaled corticosteroid"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-264",
    "no": 264,
    "termEnteredByUser": "LABA",
    "standardTerm": "Long-acting beta2 agonist",
    "therapyArea": "Respiratory",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "LONG_ACTING_BETA2_AGONIST",
    "spokenVariants": [
      "LABA",
      "Long-acting beta2 agonist"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-265",
    "no": 265,
    "termEnteredByUser": "LAMA",
    "standardTerm": "Long-acting muscarinic antagonist",
    "therapyArea": "Respiratory",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "LONG_ACTING_MUSCARINIC_ANTAGONIST",
    "spokenVariants": [
      "LAMA",
      "Long-acting muscarinic antagonist"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-266",
    "no": 266,
    "termEnteredByUser": "SABA",
    "standardTerm": "Short-acting beta2 agonist",
    "therapyArea": "Respiratory",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "SHORT_ACTING_BETA2_AGONIST",
    "spokenVariants": [
      "SABA",
      "Short-acting beta2 agonist"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-267",
    "no": 267,
    "termEnteredByUser": "SAMA",
    "standardTerm": "Short-acting muscarinic antagonist",
    "therapyArea": "Respiratory",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "SHORT_ACTING_MUSCARINIC_ANTAGONIST",
    "spokenVariants": [
      "SAMA",
      "Short-acting muscarinic antagonist"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-268",
    "no": 268,
    "termEnteredByUser": "ICS LABA",
    "standardTerm": "Inhaled corticosteroid/long-acting beta2 agonist",
    "therapyArea": "Respiratory",
    "category": "Treatment class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "INHALED_CORTICOSTEROID_LONG_ACTING_BETA2_AGONIST",
    "spokenVariants": [
      "ICS LABA",
      "Inhaled corticosteroid/long-acting beta2 agonist"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-269",
    "no": 269,
    "termEnteredByUser": "Triple therapy",
    "standardTerm": "ICS/LABA/LAMA triple therapy",
    "therapyArea": "Respiratory",
    "category": "Treatment class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "ICS_LABA_LAMA_TRIPLE_THERAPY",
    "spokenVariants": [
      "Triple therapy",
      "ICS/LABA/LAMA triple therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-270",
    "no": 270,
    "termEnteredByUser": "Nebulization",
    "standardTerm": "Nebulized therapy",
    "therapyArea": "Respiratory",
    "category": "Administration",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "NEBULIZED_THERAPY",
    "spokenVariants": [
      "Nebulization",
      "Nebulized therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-271",
    "no": 271,
    "termEnteredByUser": "Nebuliser",
    "standardTerm": "Nebulizer",
    "therapyArea": "Respiratory",
    "category": "Device",
    "intentTag": "Administration",
    "riskTag": "No-risk",
    "synonymGroup": "NEBULIZER",
    "spokenVariants": [
      "Nebuliser",
      "Nebulizer"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-272",
    "no": 272,
    "termEnteredByUser": "Inhaler technique",
    "standardTerm": "Inhaler technique",
    "therapyArea": "Respiratory",
    "category": "Device/training",
    "intentTag": "Training",
    "riskTag": "No-risk",
    "synonymGroup": "INHALER_TECHNIQUE",
    "spokenVariants": [
      "Inhaler technique"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-273",
    "no": 273,
    "termEnteredByUser": "Spacer",
    "standardTerm": "Spacer device",
    "therapyArea": "Respiratory",
    "category": "Device",
    "intentTag": "Administration",
    "riskTag": "No-risk",
    "synonymGroup": "SPACER_DEVICE",
    "spokenVariants": [
      "Spacer",
      "Spacer device"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-274",
    "no": 274,
    "termEnteredByUser": "Peak flow",
    "standardTerm": "Peak expiratory flow",
    "therapyArea": "Respiratory",
    "category": "Monitoring",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "PEAK_EXPIRATORY_FLOW",
    "spokenVariants": [
      "Peak flow",
      "Peak expiratory flow"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-275",
    "no": 275,
    "termEnteredByUser": "FEV1",
    "standardTerm": "Forced expiratory volume in 1 second",
    "therapyArea": "Respiratory",
    "category": "Outcome",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "FORCED_EXPIRATORY_VOLUME_IN_1_SECOND",
    "spokenVariants": [
      "FEV1",
      "Forced expiratory volume in 1 second"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-276",
    "no": 276,
    "termEnteredByUser": "FVC",
    "standardTerm": "Forced vital capacity",
    "therapyArea": "Respiratory",
    "category": "Outcome",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "FORCED_VITAL_CAPACITY",
    "spokenVariants": [
      "FVC",
      "Forced vital capacity"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-277",
    "no": 277,
    "termEnteredByUser": "FEV1/FVC",
    "standardTerm": "FEV1/FVC ratio",
    "therapyArea": "Respiratory",
    "category": "Outcome",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "FEV1_FVC_RATIO",
    "spokenVariants": [
      "FEV1/FVC",
      "FEV1/FVC ratio"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-278",
    "no": 278,
    "termEnteredByUser": "Pneumonia risk",
    "standardTerm": "Pneumonia risk",
    "therapyArea": "Respiratory",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PNEUMONIA_RISK",
    "spokenVariants": [
      "Pneumonia risk"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-279",
    "no": 279,
    "termEnteredByUser": "Oral thrush",
    "standardTerm": "Oropharyngeal candidiasis",
    "therapyArea": "Respiratory",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "OROPHARYNGEAL_CANDIDIASIS",
    "spokenVariants": [
      "Oral thrush",
      "Oropharyngeal candidiasis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-280",
    "no": 280,
    "termEnteredByUser": "Hoarseness",
    "standardTerm": "Dysphonia",
    "therapyArea": "Respiratory",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DYSPHONIA",
    "spokenVariants": [
      "Hoarseness",
      "Dysphonia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-281",
    "no": 281,
    "termEnteredByUser": "Tremor inhaler",
    "standardTerm": "Tremor associated with beta2 agonist",
    "therapyArea": "Respiratory",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "TREMOR_ASSOCIATED_WITH_BETA2_AGONIST",
    "spokenVariants": [
      "Tremor inhaler",
      "Tremor associated with beta2 agonist"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-282",
    "no": 282,
    "termEnteredByUser": "Palpitation inhaler",
    "standardTerm": "Palpitations associated with beta2 agonist",
    "therapyArea": "Respiratory/Cardiology",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PALPITATIONS_ASSOCIATED_WITH_BETA2_AGONIST",
    "spokenVariants": [
      "Palpitation inhaler",
      "Palpitations associated with beta2 agonist"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-283",
    "no": 283,
    "termEnteredByUser": "Biologic asthma",
    "standardTerm": "Biologic therapy for severe asthma",
    "therapyArea": "Respiratory/Immunology",
    "category": "Treatment class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "BIOLOGIC_THERAPY_FOR_SEVERE_ASTHMA",
    "spokenVariants": [
      "Biologic asthma",
      "Biologic therapy for severe asthma"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-284",
    "no": 284,
    "termEnteredByUser": "Eosinophilic asthma",
    "standardTerm": "Eosinophilic asthma",
    "therapyArea": "Respiratory/Immunology",
    "category": "Phenotype",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "EOSINOPHILIC_ASTHMA",
    "spokenVariants": [
      "Eosinophilic asthma"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-285",
    "no": 285,
    "termEnteredByUser": "Allergic asthma",
    "standardTerm": "Allergic asthma",
    "therapyArea": "Respiratory/Immunology",
    "category": "Phenotype",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "ALLERGIC_ASTHMA",
    "spokenVariants": [
      "Allergic asthma"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-286",
    "no": 286,
    "termEnteredByUser": "Acidity",
    "standardTerm": "Dyspepsia",
    "therapyArea": "Gastroenterology",
    "category": "Symptom",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "DYSPEPSIA",
    "spokenVariants": [
      "Acidity",
      "Dyspepsia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-287",
    "no": 287,
    "termEnteredByUser": "Heartburn",
    "standardTerm": "Gastroesophageal reflux symptom",
    "therapyArea": "Gastroenterology",
    "category": "Symptom",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "GASTROESOPHAGEAL_REFLUX_SYMPTOM",
    "spokenVariants": [
      "Heartburn",
      "Gastroesophageal reflux symptom"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-288",
    "no": 288,
    "termEnteredByUser": "GERD",
    "standardTerm": "Gastroesophageal reflux disease",
    "therapyArea": "Gastroenterology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "GASTROESOPHAGEAL_REFLUX_DISEASE",
    "spokenVariants": [
      "GERD",
      "Gastroesophageal reflux disease",
      "GORD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-289",
    "no": 289,
    "termEnteredByUser": "GORD",
    "standardTerm": "Gastroesophageal reflux disease",
    "therapyArea": "Gastroenterology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "GASTROESOPHAGEAL_REFLUX_DISEASE",
    "spokenVariants": [
      "GERD",
      "Gastroesophageal reflux disease",
      "GORD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-290",
    "no": 290,
    "termEnteredByUser": "Ulcer",
    "standardTerm": "Peptic ulcer disease",
    "therapyArea": "Gastroenterology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "PEPTIC_ULCER_DISEASE",
    "spokenVariants": [
      "Ulcer",
      "Peptic ulcer disease",
      "PUD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-291",
    "no": 291,
    "termEnteredByUser": "PUD",
    "standardTerm": "Peptic ulcer disease",
    "therapyArea": "Gastroenterology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "PEPTIC_ULCER_DISEASE",
    "spokenVariants": [
      "Ulcer",
      "Peptic ulcer disease",
      "PUD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-292",
    "no": 292,
    "termEnteredByUser": "H pylori",
    "standardTerm": "Helicobacter pylori infection",
    "therapyArea": "Gastroenterology",
    "category": "Infection",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "HELICOBACTER_PYLORI_INFECTION",
    "spokenVariants": [
      "H pylori",
      "Helicobacter pylori infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-293",
    "no": 293,
    "termEnteredByUser": "Loose motions",
    "standardTerm": "Diarrhea",
    "therapyArea": "Gastroenterology",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DIARRHEA",
    "spokenVariants": [
      "Loose motions",
      "Diarrhea",
      "Diarrhoea"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-294",
    "no": 294,
    "termEnteredByUser": "Diarrhoea",
    "standardTerm": "Diarrhea",
    "therapyArea": "Gastroenterology",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DIARRHEA",
    "spokenVariants": [
      "Loose motions",
      "Diarrhea",
      "Diarrhoea"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-295",
    "no": 295,
    "termEnteredByUser": "Constipation",
    "standardTerm": "Constipation",
    "therapyArea": "Gastroenterology",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "CONSTIPATION",
    "spokenVariants": [
      "Constipation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-296",
    "no": 296,
    "termEnteredByUser": "Nausea",
    "standardTerm": "Nausea",
    "therapyArea": "Gastroenterology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "NAUSEA",
    "spokenVariants": [
      "Nausea"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-297",
    "no": 297,
    "termEnteredByUser": "Vomiting",
    "standardTerm": "Vomiting",
    "therapyArea": "Gastroenterology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "VOMITING",
    "spokenVariants": [
      "Vomiting"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-298",
    "no": 298,
    "termEnteredByUser": "Abdominal pain",
    "standardTerm": "Abdominal pain",
    "therapyArea": "Gastroenterology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ABDOMINAL_PAIN",
    "spokenVariants": [
      "Abdominal pain",
      "Stomach pain"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-299",
    "no": 299,
    "termEnteredByUser": "Stomach pain",
    "standardTerm": "Abdominal pain",
    "therapyArea": "Gastroenterology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ABDOMINAL_PAIN",
    "spokenVariants": [
      "Abdominal pain",
      "Stomach pain"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-300",
    "no": 300,
    "termEnteredByUser": "IBD",
    "standardTerm": "Inflammatory bowel disease",
    "therapyArea": "Gastroenterology/Immunology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "INFLAMMATORY_BOWEL_DISEASE",
    "spokenVariants": [
      "IBD",
      "Inflammatory bowel disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-301",
    "no": 301,
    "termEnteredByUser": "Crohn disease",
    "standardTerm": "Crohn's disease",
    "therapyArea": "Gastroenterology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "CROHNS_DISEASE",
    "spokenVariants": [
      "Crohn disease",
      "Crohn's disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-302",
    "no": 302,
    "termEnteredByUser": "UC",
    "standardTerm": "Ulcerative colitis",
    "therapyArea": "Gastroenterology/Immunology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ULCERATIVE_COLITIS",
    "spokenVariants": [
      "UC",
      "Ulcerative colitis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-303",
    "no": 303,
    "termEnteredByUser": "IBS",
    "standardTerm": "Irritable bowel syndrome",
    "therapyArea": "Gastroenterology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "IRRITABLE_BOWEL_SYNDROME",
    "spokenVariants": [
      "IBS",
      "Irritable bowel syndrome"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-304",
    "no": 304,
    "termEnteredByUser": "Flare IBD",
    "standardTerm": "IBD flare",
    "therapyArea": "Gastroenterology/Immunology",
    "category": "Disease event",
    "intentTag": "Safety/Efficacy",
    "riskTag": "Caution",
    "synonymGroup": "IBD_FLARE",
    "spokenVariants": [
      "Flare IBD",
      "IBD flare"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-305",
    "no": 305,
    "termEnteredByUser": "Mucosal healing",
    "standardTerm": "Mucosal healing",
    "therapyArea": "Gastroenterology/Immunology",
    "category": "Outcome",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "MUCOSAL_HEALING",
    "spokenVariants": [
      "Mucosal healing"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-306",
    "no": 306,
    "termEnteredByUser": "Remission",
    "standardTerm": "Clinical remission",
    "therapyArea": "All",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_REMISSION",
    "spokenVariants": [
      "Remission",
      "Clinical remission"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-307",
    "no": 307,
    "termEnteredByUser": "Response",
    "standardTerm": "Clinical response",
    "therapyArea": "All",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_RESPONSE",
    "spokenVariants": [
      "Response",
      "Clinical response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-308",
    "no": 308,
    "termEnteredByUser": "LFT",
    "standardTerm": "Liver function test",
    "therapyArea": "Hepatology/All",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "No-risk",
    "synonymGroup": "LIVER_FUNCTION_TEST",
    "spokenVariants": [
      "LFT",
      "Liver function test"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-309",
    "no": 309,
    "termEnteredByUser": "ALT",
    "standardTerm": "Alanine aminotransferase",
    "therapyArea": "Hepatology/All",
    "category": "Lab",
    "intentTag": "Safety",
    "riskTag": "No-risk",
    "synonymGroup": "ALANINE_AMINOTRANSFERASE",
    "spokenVariants": [
      "ALT",
      "Alanine aminotransferase"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-310",
    "no": 310,
    "termEnteredByUser": "AST",
    "standardTerm": "Aspartate aminotransferase",
    "therapyArea": "Hepatology/All",
    "category": "Lab",
    "intentTag": "Safety",
    "riskTag": "No-risk",
    "synonymGroup": "ASPARTATE_AMINOTRANSFERASE",
    "spokenVariants": [
      "AST",
      "Aspartate aminotransferase"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-311",
    "no": 311,
    "termEnteredByUser": "Bilirubin high",
    "standardTerm": "Hyperbilirubinemia",
    "therapyArea": "Hepatology",
    "category": "Lab/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPERBILIRUBINEMIA",
    "spokenVariants": [
      "Bilirubin high",
      "Hyperbilirubinemia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-312",
    "no": 312,
    "termEnteredByUser": "Jaundice",
    "standardTerm": "Jaundice",
    "therapyArea": "Hepatology",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "JAUNDICE",
    "spokenVariants": [
      "Jaundice"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-313",
    "no": 313,
    "termEnteredByUser": "Hepatitis",
    "standardTerm": "Hepatitis",
    "therapyArea": "Hepatology/Infectious Disease",
    "category": "Disease",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "HEPATITIS",
    "spokenVariants": [
      "Hepatitis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-314",
    "no": 314,
    "termEnteredByUser": "HBV",
    "standardTerm": "Hepatitis B virus infection",
    "therapyArea": "Hepatology/Infectious Disease",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HEPATITIS_B_VIRUS_INFECTION",
    "spokenVariants": [
      "HBV",
      "Hepatitis B virus infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-315",
    "no": 315,
    "termEnteredByUser": "HCV",
    "standardTerm": "Hepatitis C virus infection",
    "therapyArea": "Hepatology/Infectious Disease",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HEPATITIS_C_VIRUS_INFECTION",
    "spokenVariants": [
      "HCV",
      "Hepatitis C virus infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-316",
    "no": 316,
    "termEnteredByUser": "Fever",
    "standardTerm": "Pyrexia",
    "therapyArea": "Infectious Disease/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PYREXIA",
    "spokenVariants": [
      "Fever",
      "Pyrexia",
      "High fever"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-317",
    "no": 317,
    "termEnteredByUser": "High fever",
    "standardTerm": "Pyrexia",
    "therapyArea": "Infectious Disease/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PYREXIA",
    "spokenVariants": [
      "Fever",
      "Pyrexia",
      "High fever"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-318",
    "no": 318,
    "termEnteredByUser": "Sepsis",
    "standardTerm": "Sepsis",
    "therapyArea": "Infectious Disease",
    "category": "Disease event",
    "intentTag": "Safety/Emergency",
    "riskTag": "High-risk",
    "synonymGroup": "SEPSIS",
    "spokenVariants": [
      "Sepsis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-319",
    "no": 319,
    "termEnteredByUser": "Antibiotic",
    "standardTerm": "Antibacterial therapy",
    "therapyArea": "Infectious Disease",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "ANTIBACTERIAL_THERAPY",
    "spokenVariants": [
      "Antibiotic",
      "Antibacterial therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-320",
    "no": 320,
    "termEnteredByUser": "Antiviral",
    "standardTerm": "Antiviral therapy",
    "therapyArea": "Infectious Disease",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "ANTIVIRAL_THERAPY",
    "spokenVariants": [
      "Antiviral",
      "Antiviral therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-321",
    "no": 321,
    "termEnteredByUser": "Antifungal",
    "standardTerm": "Antifungal therapy",
    "therapyArea": "Infectious Disease",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "ANTIFUNGAL_THERAPY",
    "spokenVariants": [
      "Antifungal",
      "Antifungal therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-322",
    "no": 322,
    "termEnteredByUser": "TB",
    "standardTerm": "Tuberculosis",
    "therapyArea": "Infectious Disease/Respiratory",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "TUBERCULOSIS",
    "spokenVariants": [
      "TB",
      "Tuberculosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-323",
    "no": 323,
    "termEnteredByUser": "MDR TB",
    "standardTerm": "Multidrug-resistant tuberculosis",
    "therapyArea": "Infectious Disease/Respiratory",
    "category": "Disease status",
    "intentTag": "Guideline",
    "riskTag": "Caution",
    "synonymGroup": "MULTIDRUG_RESISTANT_TUBERCULOSIS",
    "spokenVariants": [
      "MDR TB",
      "Multidrug-resistant tuberculosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-324",
    "no": 324,
    "termEnteredByUser": "XDR TB",
    "standardTerm": "Extensively drug-resistant tuberculosis",
    "therapyArea": "Infectious Disease/Respiratory",
    "category": "Disease status",
    "intentTag": "Guideline",
    "riskTag": "Caution",
    "synonymGroup": "EXTENSIVELY_DRUG_RESISTANT_TUBERCULOSIS",
    "spokenVariants": [
      "XDR TB",
      "Extensively drug-resistant tuberculosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-325",
    "no": 325,
    "termEnteredByUser": "HIV",
    "standardTerm": "Human immunodeficiency virus infection",
    "therapyArea": "Infectious Disease",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HUMAN_IMMUNODEFICIENCY_VIRUS_INFECTION",
    "spokenVariants": [
      "HIV",
      "Human immunodeficiency virus infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-326",
    "no": 326,
    "termEnteredByUser": "AIDS",
    "standardTerm": "Acquired immunodeficiency syndrome",
    "therapyArea": "Infectious Disease",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ACQUIRED_IMMUNODEFICIENCY_SYNDROME",
    "spokenVariants": [
      "AIDS",
      "Acquired immunodeficiency syndrome"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-327",
    "no": 327,
    "termEnteredByUser": "COVID",
    "standardTerm": "COVID-19",
    "therapyArea": "Infectious Disease/Respiratory",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "COVID_19",
    "spokenVariants": [
      "COVID",
      "COVID-19"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-328",
    "no": 328,
    "termEnteredByUser": "SARS CoV 2",
    "standardTerm": "SARS-CoV-2 infection",
    "therapyArea": "Infectious Disease/Respiratory",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "SARS_COV_2_INFECTION",
    "spokenVariants": [
      "SARS CoV 2",
      "SARS-CoV-2 infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-329",
    "no": 329,
    "termEnteredByUser": "Dengue",
    "standardTerm": "Dengue fever",
    "therapyArea": "Infectious Disease",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "DENGUE_FEVER",
    "spokenVariants": [
      "Dengue",
      "Dengue fever"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-330",
    "no": 330,
    "termEnteredByUser": "Malaria",
    "standardTerm": "Malaria",
    "therapyArea": "Infectious Disease",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "MALARIA",
    "spokenVariants": [
      "Malaria"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-331",
    "no": 331,
    "termEnteredByUser": "Pneumonia",
    "standardTerm": "Pneumonia",
    "therapyArea": "Infectious Disease/Respiratory",
    "category": "Disease",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "PNEUMONIA",
    "spokenVariants": [
      "Pneumonia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-332",
    "no": 332,
    "termEnteredByUser": "CAP",
    "standardTerm": "Community-acquired pneumonia",
    "therapyArea": "Infectious Disease/Respiratory",
    "category": "Abbreviation",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "COMMUNITY_ACQUIRED_PNEUMONIA",
    "spokenVariants": [
      "CAP",
      "Community-acquired pneumonia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-333",
    "no": 333,
    "termEnteredByUser": "UTI treatment",
    "standardTerm": "Urinary tract infection treatment",
    "therapyArea": "Infectious Disease/Urology",
    "category": "Treatment",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "URINARY_TRACT_INFECTION_TREATMENT",
    "spokenVariants": [
      "UTI treatment",
      "Urinary tract infection treatment"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-334",
    "no": 334,
    "termEnteredByUser": "Culture sensitivity",
    "standardTerm": "Antimicrobial susceptibility testing",
    "therapyArea": "Infectious Disease",
    "category": "Diagnostic",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "ANTIMICROBIAL_SUSCEPTIBILITY_TESTING",
    "spokenVariants": [
      "Culture sensitivity",
      "Antimicrobial susceptibility testing"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-335",
    "no": 335,
    "termEnteredByUser": "AMR",
    "standardTerm": "Antimicrobial resistance",
    "therapyArea": "Infectious Disease",
    "category": "Abbreviation",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "ANTIMICROBIAL_RESISTANCE",
    "spokenVariants": [
      "AMR",
      "Antimicrobial resistance",
      "Resistance"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-336",
    "no": 336,
    "termEnteredByUser": "Resistance",
    "standardTerm": "Antimicrobial resistance",
    "therapyArea": "Infectious Disease",
    "category": "Disease status",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "ANTIMICROBIAL_RESISTANCE",
    "spokenVariants": [
      "AMR",
      "Antimicrobial resistance",
      "Resistance"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-337",
    "no": 337,
    "termEnteredByUser": "Prophylaxis",
    "standardTerm": "Prophylactic therapy",
    "therapyArea": "Infectious Disease/All",
    "category": "Treatment",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "PROPHYLACTIC_THERAPY",
    "spokenVariants": [
      "Prophylaxis",
      "Prophylactic therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-338",
    "no": 338,
    "termEnteredByUser": "Vaccination",
    "standardTerm": "Immunization",
    "therapyArea": "Vaccines/Infectious Disease",
    "category": "Prevention",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "IMMUNIZATION",
    "spokenVariants": [
      "Vaccination",
      "Immunization"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-339",
    "no": 339,
    "termEnteredByUser": "Vaccine reaction",
    "standardTerm": "Adverse event following immunization",
    "therapyArea": "Vaccines",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "PV flag",
    "synonymGroup": "ADVERSE_EVENT_FOLLOWING_IMMUNIZATION",
    "spokenVariants": [
      "Vaccine reaction",
      "Adverse event following immunization",
      "AEFI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-340",
    "no": 340,
    "termEnteredByUser": "AEFI",
    "standardTerm": "Adverse event following immunization",
    "therapyArea": "Vaccines",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "PV flag",
    "synonymGroup": "ADVERSE_EVENT_FOLLOWING_IMMUNIZATION",
    "spokenVariants": [
      "Vaccine reaction",
      "Adverse event following immunization",
      "AEFI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-341",
    "no": 341,
    "termEnteredByUser": "Anaphylaxis vaccine",
    "standardTerm": "Anaphylaxis following immunization",
    "therapyArea": "Vaccines",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "ANAPHYLAXIS_FOLLOWING_IMMUNIZATION",
    "spokenVariants": [
      "Anaphylaxis vaccine",
      "Anaphylaxis following immunization"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-342",
    "no": 342,
    "termEnteredByUser": "Breakthrough infection",
    "standardTerm": "Breakthrough infection",
    "therapyArea": "Vaccines/Infectious Disease",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "BREAKTHROUGH_INFECTION",
    "spokenVariants": [
      "Breakthrough infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-343",
    "no": 343,
    "termEnteredByUser": "Cancer",
    "standardTerm": "Malignancy",
    "therapyArea": "Oncology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "MALIGNANCY",
    "spokenVariants": [
      "Cancer",
      "Malignancy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-344",
    "no": 344,
    "termEnteredByUser": "Tumor",
    "standardTerm": "Tumor",
    "therapyArea": "Oncology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "TUMOR",
    "spokenVariants": [
      "Tumor",
      "Tumour"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-345",
    "no": 345,
    "termEnteredByUser": "Tumour",
    "standardTerm": "Tumor",
    "therapyArea": "Oncology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "TUMOR",
    "spokenVariants": [
      "Tumor",
      "Tumour"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-346",
    "no": 346,
    "termEnteredByUser": "Metastatic",
    "standardTerm": "Metastatic disease",
    "therapyArea": "Oncology",
    "category": "Disease status",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "METASTATIC_DISEASE",
    "spokenVariants": [
      "Metastatic",
      "Metastatic disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-347",
    "no": 347,
    "termEnteredByUser": "Advanced cancer",
    "standardTerm": "Advanced malignancy",
    "therapyArea": "Oncology",
    "category": "Disease status",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ADVANCED_MALIGNANCY",
    "spokenVariants": [
      "Advanced cancer",
      "Advanced malignancy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-348",
    "no": 348,
    "termEnteredByUser": "Stage 4",
    "standardTerm": "Stage IV cancer",
    "therapyArea": "Oncology",
    "category": "Disease status",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "STAGE_IV_CANCER",
    "spokenVariants": [
      "Stage 4",
      "Stage IV cancer"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-349",
    "no": 349,
    "termEnteredByUser": "NSCLC",
    "standardTerm": "Non-small cell lung cancer",
    "therapyArea": "Oncology/Respiratory",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "NON_SMALL_CELL_LUNG_CANCER",
    "spokenVariants": [
      "NSCLC",
      "Non-small cell lung cancer"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-350",
    "no": 350,
    "termEnteredByUser": "SCLC",
    "standardTerm": "Small cell lung cancer",
    "therapyArea": "Oncology/Respiratory",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "SMALL_CELL_LUNG_CANCER",
    "spokenVariants": [
      "SCLC",
      "Small cell lung cancer"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-351",
    "no": 351,
    "termEnteredByUser": "Breast ca",
    "standardTerm": "Breast cancer",
    "therapyArea": "Oncology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "BREAST_CANCER",
    "spokenVariants": [
      "Breast ca",
      "Breast cancer"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-352",
    "no": 352,
    "termEnteredByUser": "CRC",
    "standardTerm": "Colorectal cancer",
    "therapyArea": "Oncology/Gastroenterology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "COLORECTAL_CANCER",
    "spokenVariants": [
      "CRC",
      "Colorectal cancer"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-353",
    "no": 353,
    "termEnteredByUser": "RCC",
    "standardTerm": "Renal cell carcinoma",
    "therapyArea": "Oncology/Urology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "RENAL_CELL_CARCINOMA",
    "spokenVariants": [
      "RCC",
      "Renal cell carcinoma"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-354",
    "no": 354,
    "termEnteredByUser": "HCC",
    "standardTerm": "Hepatocellular carcinoma",
    "therapyArea": "Oncology/Hepatology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "HEPATOCELLULAR_CARCINOMA",
    "spokenVariants": [
      "HCC",
      "Hepatocellular carcinoma"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-355",
    "no": 355,
    "termEnteredByUser": "PD-L1",
    "standardTerm": "Programmed death-ligand 1",
    "therapyArea": "Oncology",
    "category": "Biomarker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "PROGRAMMED_DEATH_LIGAND_1",
    "spokenVariants": [
      "PD-L1",
      "Programmed death-ligand 1"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-356",
    "no": 356,
    "termEnteredByUser": "EGFR",
    "standardTerm": "Epidermal growth factor receptor",
    "therapyArea": "Oncology",
    "category": "Biomarker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "EPIDERMAL_GROWTH_FACTOR_RECEPTOR",
    "spokenVariants": [
      "EGFR",
      "Epidermal growth factor receptor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-357",
    "no": 357,
    "termEnteredByUser": "ALK",
    "standardTerm": "Anaplastic lymphoma kinase",
    "therapyArea": "Oncology",
    "category": "Biomarker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "ANAPLASTIC_LYMPHOMA_KINASE",
    "spokenVariants": [
      "ALK",
      "Anaplastic lymphoma kinase"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-358",
    "no": 358,
    "termEnteredByUser": "HER2",
    "standardTerm": "Human epidermal growth factor receptor 2",
    "therapyArea": "Oncology",
    "category": "Biomarker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "HUMAN_EPIDERMAL_GROWTH_FACTOR_RECEPTOR_2",
    "spokenVariants": [
      "HER2",
      "Human epidermal growth factor receptor 2"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-359",
    "no": 359,
    "termEnteredByUser": "BRCA",
    "standardTerm": "BRCA mutation",
    "therapyArea": "Oncology",
    "category": "Biomarker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "BRCA_MUTATION",
    "spokenVariants": [
      "BRCA",
      "BRCA mutation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-360",
    "no": 360,
    "termEnteredByUser": "Mutation positive",
    "standardTerm": "Biomarker-positive disease",
    "therapyArea": "Oncology",
    "category": "Biomarker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "BIOMARKER_POSITIVE_DISEASE",
    "spokenVariants": [
      "Mutation positive",
      "Biomarker-positive disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-361",
    "no": 361,
    "termEnteredByUser": "ORR",
    "standardTerm": "Overall response rate",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "OVERALL_RESPONSE_RATE",
    "spokenVariants": [
      "ORR",
      "Overall response rate"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-362",
    "no": 362,
    "termEnteredByUser": "PFS",
    "standardTerm": "Progression-free survival",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "PROGRESSION_FREE_SURVIVAL",
    "spokenVariants": [
      "PFS",
      "Progression-free survival"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-363",
    "no": 363,
    "termEnteredByUser": "OS",
    "standardTerm": "Overall survival",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "OVERALL_SURVIVAL",
    "spokenVariants": [
      "OS",
      "Overall survival"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-364",
    "no": 364,
    "termEnteredByUser": "DOR",
    "standardTerm": "Duration of response",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "DURATION_OF_RESPONSE",
    "spokenVariants": [
      "DOR",
      "Duration of response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-365",
    "no": 365,
    "termEnteredByUser": "CR",
    "standardTerm": "Complete response",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "COMPLETE_RESPONSE",
    "spokenVariants": [
      "CR",
      "Complete response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-366",
    "no": 366,
    "termEnteredByUser": "PR",
    "standardTerm": "Partial response",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "PARTIAL_RESPONSE",
    "spokenVariants": [
      "PR",
      "Partial response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-367",
    "no": 367,
    "termEnteredByUser": "Stable disease",
    "standardTerm": "Stable disease",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "STABLE_DISEASE",
    "spokenVariants": [
      "Stable disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-368",
    "no": 368,
    "termEnteredByUser": "Progression",
    "standardTerm": "Disease progression",
    "therapyArea": "Oncology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "DISEASE_PROGRESSION",
    "spokenVariants": [
      "Progression",
      "Disease progression"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-369",
    "no": 369,
    "termEnteredByUser": "Immunotherapy",
    "standardTerm": "Cancer immunotherapy",
    "therapyArea": "Oncology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "CANCER_IMMUNOTHERAPY",
    "spokenVariants": [
      "Immunotherapy",
      "Cancer immunotherapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-370",
    "no": 370,
    "termEnteredByUser": "Checkpoint inhibitor",
    "standardTerm": "Immune checkpoint inhibitor",
    "therapyArea": "Oncology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "IMMUNE_CHECKPOINT_INHIBITOR",
    "spokenVariants": [
      "Checkpoint inhibitor",
      "Immune checkpoint inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-371",
    "no": 371,
    "termEnteredByUser": "PD-1 inhibitor",
    "standardTerm": "Programmed death-1 inhibitor",
    "therapyArea": "Oncology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "PROGRAMMED_DEATH_1_INHIBITOR",
    "spokenVariants": [
      "PD-1 inhibitor",
      "Programmed death-1 inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-372",
    "no": 372,
    "termEnteredByUser": "PD-L1 inhibitor",
    "standardTerm": "Programmed death-ligand 1 inhibitor",
    "therapyArea": "Oncology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "PROGRAMMED_DEATH_LIGAND_1_INHIBITOR",
    "spokenVariants": [
      "PD-L1 inhibitor",
      "Programmed death-ligand 1 inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-373",
    "no": 373,
    "termEnteredByUser": "TKI",
    "standardTerm": "Tyrosine kinase inhibitor",
    "therapyArea": "Oncology",
    "category": "Abbreviation",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "TYROSINE_KINASE_INHIBITOR",
    "spokenVariants": [
      "TKI",
      "Tyrosine kinase inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-374",
    "no": 374,
    "termEnteredByUser": "Chemo",
    "standardTerm": "Chemotherapy",
    "therapyArea": "Oncology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "CHEMOTHERAPY",
    "spokenVariants": [
      "Chemo",
      "Chemotherapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-375",
    "no": 375,
    "termEnteredByUser": "Radiation",
    "standardTerm": "Radiotherapy",
    "therapyArea": "Oncology",
    "category": "Treatment",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "RADIOTHERAPY",
    "spokenVariants": [
      "Radiation",
      "Radiotherapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-376",
    "no": 376,
    "termEnteredByUser": "Neoadjuvant",
    "standardTerm": "Neoadjuvant therapy",
    "therapyArea": "Oncology",
    "category": "Treatment setting",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "NEOADJUVANT_THERAPY",
    "spokenVariants": [
      "Neoadjuvant",
      "Neoadjuvant therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-377",
    "no": 377,
    "termEnteredByUser": "Adjuvant",
    "standardTerm": "Adjuvant therapy",
    "therapyArea": "Oncology",
    "category": "Treatment setting",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "ADJUVANT_THERAPY",
    "spokenVariants": [
      "Adjuvant",
      "Adjuvant therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-378",
    "no": 378,
    "termEnteredByUser": "Line of therapy",
    "standardTerm": "Line of therapy",
    "therapyArea": "Oncology",
    "category": "Treatment setting",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "LINE_OF_THERAPY",
    "spokenVariants": [
      "Line of therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-379",
    "no": 379,
    "termEnteredByUser": "First line",
    "standardTerm": "First-line therapy",
    "therapyArea": "Oncology",
    "category": "Treatment setting",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "FIRST_LINE_THERAPY",
    "spokenVariants": [
      "First line",
      "First-line therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-380",
    "no": 380,
    "termEnteredByUser": "Second line",
    "standardTerm": "Second-line therapy",
    "therapyArea": "Oncology",
    "category": "Treatment setting",
    "intentTag": "Guideline",
    "riskTag": "No-risk",
    "synonymGroup": "SECOND_LINE_THERAPY",
    "spokenVariants": [
      "Second line",
      "Second-line therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-381",
    "no": 381,
    "termEnteredByUser": "irAE",
    "standardTerm": "Immune-related adverse event",
    "therapyArea": "Oncology",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "IMMUNE_RELATED_ADVERSE_EVENT",
    "spokenVariants": [
      "irAE",
      "Immune-related adverse event",
      "Immune AE"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-382",
    "no": 382,
    "termEnteredByUser": "Immune AE",
    "standardTerm": "Immune-related adverse event",
    "therapyArea": "Oncology",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "IMMUNE_RELATED_ADVERSE_EVENT",
    "spokenVariants": [
      "irAE",
      "Immune-related adverse event",
      "Immune AE"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-383",
    "no": 383,
    "termEnteredByUser": "Psoriasis",
    "standardTerm": "Psoriasis",
    "therapyArea": "Dermatology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "PSORIASIS",
    "spokenVariants": [
      "Psoriasis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-384",
    "no": 384,
    "termEnteredByUser": "Plaque psoriasis",
    "standardTerm": "Plaque psoriasis",
    "therapyArea": "Dermatology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "PLAQUE_PSORIASIS",
    "spokenVariants": [
      "Plaque psoriasis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-385",
    "no": 385,
    "termEnteredByUser": "PsA",
    "standardTerm": "Psoriatic arthritis",
    "therapyArea": "Rheumatology/Dermatology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "PSORIATIC_ARTHRITIS",
    "spokenVariants": [
      "PsA",
      "Psoriatic arthritis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-386",
    "no": 386,
    "termEnteredByUser": "Atopic dermatitis",
    "standardTerm": "Atopic dermatitis",
    "therapyArea": "Dermatology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ATOPIC_DERMATITIS",
    "spokenVariants": [
      "Atopic dermatitis",
      "Eczema"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-387",
    "no": 387,
    "termEnteredByUser": "Eczema",
    "standardTerm": "Atopic dermatitis",
    "therapyArea": "Dermatology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ATOPIC_DERMATITIS",
    "spokenVariants": [
      "Atopic dermatitis",
      "Eczema"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-388",
    "no": 388,
    "termEnteredByUser": "Urticaria",
    "standardTerm": "Urticaria",
    "therapyArea": "Dermatology/Allergy",
    "category": "Disease/Symptom",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "URTICARIA",
    "spokenVariants": [
      "Urticaria",
      "Hives"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-389",
    "no": 389,
    "termEnteredByUser": "Hives",
    "standardTerm": "Urticaria",
    "therapyArea": "Dermatology/Allergy",
    "category": "Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "URTICARIA",
    "spokenVariants": [
      "Urticaria",
      "Hives"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-390",
    "no": 390,
    "termEnteredByUser": "Acne",
    "standardTerm": "Acne vulgaris",
    "therapyArea": "Dermatology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ACNE_VULGARIS",
    "spokenVariants": [
      "Acne",
      "Acne vulgaris"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-391",
    "no": 391,
    "termEnteredByUser": "Severe acne",
    "standardTerm": "Severe acne",
    "therapyArea": "Dermatology",
    "category": "Disease status",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "SEVERE_ACNE",
    "spokenVariants": [
      "Severe acne"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-392",
    "no": 392,
    "termEnteredByUser": "Itching",
    "standardTerm": "Pruritus",
    "therapyArea": "Dermatology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PRURITUS",
    "spokenVariants": [
      "Itching",
      "Pruritus"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-393",
    "no": 393,
    "termEnteredByUser": "Pruritus",
    "standardTerm": "Pruritus",
    "therapyArea": "Dermatology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PRURITUS",
    "spokenVariants": [
      "Itching",
      "Pruritus"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-394",
    "no": 394,
    "termEnteredByUser": "Skin rash",
    "standardTerm": "Rash",
    "therapyArea": "Dermatology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "RASH",
    "spokenVariants": [
      "Skin rash",
      "Rash"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-395",
    "no": 395,
    "termEnteredByUser": "SJS",
    "standardTerm": "Stevens-Johnson syndrome",
    "therapyArea": "Dermatology/All",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "STEVENS_JOHNSON_SYNDROME",
    "spokenVariants": [
      "SJS",
      "Stevens-Johnson syndrome"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-396",
    "no": 396,
    "termEnteredByUser": "TEN",
    "standardTerm": "Toxic epidermal necrolysis",
    "therapyArea": "Dermatology/All",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "TOXIC_EPIDERMAL_NECROLYSIS",
    "spokenVariants": [
      "TEN",
      "Toxic epidermal necrolysis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-397",
    "no": 397,
    "termEnteredByUser": "RA",
    "standardTerm": "Rheumatoid arthritis",
    "therapyArea": "Rheumatology/Immunology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "RHEUMATOID_ARTHRITIS",
    "spokenVariants": [
      "RA",
      "Rheumatoid arthritis",
      "Rheumatoid"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-398",
    "no": 398,
    "termEnteredByUser": "Rheumatoid",
    "standardTerm": "Rheumatoid arthritis",
    "therapyArea": "Rheumatology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "RHEUMATOID_ARTHRITIS",
    "spokenVariants": [
      "RA",
      "Rheumatoid arthritis",
      "Rheumatoid"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-399",
    "no": 399,
    "termEnteredByUser": "AS",
    "standardTerm": "Ankylosing spondylitis",
    "therapyArea": "Rheumatology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "ANKYLOSING_SPONDYLITIS",
    "spokenVariants": [
      "AS",
      "Ankylosing spondylitis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-400",
    "no": 400,
    "termEnteredByUser": "AxSpA",
    "standardTerm": "Axial spondyloarthritis",
    "therapyArea": "Rheumatology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "AXIAL_SPONDYLOARTHRITIS",
    "spokenVariants": [
      "AxSpA",
      "Axial spondyloarthritis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-401",
    "no": 401,
    "termEnteredByUser": "SLE",
    "standardTerm": "Systemic lupus erythematosus",
    "therapyArea": "Rheumatology/Immunology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "SYSTEMIC_LUPUS_ERYTHEMATOSUS",
    "spokenVariants": [
      "SLE",
      "Systemic lupus erythematosus",
      "Lupus"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-402",
    "no": 402,
    "termEnteredByUser": "Lupus",
    "standardTerm": "Systemic lupus erythematosus",
    "therapyArea": "Rheumatology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "SYSTEMIC_LUPUS_ERYTHEMATOSUS",
    "spokenVariants": [
      "SLE",
      "Systemic lupus erythematosus",
      "Lupus"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-403",
    "no": 403,
    "termEnteredByUser": "JIA",
    "standardTerm": "Juvenile idiopathic arthritis",
    "therapyArea": "Rheumatology/Pediatrics",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "JUVENILE_IDIOPATHIC_ARTHRITIS",
    "spokenVariants": [
      "JIA",
      "Juvenile idiopathic arthritis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-404",
    "no": 404,
    "termEnteredByUser": "DAS28",
    "standardTerm": "Disease Activity Score 28",
    "therapyArea": "Rheumatology",
    "category": "Outcome",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "DISEASE_ACTIVITY_SCORE_28",
    "spokenVariants": [
      "DAS28",
      "Disease Activity Score 28"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-405",
    "no": 405,
    "termEnteredByUser": "ACR20",
    "standardTerm": "American College of Rheumatology 20 response",
    "therapyArea": "Rheumatology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "AMERICAN_COLLEGE_OF_RHEUMATOLOGY_20_RESPONSE",
    "spokenVariants": [
      "ACR20",
      "American College of Rheumatology 20 response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-406",
    "no": 406,
    "termEnteredByUser": "ACR50",
    "standardTerm": "American College of Rheumatology 50 response",
    "therapyArea": "Rheumatology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "AMERICAN_COLLEGE_OF_RHEUMATOLOGY_50_RESPONSE",
    "spokenVariants": [
      "ACR50",
      "American College of Rheumatology 50 response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-407",
    "no": 407,
    "termEnteredByUser": "PASI",
    "standardTerm": "Psoriasis Area and Severity Index",
    "therapyArea": "Dermatology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "PSORIASIS_AREA_AND_SEVERITY_INDEX",
    "spokenVariants": [
      "PASI",
      "Psoriasis Area and Severity Index"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-408",
    "no": 408,
    "termEnteredByUser": "PASI 75",
    "standardTerm": "PASI 75 response",
    "therapyArea": "Dermatology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "PASI_75_RESPONSE",
    "spokenVariants": [
      "PASI 75",
      "PASI 75 response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-409",
    "no": 409,
    "termEnteredByUser": "EASI",
    "standardTerm": "Eczema Area and Severity Index",
    "therapyArea": "Dermatology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "ECZEMA_AREA_AND_SEVERITY_INDEX",
    "spokenVariants": [
      "EASI",
      "Eczema Area and Severity Index"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-410",
    "no": 410,
    "termEnteredByUser": "EASI 75",
    "standardTerm": "EASI 75 response",
    "therapyArea": "Dermatology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "EASI_75_RESPONSE",
    "spokenVariants": [
      "EASI 75",
      "EASI 75 response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-411",
    "no": 411,
    "termEnteredByUser": "Biologic",
    "standardTerm": "Biologic therapy",
    "therapyArea": "Immunology/All",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "BIOLOGIC_THERAPY",
    "spokenVariants": [
      "Biologic",
      "Biologic therapy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-412",
    "no": 412,
    "termEnteredByUser": "TNF inhibitor",
    "standardTerm": "Tumor necrosis factor inhibitor",
    "therapyArea": "Rheumatology/Dermatology/Gastroenterology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "TUMOR_NECROSIS_FACTOR_INHIBITOR",
    "spokenVariants": [
      "TNF inhibitor",
      "Tumor necrosis factor inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-413",
    "no": 413,
    "termEnteredByUser": "IL-17 inhibitor",
    "standardTerm": "Interleukin-17 inhibitor",
    "therapyArea": "Dermatology/Rheumatology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "INTERLEUKIN_17_INHIBITOR",
    "spokenVariants": [
      "IL-17 inhibitor",
      "Interleukin-17 inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-414",
    "no": 414,
    "termEnteredByUser": "IL-23 inhibitor",
    "standardTerm": "Interleukin-23 inhibitor",
    "therapyArea": "Dermatology/Rheumatology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "INTERLEUKIN_23_INHIBITOR",
    "spokenVariants": [
      "IL-23 inhibitor",
      "Interleukin-23 inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-415",
    "no": 415,
    "termEnteredByUser": "JAK inhibitor",
    "standardTerm": "Janus kinase inhibitor",
    "therapyArea": "Rheumatology/Dermatology",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "JANUS_KINASE_INHIBITOR",
    "spokenVariants": [
      "JAK inhibitor",
      "Janus kinase inhibitor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-416",
    "no": 416,
    "termEnteredByUser": "Biosimilar",
    "standardTerm": "Biosimilar medicine",
    "therapyArea": "Immunology/All",
    "category": "Drug class",
    "intentTag": "Treatment class",
    "riskTag": "No-risk",
    "synonymGroup": "BIOSIMILAR_MEDICINE",
    "spokenVariants": [
      "Biosimilar",
      "Biosimilar medicine"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-417",
    "no": 417,
    "termEnteredByUser": "Immunosuppression",
    "standardTerm": "Immunosuppression",
    "therapyArea": "Immunology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "IMMUNOSUPPRESSION",
    "spokenVariants": [
      "Immunosuppression"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-418",
    "no": 418,
    "termEnteredByUser": "Seizure",
    "standardTerm": "Seizure",
    "therapyArea": "Neurology",
    "category": "Disease event",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "SEIZURE",
    "spokenVariants": [
      "Seizure",
      "Fits"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-419",
    "no": 419,
    "termEnteredByUser": "Fits",
    "standardTerm": "Seizure",
    "therapyArea": "Neurology",
    "category": "Disease event",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "SEIZURE",
    "spokenVariants": [
      "Seizure",
      "Fits"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-420",
    "no": 420,
    "termEnteredByUser": "Epilepsy",
    "standardTerm": "Epilepsy",
    "therapyArea": "Neurology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "EPILEPSY",
    "spokenVariants": [
      "Epilepsy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-421",
    "no": 421,
    "termEnteredByUser": "Migraine",
    "standardTerm": "Migraine",
    "therapyArea": "Neurology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "MIGRAINE",
    "spokenVariants": [
      "Migraine"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-422",
    "no": 422,
    "termEnteredByUser": "Headache",
    "standardTerm": "Headache",
    "therapyArea": "Neurology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HEADACHE",
    "spokenVariants": [
      "Headache"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-423",
    "no": 423,
    "termEnteredByUser": "MS",
    "standardTerm": "Multiple sclerosis",
    "therapyArea": "Neurology/Immunology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "MULTIPLE_SCLEROSIS",
    "spokenVariants": [
      "MS",
      "Multiple sclerosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-424",
    "no": 424,
    "termEnteredByUser": "Multiple sclerosis",
    "standardTerm": "Multiple sclerosis",
    "therapyArea": "Neurology/Immunology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "MULTIPLE_SCLEROSIS",
    "spokenVariants": [
      "MS",
      "Multiple sclerosis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-425",
    "no": 425,
    "termEnteredByUser": "Relapse MS",
    "standardTerm": "Multiple sclerosis relapse",
    "therapyArea": "Neurology/Immunology",
    "category": "Disease event",
    "intentTag": "Efficacy",
    "riskTag": "Caution",
    "synonymGroup": "MULTIPLE_SCLEROSIS_RELAPSE",
    "spokenVariants": [
      "Relapse MS",
      "Multiple sclerosis relapse"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-426",
    "no": 426,
    "termEnteredByUser": "EDSS",
    "standardTerm": "Expanded Disability Status Scale",
    "therapyArea": "Neurology",
    "category": "Outcome",
    "intentTag": "Efficacy",
    "riskTag": "No-risk",
    "synonymGroup": "EXPANDED_DISABILITY_STATUS_SCALE",
    "spokenVariants": [
      "EDSS",
      "Expanded Disability Status Scale"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-427",
    "no": 427,
    "termEnteredByUser": "Parkinson",
    "standardTerm": "Parkinson's disease",
    "therapyArea": "Neurology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "PARKINSONS_DISEASE",
    "spokenVariants": [
      "Parkinson",
      "Parkinson's disease",
      "PD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-428",
    "no": 428,
    "termEnteredByUser": "PD",
    "standardTerm": "Parkinson's disease",
    "therapyArea": "Neurology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "PARKINSONS_DISEASE",
    "spokenVariants": [
      "Parkinson",
      "Parkinson's disease",
      "PD"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-429",
    "no": 429,
    "termEnteredByUser": "Tremor",
    "standardTerm": "Tremor",
    "therapyArea": "Neurology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "TREMOR",
    "spokenVariants": [
      "Tremor"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-430",
    "no": 430,
    "termEnteredByUser": "Dyskinesia",
    "standardTerm": "Dyskinesia",
    "therapyArea": "Neurology",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DYSKINESIA",
    "spokenVariants": [
      "Dyskinesia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-431",
    "no": 431,
    "termEnteredByUser": "Neuropathy",
    "standardTerm": "Peripheral neuropathy",
    "therapyArea": "Neurology/All",
    "category": "Disease/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PERIPHERAL_NEUROPATHY",
    "spokenVariants": [
      "Neuropathy",
      "Peripheral neuropathy"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-432",
    "no": 432,
    "termEnteredByUser": "Numbness",
    "standardTerm": "Paresthesia",
    "therapyArea": "Neurology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PARESTHESIA",
    "spokenVariants": [
      "Numbness",
      "Paresthesia",
      "Tingling"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-433",
    "no": 433,
    "termEnteredByUser": "Tingling",
    "standardTerm": "Paresthesia",
    "therapyArea": "Neurology/All",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "PARESTHESIA",
    "spokenVariants": [
      "Numbness",
      "Paresthesia",
      "Tingling"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-434",
    "no": 434,
    "termEnteredByUser": "Depression",
    "standardTerm": "Depression",
    "therapyArea": "Psychiatry/All",
    "category": "Disease/Safety",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "DEPRESSION",
    "spokenVariants": [
      "Depression"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-435",
    "no": 435,
    "termEnteredByUser": "Anxiety",
    "standardTerm": "Anxiety",
    "therapyArea": "Psychiatry/All",
    "category": "Disease/Safety",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "ANXIETY",
    "spokenVariants": [
      "Anxiety"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-436",
    "no": 436,
    "termEnteredByUser": "Suicidal ideation",
    "standardTerm": "Suicidal ideation",
    "therapyArea": "Psychiatry/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "Urgent PV flag",
    "synonymGroup": "SUICIDAL_IDEATION",
    "spokenVariants": [
      "Suicidal ideation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-437",
    "no": 437,
    "termEnteredByUser": "Mood changes",
    "standardTerm": "Mood changes",
    "therapyArea": "Psychiatry/All",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "MOOD_CHANGES",
    "spokenVariants": [
      "Mood changes"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-438",
    "no": 438,
    "termEnteredByUser": "Sleepiness",
    "standardTerm": "Somnolence",
    "therapyArea": "Neurology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "SOMNOLENCE",
    "spokenVariants": [
      "Sleepiness",
      "Somnolence",
      "Drowsiness"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-439",
    "no": 439,
    "termEnteredByUser": "Drowsiness",
    "standardTerm": "Somnolence",
    "therapyArea": "Neurology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "SOMNOLENCE",
    "spokenVariants": [
      "Sleepiness",
      "Somnolence",
      "Drowsiness"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-440",
    "no": 440,
    "termEnteredByUser": "Sedation",
    "standardTerm": "Sedation",
    "therapyArea": "Neurology/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "SEDATION",
    "spokenVariants": [
      "Sedation"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-441",
    "no": 441,
    "termEnteredByUser": "Dizziness",
    "standardTerm": "Dizziness",
    "therapyArea": "Neurology/All",
    "category": "Safety/Symptom",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "DIZZINESS",
    "spokenVariants": [
      "Dizziness"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-442",
    "no": 442,
    "termEnteredByUser": "Vertigo",
    "standardTerm": "Vertigo",
    "therapyArea": "Neurology/ENT",
    "category": "Symptom/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "VERTIGO",
    "spokenVariants": [
      "Vertigo"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-443",
    "no": 443,
    "termEnteredByUser": "Dependence",
    "standardTerm": "Drug dependence",
    "therapyArea": "Psychiatry/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "DRUG_DEPENDENCE",
    "spokenVariants": [
      "Dependence",
      "Drug dependence",
      "Addiction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-444",
    "no": 444,
    "termEnteredByUser": "Addiction",
    "standardTerm": "Drug dependence",
    "therapyArea": "Psychiatry/All",
    "category": "Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "DRUG_DEPENDENCE",
    "spokenVariants": [
      "Dependence",
      "Drug dependence",
      "Addiction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-445",
    "no": 445,
    "termEnteredByUser": "CKD",
    "standardTerm": "Chronic kidney disease",
    "therapyArea": "Nephrology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "CHRONIC_KIDNEY_DISEASE",
    "spokenVariants": [
      "CKD patient",
      "Chronic kidney disease",
      "CKD",
      "Kidney disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-446",
    "no": 446,
    "termEnteredByUser": "Kidney disease",
    "standardTerm": "Chronic kidney disease",
    "therapyArea": "Nephrology",
    "category": "Disease",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "CHRONIC_KIDNEY_DISEASE",
    "spokenVariants": [
      "CKD patient",
      "Chronic kidney disease",
      "CKD",
      "Kidney disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-447",
    "no": 447,
    "termEnteredByUser": "Acute kidney injury",
    "standardTerm": "Acute kidney injury",
    "therapyArea": "Nephrology",
    "category": "Disease/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ACUTE_KIDNEY_INJURY",
    "spokenVariants": [
      "Acute kidney injury",
      "AKI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-448",
    "no": 448,
    "termEnteredByUser": "AKI",
    "standardTerm": "Acute kidney injury",
    "therapyArea": "Nephrology",
    "category": "Abbreviation",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ACUTE_KIDNEY_INJURY",
    "spokenVariants": [
      "Acute kidney injury",
      "AKI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-449",
    "no": 449,
    "termEnteredByUser": "Renal failure",
    "standardTerm": "Renal failure",
    "therapyArea": "Nephrology",
    "category": "Disease/Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "RENAL_FAILURE",
    "spokenVariants": [
      "Renal failure",
      "Kidney failure"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-450",
    "no": 450,
    "termEnteredByUser": "Kidney failure",
    "standardTerm": "Renal failure",
    "therapyArea": "Nephrology",
    "category": "Disease/Safety",
    "intentTag": "Safety",
    "riskTag": "High-risk",
    "synonymGroup": "RENAL_FAILURE",
    "spokenVariants": [
      "Renal failure",
      "Kidney failure"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-451",
    "no": 451,
    "termEnteredByUser": "Proteinuria",
    "standardTerm": "Proteinuria",
    "therapyArea": "Nephrology",
    "category": "Lab/Disease marker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "PROTEINURIA",
    "spokenVariants": [
      "Proteinuria"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-452",
    "no": 452,
    "termEnteredByUser": "Albumin in urine",
    "standardTerm": "Albuminuria",
    "therapyArea": "Nephrology",
    "category": "Lab/Disease marker",
    "intentTag": "Evidence",
    "riskTag": "No-risk",
    "synonymGroup": "ALBUMINURIA",
    "spokenVariants": [
      "Albumin in urine",
      "Albuminuria"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-453",
    "no": 453,
    "termEnteredByUser": "Creatinine clearance",
    "standardTerm": "Creatinine clearance",
    "therapyArea": "Nephrology",
    "category": "Lab/renal",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "CREATININE_CLEARANCE",
    "spokenVariants": [
      "Creatinine clearance",
      "CrCl"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-454",
    "no": 454,
    "termEnteredByUser": "CrCl",
    "standardTerm": "Creatinine clearance",
    "therapyArea": "Nephrology",
    "category": "Abbreviation",
    "intentTag": "Dosage",
    "riskTag": "No-risk",
    "synonymGroup": "CREATININE_CLEARANCE",
    "spokenVariants": [
      "Creatinine clearance",
      "CrCl"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-455",
    "no": 455,
    "termEnteredByUser": "ESRD",
    "standardTerm": "End-stage renal disease",
    "therapyArea": "Nephrology",
    "category": "Abbreviation",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "END_STAGE_RENAL_DISEASE",
    "spokenVariants": [
      "ESRD",
      "End-stage renal disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-456",
    "no": 456,
    "termEnteredByUser": "ESKD",
    "standardTerm": "End-stage kidney disease",
    "therapyArea": "Nephrology",
    "category": "Abbreviation",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "END_STAGE_KIDNEY_DISEASE",
    "spokenVariants": [
      "ESKD",
      "End-stage kidney disease"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-457",
    "no": 457,
    "termEnteredByUser": "Hemodialysis",
    "standardTerm": "Hemodialysis",
    "therapyArea": "Nephrology",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "HEMODIALYSIS",
    "spokenVariants": [
      "Hemodialysis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-458",
    "no": 458,
    "termEnteredByUser": "Peritoneal dialysis",
    "standardTerm": "Peritoneal dialysis",
    "therapyArea": "Nephrology",
    "category": "Special population",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "PERITONEAL_DIALYSIS",
    "spokenVariants": [
      "Peritoneal dialysis"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-459",
    "no": 459,
    "termEnteredByUser": "Kidney transplant",
    "standardTerm": "Renal transplant recipient",
    "therapyArea": "Nephrology",
    "category": "Special population",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "RENAL_TRANSPLANT_RECIPIENT",
    "spokenVariants": [
      "Kidney transplant",
      "Renal transplant recipient"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-460",
    "no": 460,
    "termEnteredByUser": "Hyperkalemia",
    "standardTerm": "Hyperkalemia",
    "therapyArea": "Nephrology/Cardiology",
    "category": "Lab/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPERKALEMIA",
    "spokenVariants": [
      "Hyperkalemia",
      "High potassium"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-461",
    "no": 461,
    "termEnteredByUser": "High potassium",
    "standardTerm": "Hyperkalemia",
    "therapyArea": "Nephrology/Cardiology",
    "category": "Lab/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPERKALEMIA",
    "spokenVariants": [
      "Hyperkalemia",
      "High potassium"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-462",
    "no": 462,
    "termEnteredByUser": "Hypokalemia",
    "standardTerm": "Hypokalemia",
    "therapyArea": "Nephrology/Cardiology",
    "category": "Lab/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPOKALEMIA",
    "spokenVariants": [
      "Hypokalemia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-463",
    "no": 463,
    "termEnteredByUser": "Low sodium",
    "standardTerm": "Hyponatremia",
    "therapyArea": "Nephrology/All",
    "category": "Lab/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPONATREMIA",
    "spokenVariants": [
      "Low sodium",
      "Hyponatremia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-464",
    "no": 464,
    "termEnteredByUser": "Hyponatremia",
    "standardTerm": "Hyponatremia",
    "therapyArea": "Nephrology/All",
    "category": "Lab/Safety",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "HYPONATREMIA",
    "spokenVariants": [
      "Low sodium",
      "Hyponatremia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-465",
    "no": 465,
    "termEnteredByUser": "UTI recurrent",
    "standardTerm": "Recurrent urinary tract infection",
    "therapyArea": "Urology/Infectious Disease",
    "category": "Disease",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "RECURRENT_URINARY_TRACT_INFECTION",
    "spokenVariants": [
      "UTI recurrent",
      "Recurrent urinary tract infection"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-466",
    "no": 466,
    "termEnteredByUser": "BPH",
    "standardTerm": "Benign prostatic hyperplasia",
    "therapyArea": "Urology",
    "category": "Abbreviation",
    "intentTag": "General medical",
    "riskTag": "No-risk",
    "synonymGroup": "BENIGN_PROSTATIC_HYPERPLASIA",
    "spokenVariants": [
      "BPH",
      "Benign prostatic hyperplasia"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-467",
    "no": 467,
    "termEnteredByUser": "Brand name",
    "standardTerm": "Brand name",
    "therapyArea": "All",
    "category": "Product dictionary",
    "intentTag": "Product mapping",
    "riskTag": "No-risk",
    "synonymGroup": "BRAND_NAME",
    "spokenVariants": [
      "Brand name"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-468",
    "no": 468,
    "termEnteredByUser": "Generic name",
    "standardTerm": "Generic name",
    "therapyArea": "All",
    "category": "Product dictionary",
    "intentTag": "Product mapping",
    "riskTag": "No-risk",
    "synonymGroup": "GENERIC_NAME",
    "spokenVariants": [
      "Generic name"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-469",
    "no": 469,
    "termEnteredByUser": "Molecule",
    "standardTerm": "Active ingredient",
    "therapyArea": "All",
    "category": "Product dictionary",
    "intentTag": "Product mapping",
    "riskTag": "No-risk",
    "synonymGroup": "ACTIVE_INGREDIENT",
    "spokenVariants": [
      "Molecule",
      "Active ingredient"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-470",
    "no": 470,
    "termEnteredByUser": "Composition",
    "standardTerm": "Composition",
    "therapyArea": "All",
    "category": "Product dictionary",
    "intentTag": "Product mapping",
    "riskTag": "No-risk",
    "synonymGroup": "COMPOSITION",
    "spokenVariants": [
      "Composition"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-471",
    "no": 471,
    "termEnteredByUser": "Strength",
    "standardTerm": "Product strength",
    "therapyArea": "All",
    "category": "Product dictionary",
    "intentTag": "Product mapping",
    "riskTag": "No-risk",
    "synonymGroup": "PRODUCT_STRENGTH",
    "spokenVariants": [
      "Strength",
      "Product strength"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-472",
    "no": 472,
    "termEnteredByUser": "Indication",
    "standardTerm": "Approved indication",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Guideline/label",
    "riskTag": "No-risk",
    "synonymGroup": "APPROVED_INDICATION",
    "spokenVariants": [
      "Indication",
      "Approved indication",
      "Approved use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-473",
    "no": 473,
    "termEnteredByUser": "Approved use",
    "standardTerm": "Approved indication",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Guideline/label",
    "riskTag": "No-risk",
    "synonymGroup": "APPROVED_INDICATION",
    "spokenVariants": [
      "Indication",
      "Approved indication",
      "Approved use"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-474",
    "no": 474,
    "termEnteredByUser": "Label",
    "standardTerm": "Prescribing information",
    "therapyArea": "All",
    "category": "Document type",
    "intentTag": "Source retrieval",
    "riskTag": "No-risk",
    "synonymGroup": "PRESCRIBING_INFORMATION",
    "spokenVariants": [
      "Label",
      "Prescribing information",
      "PI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-475",
    "no": 475,
    "termEnteredByUser": "PI",
    "standardTerm": "Prescribing information",
    "therapyArea": "All",
    "category": "Document type",
    "intentTag": "Source retrieval",
    "riskTag": "No-risk",
    "synonymGroup": "PRESCRIBING_INFORMATION",
    "spokenVariants": [
      "Label",
      "Prescribing information",
      "PI"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-476",
    "no": 476,
    "termEnteredByUser": "SmPC",
    "standardTerm": "Summary of Product Characteristics",
    "therapyArea": "All",
    "category": "Document type",
    "intentTag": "Source retrieval",
    "riskTag": "No-risk",
    "synonymGroup": "SUMMARY_OF_PRODUCT_CHARACTERISTICS",
    "spokenVariants": [
      "SmPC",
      "Summary of Product Characteristics"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-477",
    "no": 477,
    "termEnteredByUser": "Package insert",
    "standardTerm": "Package insert",
    "therapyArea": "All",
    "category": "Document type",
    "intentTag": "Source retrieval",
    "riskTag": "No-risk",
    "synonymGroup": "PACKAGE_INSERT",
    "spokenVariants": [
      "Package insert"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-478",
    "no": 478,
    "termEnteredByUser": "Patient leaflet",
    "standardTerm": "Patient information leaflet",
    "therapyArea": "All",
    "category": "Document type",
    "intentTag": "Source retrieval",
    "riskTag": "No-risk",
    "synonymGroup": "PATIENT_INFORMATION_LEAFLET",
    "spokenVariants": [
      "Patient leaflet",
      "Patient information leaflet"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-479",
    "no": 479,
    "termEnteredByUser": "Clinical section",
    "standardTerm": "Clinical studies section",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Source retrieval",
    "riskTag": "No-risk",
    "synonymGroup": "CLINICAL_STUDIES_SECTION",
    "spokenVariants": [
      "Clinical section",
      "Clinical studies section"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-480",
    "no": 480,
    "termEnteredByUser": "Warnings section",
    "standardTerm": "Warnings and precautions section",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "WARNINGS_AND_PRECAUTIONS_SECTION",
    "spokenVariants": [
      "Warnings section",
      "Warnings and precautions section"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-481",
    "no": 481,
    "termEnteredByUser": "Contraindications section",
    "standardTerm": "Contraindications section",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Safety",
    "riskTag": "Caution",
    "synonymGroup": "CONTRAINDICATIONS_SECTION",
    "spokenVariants": [
      "Contraindications section"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-482",
    "no": 482,
    "termEnteredByUser": "Adverse reactions section",
    "standardTerm": "Adverse reactions section",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Safety",
    "riskTag": "AE flag",
    "synonymGroup": "ADVERSE_REACTIONS_SECTION",
    "spokenVariants": [
      "Adverse reactions section"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-483",
    "no": 483,
    "termEnteredByUser": "Drug interactions section",
    "standardTerm": "Drug interactions section",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Interaction",
    "riskTag": "Caution",
    "synonymGroup": "DRUG_INTERACTIONS_SECTION",
    "spokenVariants": [
      "Drug interactions section"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-484",
    "no": 484,
    "termEnteredByUser": "Special population section",
    "standardTerm": "Use in specific populations section",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Dosage/Safety",
    "riskTag": "Caution",
    "synonymGroup": "USE_IN_SPECIFIC_POPULATIONS_SECTION",
    "spokenVariants": [
      "Special population section",
      "Use in specific populations section"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-485",
    "no": 485,
    "termEnteredByUser": "Storage",
    "standardTerm": "Storage conditions",
    "therapyArea": "All",
    "category": "Label section",
    "intentTag": "Product information",
    "riskTag": "No-risk",
    "synonymGroup": "STORAGE_CONDITIONS",
    "spokenVariants": [
      "Storage",
      "Storage conditions"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-486",
    "no": 486,
    "termEnteredByUser": "Shelf life",
    "standardTerm": "Shelf life",
    "therapyArea": "All",
    "category": "Product information",
    "intentTag": "Product information",
    "riskTag": "No-risk",
    "synonymGroup": "SHELF_LIFE",
    "spokenVariants": [
      "Shelf life"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-487",
    "no": 487,
    "termEnteredByUser": "Stability",
    "standardTerm": "Stability information",
    "therapyArea": "All",
    "category": "Product information",
    "intentTag": "Product information",
    "riskTag": "No-risk",
    "synonymGroup": "STABILITY_INFORMATION",
    "spokenVariants": [
      "Stability",
      "Stability information"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-488",
    "no": 488,
    "termEnteredByUser": "Internal use only",
    "standardTerm": "Internal-use content",
    "therapyArea": "All",
    "category": "Content governance",
    "intentTag": "Content review",
    "riskTag": "No-risk",
    "synonymGroup": "INTERNAL_USE_CONTENT",
    "spokenVariants": [
      "Internal use only",
      "Internal-use content"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-489",
    "no": 489,
    "termEnteredByUser": "Medical review",
    "standardTerm": "Medical review required",
    "therapyArea": "All",
    "category": "Workflow",
    "intentTag": "Review",
    "riskTag": "No-risk",
    "synonymGroup": "MEDICAL_REVIEW_REQUIRED",
    "spokenVariants": [
      "Medical review",
      "Medical review required"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-490",
    "no": 490,
    "termEnteredByUser": "Approved response",
    "standardTerm": "Approved standard response",
    "therapyArea": "All",
    "category": "Workflow",
    "intentTag": "Response library",
    "riskTag": "No-risk",
    "synonymGroup": "APPROVED_STANDARD_RESPONSE",
    "spokenVariants": [
      "Approved response",
      "Approved standard response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-491",
    "no": 491,
    "termEnteredByUser": "Draft response",
    "standardTerm": "Draft response",
    "therapyArea": "All",
    "category": "Workflow",
    "intentTag": "Review",
    "riskTag": "No-risk",
    "synonymGroup": "DRAFT_RESPONSE",
    "spokenVariants": [
      "Draft response"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-492",
    "no": 492,
    "termEnteredByUser": "Send back",
    "standardTerm": "Sent back for correction",
    "therapyArea": "All",
    "category": "Workflow",
    "intentTag": "Review",
    "riskTag": "No-risk",
    "synonymGroup": "SENT_BACK_FOR_CORRECTION",
    "spokenVariants": [
      "Send back",
      "Sent back for correction"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-493",
    "no": 493,
    "termEnteredByUser": "Escalate",
    "standardTerm": "Escalation required",
    "therapyArea": "All",
    "category": "Workflow",
    "intentTag": "Review",
    "riskTag": "Caution",
    "synonymGroup": "ESCALATION_REQUIRED",
    "spokenVariants": [
      "Escalate",
      "Escalation required"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-494",
    "no": 494,
    "termEnteredByUser": "Medical head approval",
    "standardTerm": "Medical Head approval required",
    "therapyArea": "All",
    "category": "Workflow",
    "intentTag": "Review",
    "riskTag": "Caution",
    "synonymGroup": "MEDICAL_HEAD_APPROVAL_REQUIRED",
    "spokenVariants": [
      "Medical head approval",
      "Medical Head approval required"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-495",
    "no": 495,
    "termEnteredByUser": "PV",
    "standardTerm": "Pharmacovigilance",
    "therapyArea": "All",
    "category": "Safety workflow",
    "intentTag": "Safety",
    "riskTag": "PV flag",
    "synonymGroup": "PHARMACOVIGILANCE",
    "spokenVariants": [
      "PV",
      "Pharmacovigilance"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-496",
    "no": 496,
    "termEnteredByUser": "Pharmacovigilance",
    "standardTerm": "Pharmacovigilance",
    "therapyArea": "All",
    "category": "Safety workflow",
    "intentTag": "Safety",
    "riskTag": "PV flag",
    "synonymGroup": "PHARMACOVIGILANCE",
    "spokenVariants": [
      "PV",
      "Pharmacovigilance"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-497",
    "no": 497,
    "termEnteredByUser": "MAH",
    "standardTerm": "Marketing authorization holder",
    "therapyArea": "All",
    "category": "Regulatory",
    "intentTag": "Compliance",
    "riskTag": "No-risk",
    "synonymGroup": "MARKETING_AUTHORIZATION_HOLDER",
    "spokenVariants": [
      "MAH",
      "Marketing authorization holder"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-498",
    "no": 498,
    "termEnteredByUser": "RMP",
    "standardTerm": "Risk management plan",
    "therapyArea": "All",
    "category": "Regulatory/Safety",
    "intentTag": "Safety",
    "riskTag": "No-risk",
    "synonymGroup": "RISK_MANAGEMENT_PLAN",
    "spokenVariants": [
      "RMP",
      "Risk management plan"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-499",
    "no": 499,
    "termEnteredByUser": "DHPC",
    "standardTerm": "Direct healthcare professional communication",
    "therapyArea": "All",
    "category": "Regulatory/Safety",
    "intentTag": "Safety",
    "riskTag": "No-risk",
    "synonymGroup": "DIRECT_HEALTHCARE_PROFESSIONAL_COMMUNICATION",
    "spokenVariants": [
      "DHPC",
      "Direct healthcare professional communication",
      "Dear doctor letter"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  },
  {
    "id": "vocab-500",
    "no": 500,
    "termEnteredByUser": "Dear doctor letter",
    "standardTerm": "Direct healthcare professional communication",
    "therapyArea": "All",
    "category": "Regulatory/Safety",
    "intentTag": "Safety",
    "riskTag": "No-risk",
    "synonymGroup": "DIRECT_HEALTHCARE_PROFESSIONAL_COMMUNICATION",
    "spokenVariants": [
      "DHPC",
      "Direct healthcare professional communication",
      "Dear doctor letter"
    ],
    "status": "Approved for Demo",
    "reviewer": "Medical Advisor/Manager",
    "sourceBasis": "Demo vocabulary; medical review required before production"
  }
];

export function getAllVocabularyTags(): VocabularyTag[] {
  return VOCABULARY_TAGS_DATA;
}

export function getVocabularyTagsByTherapyArea(therapyArea: string): VocabularyTag[] {
  if (!therapyArea || therapyArea === "All") return VOCABULARY_TAGS_DATA;
  return VOCABULARY_TAGS_DATA.filter(
    (tag) => tag.therapyArea === "All" || tag.therapyArea.includes(therapyArea)
  );
}

export function searchVocabularyTags(
  query: string,
  options?: {
    therapyArea?: string;
    riskTag?: VocabularyRiskTag;
    category?: string;
  }
): VocabularyTag[] {
  const q = query.trim().toLowerCase();
  return VOCABULARY_TAGS_DATA.filter((tag) => {
    if (options?.therapyArea && options.therapyArea !== "All") {
      if (tag.therapyArea !== "All" && !tag.therapyArea.includes(options.therapyArea)) {
        return false;
      }
    }
    if (options?.riskTag && tag.riskTag !== options.riskTag) {
      return false;
    }
    if (options?.category && tag.category !== options.category) {
      return false;
    }
    if (!q) return true;
    return (
      tag.termEnteredByUser?.toLowerCase().includes(q) ||
      tag.standardTerm?.toLowerCase().includes(q) ||
      tag.synonymGroup.toLowerCase().includes(q) ||
      tag.category.toLowerCase().includes(q) ||
      tag.intentTag.toLowerCase().includes(q) ||
      tag.spokenVariants.some((v) => v.toLowerCase().includes(q))
    );
  });
}

export function getTherapyAreaList(): string[] {
  const areas = new Set<string>();
  VOCABULARY_TAGS_DATA.forEach((t) => {
    t.therapyArea.split("/").forEach((sub) => areas.add(sub.trim()));
  });
  return Array.from(areas).sort();
}

export function getRiskTagList(): VocabularyRiskTag[] {
  return [
    "No-risk",
    "Caution",
    "High-risk",
    "AE flag",
    "Block",
    "Urgent PV flag",
    "PV flag",
    "PV/Quality flag"
  ];
}
