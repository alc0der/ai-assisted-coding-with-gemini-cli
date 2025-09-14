# Quick Setup - Survey with Google Apps Script

## 1. Create your Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create new project
3. Replace default code with:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Add headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Survey Data']);
    }
    
    // Add data
    sheet.appendRow([new Date(), JSON.stringify(data)]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Deploy → New Deployment → Web App
5. Execute as: "Me", Access: "Anyone"
6. Copy the Web App URL

## 2. Configure the Survey App

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your URL
echo "VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_URL_HERE" >> .env

# Restart the dev server
npm run dev
```

## 3. Test It

1. Open the survey page
2. Check the debug panel (bottom-right)
3. Submit a test response
4. Check your Google Sheet

## Troubleshooting

- **"URL not configured"**: Check your `.env` file
- **No data in Sheet**: Check Apps Script logs
- **Network error**: Verify URL and internet connection

## Debug Tools

- **Survey Page**: Built-in debug panel shows all details
- **Test Page**: `/test-submission.html` for manual testing
- **Apps Script**: View → Executions for server logs

## Need More Help?

See [SURVEY_SETUP.md](./SURVEY_SETUP.md) for detailed documentation.