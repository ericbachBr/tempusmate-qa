window.QA_DATA = {
  "meta": {
    "project": "TempusMate",
    "title": "QA & E2E Dashboard",
    "updatedAt": "2026-08-09",
    "baseline": {
      "client": "E2E Crazy Client",
      "hours": 32,
      "amount": 920,
      "currency": "GBP",
      "note": "Baseline before advanced Invoice mutations/extras."
    }
  },
  "summary": {
    "bugsCatalogued": 10,
    "resolvedOrImplemented": 9,
    "openOrPending": 1,
    "testsExecuted": 10,
    "pendingScenarios": 21
  },
  "rules": [
    {
      "id": "RULE-CLIENT-01",
      "title": "Profile identity wins",
      "text": "When profileId/clientId exists, it is the authoritative client identity. Editable text must not override it."
    },
    {
      "id": "RULE-CLIENT-02",
      "title": "Manual name is not Profile identity",
      "text": "Exact normalized name matching may be used for approved eligibility/read-only compatibility, but must never create or persist Profile identity."
    },
    {
      "id": "RULE-INVOICE-01",
      "title": "One client per Invoice",
      "text": "An employee Invoice must not mix protected rows from different client identities."
    },
    {
      "id": "RULE-SNAPSHOT-01",
      "title": "Historical financial snapshot",
      "text": "Imported/existing rows preserve rate, overtime and rules. Current Client defaults seed new rows only."
    },
    {
      "id": "RULE-BREAK-01",
      "title": "Break allocation",
      "text": "Unpaid break minutes are deducted from the lowest active multiplier bucket first, then the next-lowest bucket if needed."
    },
    {
      "id": "RULE-DURATION-01",
      "title": "Decimal internally, clock format visually",
      "text": "Financial calculations keep decimal hours internally; user-facing durations use the shared hours/minutes formatter."
    },
    {
      "id": "RULE-IMPORT-01",
      "title": "Duplicate protection is per Invoice",
      "text": "The same historical Shift may appear in multiple different Invoices, but must not be imported twice into the same Invoice."
    }
  ],
  "bugs": [
    {
      "id": "BUG-01",
      "area": "Invoice / Client",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Client change repriced existing rows",
      "description": "Changing/reselecting a Client rewrote rate, overtime and rules on existing/imported rows.",
      "resolution": "Existing rows became protected snapshots. Client defaults now govern new rows only.",
      "verification": "Manual regression passed."
    },
    {
      "id": "BUG-02",
      "area": "Invoice / Import",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Import Shifts ignored Invoice client",
      "description": "The selector could expose shifts from unrelated clients.",
      "resolution": "Eligibility now uses Profile identity first, supports approved exact manual-name matching, and includes truly blank-client shifts.",
      "verification": "Manual Itau/Santander/Profile/manual/blank matrix passed."
    },
    {
      "id": "BUG-03",
      "area": "Invoice / Identity",
      "severity": "MEDIUM",
      "status": "resolved",
      "title": "Manual Invoice name missed matching Profile-linked shifts",
      "description": "An Invoice manually typed as 'Itau' excluded shifts formally linked to the Itau Profile.",
      "resolution": "For eligibility only, manual Invoice names can match a linked Profile's current name exactly without creating Profile identity.",
      "verification": "Manual regression passed."
    },
    {
      "id": "BUG-04",
      "area": "Invoice / Identity",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Selected Profile + edited text created hybrid identity",
      "description": "After selecting Santander, manually editing the Client Name to Itau produced a mixed shift subset.",
      "resolution": "When profileId exists, the selected Profile is the sole eligibility authority.",
      "verification": "Manual Santander/Itau conflict regression passed."
    },
    {
      "id": "BUG-05",
      "area": "Invoice / Client",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Client could change with protected rows",
      "description": "An Invoice could retain ITAU rows and then import Santander rows after switching client.",
      "resolution": "Client switching is blocked when protected employee rows already exist; the previous selection is restored.",
      "verification": "Automated suite + manual behavior confirmed."
    },
    {
      "id": "BUG-06",
      "area": "Invoice / Add Shift",
      "severity": "HIGH",
      "status": "resolved",
      "title": "New manual row did not receive Client hourly rate",
      "description": "The + Add Shift caller omitted effectiveHourlyRate.",
      "resolution": "effectiveHourlyRate is forwarded, reset for new Invoice sessions and re-derived on edit.",
      "verification": "Automated suite green; manual flow previously confirmed."
    },
    {
      "id": "BUG-07",
      "area": "Calendar / Shift",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Delete Shift confirmed but did nothing",
      "description": "deleteShiftFromHistory called undefined saveState(), aborting before persistence and re-render.",
      "resolution": "Uses saveHistoryToLocalStorage(). Saved Invoice snapshots remain independent.",
      "verification": "Manual deletion passed."
    },
    {
      "id": "BUG-08",
      "area": "Invoice / Starter Row",
      "severity": "MEDIUM",
      "status": "implemented",
      "title": "Blank starter row did not receive Client defaults",
      "description": "The initial empty employee row existed before Client selection and was skipped by snapshot-protection logic.",
      "resolution": "Only the single truly blank starter row is replaced/reseeded with the same defaults as + Add Shift Row.",
      "verification": "444/444 automated tests; manual retest still pending."
    },
    {
      "id": "BUG-09",
      "area": "UI / Duration",
      "severity": "MEDIUM",
      "status": "resolved",
      "title": "Decimal-hour UI formatting",
      "description": "Durations were shown as 2.50h instead of hours/minutes.",
      "resolution": "UI surfaces now use formatHoursMinutes(); internal decimal-hour math/storage remains unchanged.",
      "verification": "444/444 automated tests; visual smoke will happen naturally in E2E."
    },
    {
      "id": "BUG-10",
      "area": "Invoice / Import",
      "severity": "HIGH",
      "status": "open",
      "title": "Same Shift can be reimported into the same Invoice",
      "description": "Reopening Generate from Shifts still exposes shifts already imported into the current Invoice.",
      "resolution": "Planned: persist sourceShiftId on imported rows and exclude IDs already present in the currently open Invoice only.",
      "verification": "Reproduced manually. Cross-Invoice reuse must remain allowed."
    }
  ],
  "executedTests": [
    {
      "id": "T-01",
      "area": "Client Profile",
      "scenario": "E2E client with £20 hourly rate + custom OT rules",
      "status": "pass",
      "result": "Baseline client created."
    },
    {
      "id": "T-02",
      "area": "Shift A",
      "scenario": "06:00–10:00, no break, £20",
      "status": "pass",
      "result": "4h / £90"
    },
    {
      "id": "T-03",
      "area": "Shift B",
      "scenario": "16:00–23:00, no break, £20",
      "status": "pass",
      "result": "7h / £200"
    },
    {
      "id": "T-04",
      "area": "Shift C",
      "scenario": "06:00–23:00, 60m break, £20",
      "status": "pass",
      "result": "16h / £390"
    },
    {
      "id": "T-05",
      "area": "Break policy",
      "scenario": "Break across multiple OT multipliers",
      "status": "pass",
      "result": "Lowest multiplier bucket is consumed first."
    },
    {
      "id": "T-06",
      "area": "Shift D",
      "scenario": "18:00–23:00, no break, manual £30",
      "status": "pass",
      "result": "5h / £240"
    },
    {
      "id": "T-07",
      "area": "Home Summary",
      "scenario": "Aggregate four E2E shifts",
      "status": "pass",
      "result": "32h / £920"
    },
    {
      "id": "T-08",
      "area": "Invoice Filter",
      "scenario": "Generate from Shifts for E2E client",
      "status": "pass",
      "result": "Exactly the 4 eligible shifts were shown."
    },
    {
      "id": "T-09",
      "area": "Invoice Import",
      "scenario": "Import all four E2E shifts",
      "status": "pass",
      "result": "Times, break, rates and OT snapshots preserved; Shift D stayed £30."
    },
    {
      "id": "T-10",
      "area": "Duplicate Import",
      "scenario": "Reopen Generate from Shifts after import",
      "status": "fail",
      "result": "Same 4 shifts remained selectable in the same Invoice."
    }
  ],
  "baselineShifts": [
    {
      "name": "Shift A",
      "time": "06:00–10:00",
      "breakMinutes": 0,
      "rate": 20,
      "hours": 4,
      "amount": 90
    },
    {
      "name": "Shift B",
      "time": "16:00–23:00",
      "breakMinutes": 0,
      "rate": 20,
      "hours": 7,
      "amount": 200
    },
    {
      "name": "Shift C",
      "time": "06:00–23:00",
      "breakMinutes": 60,
      "rate": 20,
      "hours": 16,
      "amount": 390
    },
    {
      "name": "Shift D",
      "time": "18:00–23:00",
      "breakMinutes": 0,
      "rate": 30,
      "hours": 5,
      "amount": 240
    }
  ],
  "pendingScenarios": [
    {
      "id": "P-01",
      "area": "Invoice E2E",
      "title": "Confirm total after importing 4 shifts",
      "status": "next",
      "expectation": "32h / £920 before extras."
    },
    {
      "id": "P-02",
      "area": "Invoice E2E",
      "title": "Edit rate manually on an imported row",
      "status": "pending",
      "expectation": "Only that row and aggregate total recalculate."
    },
    {
      "id": "P-03",
      "area": "Invoice E2E",
      "title": "Edit times/break on an imported row",
      "status": "pending",
      "expectation": "Live OT breakdown and total update correctly."
    },
    {
      "id": "P-04",
      "area": "Invoice E2E",
      "title": "Add manual row using Client defaults",
      "status": "pending",
      "expectation": "£20 + OT enabled + 4 Client rules."
    },
    {
      "id": "P-05",
      "area": "Invoice E2E",
      "title": "Add Extra Fee",
      "status": "pending",
      "expectation": "Included once; no double counting."
    },
    {
      "id": "P-06",
      "area": "Invoice E2E",
      "title": "Save and reopen Edit",
      "status": "pending",
      "expectation": "Snapshots, rates, OT, rules and totals survive round-trip."
    },
    {
      "id": "P-07",
      "area": "Invoice E2E",
      "title": "Preview / PDF",
      "status": "pending",
      "expectation": "Values match form/live breakdown."
    },
    {
      "id": "P-08",
      "area": "Invoice E2E",
      "title": "Share / Export",
      "status": "pending",
      "expectation": "Hours, values and extras stay consistent."
    },
    {
      "id": "P-09",
      "area": "Duplicate Protection",
      "title": "Imported Shift disappears from same Invoice selector",
      "status": "pending",
      "expectation": "Per-Invoice duplicate protection."
    },
    {
      "id": "P-10",
      "area": "Duplicate Protection",
      "title": "Remove imported row -> Shift becomes selectable again",
      "status": "pending",
      "expectation": "No global consumed flag."
    },
    {
      "id": "P-11",
      "area": "Duplicate Protection",
      "title": "Same Shift remains available to a different Invoice",
      "status": "pending",
      "expectation": "Cross-Invoice reuse remains allowed."
    },
    {
      "id": "P-12",
      "area": "Duplicate Protection",
      "title": "Two identical-looking shifts with different IDs",
      "status": "pending",
      "expectation": "Both remain independently importable."
    },
    {
      "id": "P-13",
      "area": "Starter Row",
      "title": "Retest blank starter row after Client selection",
      "status": "pending",
      "expectation": "Starter receives rate/OT/rules."
    },
    {
      "id": "P-14",
      "area": "Client Guard",
      "title": "Try client switch with populated row",
      "status": "pending",
      "expectation": "Blocked/reverted without mutation."
    },
    {
      "id": "P-15",
      "area": "Duration UI",
      "title": "Visual smoke of hours/minutes formatting",
      "status": "pending",
      "expectation": "UI uses hours/minutes; internal math remains decimal."
    },
    {
      "id": "P-16",
      "area": "Quotes",
      "title": "Quote with client -> convert to Invoice",
      "status": "pending",
      "expectation": "Identity and snapshots preserved."
    },
    {
      "id": "P-17",
      "area": "Expenses",
      "title": "Expense linked to client/Invoice",
      "status": "pending",
      "expectation": "Correct identity + no double counting."
    },
    {
      "id": "P-18",
      "area": "Agenda",
      "title": "Legacy client-name edit preservation",
      "status": "pending",
      "expectation": "Read-only fallback stays safe; editing legacy data does not lose names."
    },
    {
      "id": "P-19",
      "area": "Calendar",
      "title": "Delete standalone Shift already imported into Invoice",
      "status": "pending",
      "expectation": "History entry disappears; Invoice snapshot remains."
    },
    {
      "id": "P-20",
      "area": "Cross-midnight",
      "title": "21:00–06:00 with OT and break",
      "status": "pending",
      "expectation": "Correct day/rule boundaries."
    },
    {
      "id": "P-21",
      "area": "Long break",
      "title": "Break longer than the entire 1x bucket",
      "status": "pending",
      "expectation": "Consumes 1x first, then next-lowest multiplier."
    }
  ],
  "knownDebt": [
    {
      "id": "DEBT-01",
      "title": "rules: [] live default drift",
      "status": "deferred",
      "detail": "Historical empty rules may still resolve against current State.defaultRules."
    },
    {
      "id": "DEBT-02",
      "title": "Regex/source-level tests",
      "status": "deferred",
      "detail": "Several regression tests inspect source strings rather than execute full DOM behavior."
    },
    {
      "id": "DEBT-03",
      "title": "Expense client-linking assumptions",
      "status": "follow-up",
      "detail": "Some Expense logic/comments predate Invoice client.profileId."
    },
    {
      "id": "DEBT-04",
      "title": "Agenda legacy edit preservation",
      "status": "follow-up",
      "detail": "Read-only name fallback is safe, but editing legacy events may drop clientName."
    },
    {
      "id": "DEBT-05",
      "title": "Quote double conversion",
      "status": "deferred",
      "detail": "UI guard exists; state-side idempotency remains a separate design item."
    },
    {
      "id": "DEBT-06",
      "title": "Service Invoice hourly-rate policy",
      "status": "product decision",
      "detail": "Client hourly rate currently remains employee-shift scoped."
    }
  ]
};
