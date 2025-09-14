/**
 * Google Apps Script for Survey Data Collection
 * Deploy this as a Web App to receive survey submissions
 *
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Update SHEET_NAME if needed
 * 5. Deploy > New Deployment > Web App
 * 6. Set "Execute as" to your account and "Who has access" to "Anyone"
 * 7. Copy the Web App URL and paste it in index.html as GOOGLE_SHEETS_URL
 */

const SHEET_NAME = 'Survey Responses';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) ||
                  SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    const data = JSON.parse(e.postData.contents);

    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Chat Tools Used',
        'Other Chat Tool',
        'Chat Tools Ranking',
        'IDE Tools Used',
        'Other IDE Tool',
        'IDE Tools Ranking',
        'CLI Tools Used',
        'Other CLI Tool',
        'CLI Tools Ranking',
        'Specialized Tools Used',
        'Other Specialized Tool',
        'Specialized Tools Ranking',
        'Primary Category',
        'Overall Satisfaction',
        'Additional Feedback'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Prepare row data
    const row = [
      data.timestamp || new Date().toISOString(),
      arrayToString(data.chat_tools_used),
      data.other_chat_specify || '',
      arrayToString(data.chat_tools_ranking),
      arrayToString(data.ide_tools_used),
      data.other_ide_specify || '',
      arrayToString(data.ide_tools_ranking),
      arrayToString(data.cli_tools_used),
      data.other_cli_specify || '',
      arrayToString(data.cli_tools_ranking),
      arrayToString(data.specialized_tools_used),
      data.other_specialized_specify || '',
      arrayToString(data.specialized_tools_ranking),
      data.primary_category || '',
      data.overall_satisfaction || '',
      data.additional_feedback || ''
    ];

    // Append data to sheet
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Survey submission endpoint is active. Use POST method to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function arrayToString(arr) {
  if (!arr) return '';
  if (Array.isArray(arr)) {
    return arr.join(', ');
  }
  return String(arr);
}
