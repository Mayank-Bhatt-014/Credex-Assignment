# Tests

## Audit Engine Tests

File: `tests/auditEngine.test.js`
Run: `cd tests && npx jest auditEngine.test.js`

### Test 1
**Name:** flags GitHub Copilot as remove when 
Cursor is active for coding use case
**Covers:** Coding tool overlap detection (Rule 3)
**Result:** PASS

### Test 2
**Name:** recommends downgrade when seats <= 2 
on Business plan
**Covers:** Plan size check (Rule 1)
**Result:** PASS

### Test 3
**Name:** flags overpaying when spend exceeds 
official price
**Covers:** Overpaying detection (Rule 2)
**Result:** PASS

### Test 4
**Name:** returns optimal when spend matches 
official price
**Covers:** Optimal fallback (Rule 5)
**Result:** PASS

### Test 5
**Name:** skips inactive tools completely
**Covers:** Zero spend on paid plan skipped
**Result:** PASS

All 5 tests passing as of 2026-05-10.