/**
 * Executes a smoke test to verify basic functionality in the Apps Script environment.
 * 
 * @return {string} 'SUCCESS' if the test passes, or an error message if it fails.
 */
export function smokeTest(): string {
  console.log('Starting Smoke Test...');
  
  try {
    // 1. Verify PropertyService
    const properties = PropertiesService.getUserProperties();
    const testValue = 'smoke_test_' + new Date().getTime();
    properties.setProperty('SMOKE_TEST', testValue);
    
    const retrieved = properties.getProperty('SMOKE_TEST');
    if (retrieved !== testValue) {
      console.error('PropertyService mismatch: ' + retrieved + ' !== ' + testValue);
      return 'FAILURE: PropertyService Mismatch';
    }
    console.log('PropertyService connection verified successfully.');

    // 2. Verify GmailApp
    const inboxCount = GmailApp.getInboxUnreadCount();
    console.log('GmailApp connection verified. Unread inbox count: ' + inboxCount);
    
    return 'SUCCESS';
  } catch (e) {
    const error = e as Error;
    console.error('Smoke test error: ' + error.message);
    return 'FAILURE: ' + error.message;
  }
}

/**
 * Expose functions to the global scope for Google Apps Script.
 */
declare const global: {
  smokeTest: typeof smokeTest;
};

global.smokeTest = smokeTest;
