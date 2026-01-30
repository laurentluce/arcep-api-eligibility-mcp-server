# Simplify Eligibilities Flow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Simplify the get_fixed_line_eligibilities tool by using `/eligibilites/fixe_id` (takes building ID directly) instead of `/eligibilites/fixe` (requires address code), removing the `getBuilding` step.

**Architecture:** Remove `Building` interface and `getBuilding` function. Change `getFixedLineEligibilities` to accept a building ID and call `/eligibilites/fixe_id`. Update the orchestrator to go directly from address → eligibilities.

**Tech Stack:** TypeScript, `@modelcontextprotocol/sdk`, Node.js native fetch

---

### Task 1: Simplify eligibilities flow

**Files:**
- Modify: `src/index.ts`

**Step 1: Update src/index.ts**

Remove the `Building` interface (lines 61-66) and `getBuilding` function (lines 68-76).

Change `getFixedLineEligibilities` from:

```typescript
async function getFixedLineEligibilities(addressCode: string): Promise<unknown> {
  return arcepFetch("/eligibilites/fixe", { codeadr: addressCode });
}
```

To:

```typescript
async function getFixedLineEligibilities(buildingId: number): Promise<unknown> {
  return arcepFetch("/eligibilites/fixe_id", { immeubleid: String(buildingId) });
}
```

Change `getFixedLineEligibilitiesByAddress` from:

```typescript
async function getFixedLineEligibilitiesByAddress(
  streetAddress: string,
  townName: string
): Promise<string> {
  const town = await getTown(townName);
  const address = await getAddress(streetAddress, town.comid);
  const building = await getBuilding(address.immeubleid);
  const eligibilities = await getFixedLineEligibilities(building.code_adr);
  return JSON.stringify(eligibilities, null, 2);
}
```

To:

```typescript
async function getFixedLineEligibilitiesByAddress(
  streetAddress: string,
  townName: string
): Promise<string> {
  const town = await getTown(townName);
  const address = await getAddress(streetAddress, town.comid);
  const eligibilities = await getFixedLineEligibilities(address.immeubleid);
  return JSON.stringify(eligibilities, null, 2);
}
```

**Step 2: Build the project**

Run: `npm run build`
Expected: Compiles without errors

**Step 3: Commit**

```bash
git add src/index.ts
git commit -m "refactor: simplify eligibilities flow using /eligibilites/fixe_id"
```
