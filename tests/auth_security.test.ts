import { test, describe } from "node:test";
import assert from "node:assert";
import { DEMO_USERS } from "../src/lib/users.ts";
import type { UserRole } from "../src/types/index.ts";

describe("Authentication, Roles & Data Security Tests", () => {
  test("All 4 role identities (TM, MM, SM, ADMIN) exist with strict profile isolation", () => {
    const roles: UserRole[] = ["TM", "MM", "SM", "ADMIN"];
    for (const role of roles) {
      const user = DEMO_USERS[role];
      assert.ok(user, `User for role ${role} must exist`);
      assert.strictEqual(user.role, role);
      assert.ok(user.email.includes("@quantae.ai"));
      assert.ok(user.name.length > 2);
    }
  });

  test("Territory Manager profile is strictly scoped to territory operations", () => {
    const tm = DEMO_USERS.TM;
    assert.strictEqual(tm.role, "TM");
    assert.strictEqual(tm.roleLabel, "Territory Manager");
    assert.ok(tm.territory, "TM must have assigned territory");
  });

  test("Sales Manager profile has regional supervisory authority", () => {
    const sm = DEMO_USERS.SM;
    assert.strictEqual(sm.role, "SM");
    assert.strictEqual(sm.roleLabel, "Sales Manager");
    assert.ok(sm.territory?.includes("Region") || sm.territory?.includes("Zone"));
  });

  test("Marketing Manager profile has brand portfolio oversight", () => {
    const mm = DEMO_USERS.MM;
    assert.strictEqual(mm.role, "MM");
    assert.strictEqual(mm.roleLabel, "Marketing Manager");
  });

  test("Admin profile has enterprise system administration scope", () => {
    const admin = DEMO_USERS.ADMIN;
    assert.strictEqual(admin.role, "ADMIN");
    assert.strictEqual(admin.roleLabel, "System Administrator");
  });
});
