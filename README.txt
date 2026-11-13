CHRISTMAS SECRET SANTA EVENT — SETUP

FILES
- index.html: the public signup website
- Code.gs: Google Apps Script that writes signups into a Google Sheet

SETUP
1. Create a new Google Sheet. Name it something like "Secret Santa Signups".
2. In the Sheet, choose Extensions > Apps Script.
3. Replace the editor contents with Code.gs and save.
4. In Apps Script, choose Deploy > New deployment.
5. Select Web app.
   - Execute as: Me
   - Who has access: Anyone
6. Click Deploy and complete Google's authorization prompts.
7. Copy the Web app URL ending in /exec.
8. Open index.html in a text editor. Find:
   const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   Replace the placeholder with your Web app URL, keeping the quotation marks.
9. Save index.html and upload it to a static web host (for example, GitHub Pages or Netlify).

DATA
The Google Sheet will contain Timestamp, Name, and Email columns.
To get an Excel file later, open the Google Sheet and choose File > Download > Microsoft Excel (.xlsx).

IMPORTANT
- The signup page uses a browser no-cors request. The success message means the request was sent, not that the browser independently verified the row was saved. Check the Sheet after a test submission.
- Anyone with the public website can submit entries. Add spam protection or a verification step before sharing widely.
- The Sheet is private by default unless you change its sharing settings. Do not publish the spreadsheet publicly.
- The public Apps Script endpoint is not an authentication system. Do not store sensitive information in it.
