/**
 * Google Apps Script backend for Christmas Secret Santa Event.
 * 1. Create a Google Sheet.
 * 2. Open Extensions > Apps Script.
 * 3. Paste this entire file into Code.gs and save.
 * 4. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. Deploy, authorize, and copy the Web app URL into index.html.
 */
const SHEET_NAME = "Signups";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const name = String((e.parameter && e.parameter.name) || "").trim();
    const email = String((e.parameter && e.parameter.email) || "").trim();

    if (!name || !email || name.length > 100 || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ContentService.createTextOutput("Invalid name or email.");
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Name", "Email"]);
      sheet.setFrozenRows(1);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email"]);
      sheet.setFrozenRows(1);
    }

    // Store email as text to avoid spreadsheet formatting surprises.
    sheet.appendRow([new Date(), name, "'" + email]);
    return ContentService.createTextOutput("OK");
  } finally {
    lock.releaseLock();
  }
}
