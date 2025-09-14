# Survey Setup - Google Apps Script Integration

This guide explains how to configure the survey to submit responses directly to Google Apps Script.

## Configuration Steps

### 1. Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Replace the default code with the example below
4. Save the project with a meaningful name
5. Click **Deploy** → **New Deployment**
6. Choose type: **Web App**
7. Configure deployment settings:
   - **Description**: "Survey Data Collector" (or your preferred name)
   - **Execute as**: "Me" (your Google account)
   - **Who has access**: "Anyone" (required for anonymous submissions)
8. Click **Deploy**
9. **IMPORTANT**: Copy the Web App URL (it will look like `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### 2. Configure the Survey Application

The survey application uses environment variables for configuration. Follow these steps:

1. **Copy the example environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** and set your Google Apps Script URL:
   ```bash
   # .env
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

3. **Restart your development server** for the changes to take effect:
   ```bash
   npm run dev
   ```

**Important**: Environment variables prefixed with `VITE_` are exposed to the client-side code in Vite/Slidev projects.

### 3. Google Apps Script Code Example

```javascript
function doPost(e) {
  try {
    // Parse the survey data
    const data = JSON.parse(e.postData.contents);
    
    // Get your Google Sheet (create one first and get its ID from the URL)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // If sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Survey Data', 'IP Address'];
      sheet.appendRow(headers);
    }
    
    // Add timestamp and data
    const timestamp = new Date();
    const ipAddress = e.parameter.user_ip || 'Unknown';
    
    // Option 1: Store entire JSON in one cell
    const row = [timestamp, JSON.stringify(data), ipAddress];
    
    // Option 2: Extract specific fields (uncomment and modify as needed)
    // const row = [
    //   timestamp,
    //   data.name || '',
    //   data.email || '',
    //   data.question1 || '',
    //   data.question2 || '',
    //   ipAddress
    // ];
    
    // Append to sheet
    sheet.appendRow(row);
    
    // Log for debugging (check Executions in Apps Script editor)
    console.log('Data received:', data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing request:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Handle GET requests for testing
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Survey endpoint is working',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_GOOGLE_APPS_SCRIPT_URL` | Yes | Google Apps Script Web App URL | `https://script.google.com/macros/s/ABC123/exec` |
| `VITE_SURVEY_TOKEN` | No | Optional security token | `my-secret-token` |
| `VITE_DEBUG_MODE` | No | Enable debug mode | `true` or `false` |

## Testing Your Setup

### Method 1: Use the Debug-Enabled Survey Page

1. Ensure your `.env` file is configured with `VITE_GOOGLE_APPS_SCRIPT_URL`
2. Open your survey application
3. The debug panel will appear at the bottom showing:
   - Environment variable configuration status
   - URL validation results
   - Network request details
   - Success/error messages
4. Complete and submit the survey
5. Check the debug logs for detailed information
6. Use the "Copy" or "Download" buttons to save debug logs

If you see "VITE_GOOGLE_APPS_SCRIPT_URL not configured", check your `.env` file.

### Method 2: Use the Standalone Test Page

1. Open `/test-submission.html` in your browser
2. **Note**: The test page cannot access environment variables directly
3. Manually enter your Google Apps Script URL in the input field
4. Use the test buttons to:
   - Validate your URL format
   - Test network connectivity
   - Send test submissions
   - View detailed debug logs

**Tip**: Copy your URL from the `.env` file for consistency.

### Method 3: Test Your Apps Script Endpoint Directly

Test if your Apps Script is accessible:
```bash
curl -X GET "YOUR_GOOGLE_APPS_SCRIPT_URL"
```

You should see a JSON response like:
```json
{"status":"OK","message":"Survey endpoint is working","timestamp":"2024-01-01T12:00:00.000Z"}
```

## Important Notes

### CORS Limitations
- Google Apps Script doesn't support CORS preflight requests
- The survey uses `mode: 'no-cors'` which means:
  - The browser won't show response details
  - Status will always appear as 0
  - This is normal and doesn't indicate failure
  - Data is still sent successfully

### Security Considerations
- The Google Apps Script Web App URL is public
- Anyone with the URL can submit data
- Consider adding validation in your Apps Script:
  ```javascript
  // Example: Add a simple token check
  function doPost(e) {
    const token = e.parameter.token;
    if (token !== 'YOUR_SECRET_TOKEN') {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'Unauthorized'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    // ... rest of your code
  }
  ```

## Troubleshooting Guide

### Issue: "Google Apps Script URL not configured"
**Debug Info to Check:**
- Look for: `VITE_GOOGLE_APPS_SCRIPT_URL not configured in .env file`
- Look for: `Environment config: hasUrl: false` or `isPlaceholder: true`
- **Solutions**:
  1. Create a `.env` file by copying `.env.example`
  2. Set `VITE_GOOGLE_APPS_SCRIPT_URL=your_actual_url`
  3. Restart the development server
  4. Verify the `.env` file is in the project root directory

### Issue: Network Errors
**Debug Info to Check:**
- Look for: `Browser is offline` or `NETWORK ERROR during submission`
- **Solutions**:
  1. Check internet connection
  2. Verify the URL is accessible
  3. Try the test page to isolate the issue

### Issue: Data Not Appearing in Google Sheets
**Debug Info to Check:**
- Look for: `Request completed` with `duration` in milliseconds
- **Solutions**:
  1. Check Google Apps Script Executions log:
     - Open your Apps Script project
     - Go to **Executions** in the left sidebar
     - Look for errors or successful executions
  2. Verify your Sheet ID is correct
  3. Ensure the script has permission to access the sheet
  4. Check if the sheet exists and is accessible

### Issue: Invalid URL Format
**Debug Info to Check:**
- Look for: `ERROR: Invalid URL format`
- **Solution**: Ensure URL starts with `https://` and follows the pattern:
  `https://script.google.com/macros/s/SCRIPT_ID/exec`

### Issue: Survey Not Loading
**Debug Info to Check:**
- Look for: `Failed to fetch survey` or `Survey.json fetch response`
- **Solutions**:
  1. Verify `/assets/survey.json` exists
  2. Check if the file is valid JSON
  3. Ensure the server is running

## Debug Information Explained

When you see debug logs, here's what the key entries mean:

- **`[timestamp] Survey component mounted`**: Vue component initialized
- **`Loading configuration from environment variables`**: Reading from `.env` file
- **`Environment config`**: Shows if URL is configured properly
- **`URL validation passed`**: URL format is valid
- **`Preparing POST request`**: Request is being constructed
- **`Request completed`**: Network request finished (doesn't mean server processed it)
- **`duration: Xms`**: How long the request took
- **`responseType: opaque`**: Normal for no-cors mode
- **`responseStatus: 0`**: Normal for no-cors mode
- **`source: Environment variable`**: Confirms URL is from `.env` file

## Getting the Google Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
3. Copy the `SHEET_ID` portion (it's a long string of characters)
4. Use this ID in your Apps Script code

## Advanced Configuration

### Custom Field Mapping

If you want to map survey fields to specific columns:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  
  // Map survey fields to columns
  const row = [
    new Date(),                    // Column A: Timestamp
    data.participantName || '',    // Column B: Name
    data.email || '',              // Column C: Email
    data.rating || '',             // Column D: Rating
    data.feedback || '',           // Column E: Feedback
    // Add more fields as needed
  ];
  
  sheet.appendRow(row);
  // ... rest of the code
}
```

### Rate Limiting

To prevent spam submissions:

```javascript
const submissionCache = CacheService.getScriptCache();

function doPost(e) {
  // Simple rate limiting by IP
  const ip = e.parameter.user_ip || 'unknown';
  const cacheKey = 'submission_' + ip;
  
  if (submissionCache.get(cacheKey)) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Please wait before submitting again'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Set 60-second cooldown
  submissionCache.put(cacheKey, 'true', 60);
  
  // Process submission...
}
```

## Support

If you're still experiencing issues after following this guide:

1. Use the debug panel in the survey page
2. Copy the debug logs using the "Copy" button
3. Check the browser's Developer Console (F12) for additional errors
4. Review the Google Apps Script execution logs
5. Test with the standalone test page (`/test-submission.html`)