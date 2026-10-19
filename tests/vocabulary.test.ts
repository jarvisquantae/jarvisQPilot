import { test, describe } from "node:test";
import assert from "node:assert";
import {
  VOCABULARY_TAGS_DATA,
  getAllVocabularyTags,
  getVocabularyTagsByTherapyArea,
  searchVocabularyTags,
  getTherapyAreaList,
  getRiskTagList,
} from "../src/data/vocabulary-tags.ts";
import { buildProhibitedTermsFromTags } from "../src/services/ai.ts";

describe("500 WhatsApp Vocabulary Tags Ingestion & Guardrails Test", () => {
  test("Complete dataset: exactly 500 tags ingested from WhatsApp Vocabulary Tags.csv", () => {
    const allTags = getAllVocabularyTags();
    assert.strictEqual(allTags.length, 500, "Should contain exactly 500 vocabulary tags");
    assert.strictEqual(VOCABULARY_TAGS_DATA.length, 500);

    // Verify tag numbering 1 to 500
    assert.strictEqual(allTags[0].no, 1);
    assert.strictEqual(allTags[499].no, 500);
  });

  test("Every tag has required clinical and guardrail metadata", () => {
    const allTags = getAllVocabularyTags();
    for (const tag of allTags) {
      assert.ok(tag.id, "Tag must have an id");
      assert.ok(tag.no && tag.no >= 1 && tag.no <= 500, `Tag ${tag.id} must have a valid number`);
      assert.ok(tag.termEnteredByUser, `Tag #${tag.no} must have termEnteredByUser`);
      assert.ok(tag.standardTerm, `Tag #${tag.no} must have standardTerm`);
      assert.ok(tag.therapyArea, `Tag #${tag.no} must have therapyArea`);
      assert.ok(tag.category, `Tag #${tag.no} must have category`);
      assert.ok(tag.intentTag, `Tag #${tag.no} must have intentTag`);
      assert.ok(tag.riskTag, `Tag #${tag.no} must have riskTag`);
      assert.ok(tag.synonymGroup, `Tag #${tag.no} must have synonymGroup`);
      assert.ok(Array.isArray(tag.spokenVariants), `Tag #${tag.no} must have spokenVariants array`);
      assert.ok(tag.spokenVariants.length > 0, `Tag #${tag.no} must have at least 1 spoken variant`);
    }
  });

  test("All 8 risk tag classifications are preserved and correctly categorized", () => {
    const expectedRiskTags = [
      "No-risk",
      "Caution",
      "High-risk",
      "AE flag",
      "Block",
      "Urgent PV flag",
      "PV flag",
      "PV/Quality flag",
    ];

    const definedList = getRiskTagList();
    assert.deepStrictEqual(definedList, expectedRiskTags);

    const counts: Record<string, number> = {};
    for (const tag of getAllVocabularyTags()) {
      counts[tag.riskTag] = (counts[tag.riskTag] || 0) + 1;
    }

    for (const risk of expectedRiskTags) {
      assert.ok(counts[risk] && counts[risk] > 0, `Risk category "${risk}" must be represented in data`);
    }

    // Safety checks: PV and Block flags exist
    assert.ok(counts["Block"] > 0, "Must contain Block risk tags");
    assert.ok(counts["Urgent PV flag"] > 0, "Must contain Urgent PV flag tags");
    assert.ok(counts["PV flag"] > 0, "Must contain PV flag tags");
    assert.ok(counts["AE flag"] > 0, "Must contain AE flag tags");
  });

  test("Therapy areas list extracts distinct medical specialties", () => {
    const areas = getTherapyAreaList();
    assert.ok(areas.length >= 20, `Should contain at least 20 therapy areas, found ${areas.length}`);
    assert.ok(areas.includes("Cardiology"), "Should include Cardiology");
    assert.ok(areas.includes("Neurology"), "Should include Neurology");
    assert.ok(areas.includes("Respiratory"), "Should include Respiratory");
    assert.ok(areas.includes("Diabetes"), "Should include Diabetes");
    assert.ok(areas.includes("Oncology"), "Should include Oncology");
    assert.ok(areas.includes("All"), "Should include All");
  });

  test("searchVocabularyTags correctly queries terms, synonyms, and variants", () => {
    const htnResults = searchVocabularyTags("HTN");
    assert.ok(htnResults.length >= 1, "Should find HTN");
    assert.strictEqual(htnResults[0].synonymGroup, "HYPERTENSION");

    const lungAttack = searchVocabularyTags("Lung attack");
    assert.ok(lungAttack.length >= 1, "Should find Lung attack");
    assert.strictEqual(lungAttack[0].standardTerm, "COPD exacerbation");

    // Test therapy area filter
    const cardioOnly = getVocabularyTagsByTherapyArea("Cardiology");
    assert.ok(cardioOnly.length > 0, "Should return cardiology tags");
    for (const t of cardioOnly) {
      assert.ok(
        t.therapyArea === "All" || t.therapyArea.includes("Cardiology"),
        `Tag #${t.no} should be in Cardiology or All`
      );
    }
  });

  test("buildProhibitedTermsFromTags extracts guardrails terms from vocabulary tags", () => {
    const tags = getAllVocabularyTags();
    const guardrails = buildProhibitedTermsFromTags(tags);

    assert.ok(guardrails.prohibitedTerms.length > 0, "Should extract Block terms");
    assert.ok(guardrails.urgentPVTerms.length > 0, "Should extract Urgent PV / PV terms");
    assert.ok(guardrails.aeTerms.length > 0, "Should extract AE flag / High-risk terms");
    assert.ok(guardrails.cautionTerms.length > 0, "Should extract Caution terms");
  });
});
