export function smokeTest() {
  console.log('Starting Smoke Test...');
  
  try {
    const properties = PropertiesService.getUserProperties();
    const testValue = 'smoke_test_' + new Date().getTime();
    properties.setProperty('SMOKE_TEST', testValue);
    
    const retrieved = properties.getProperty('SMOKE_TEST');
    if (retrieved === testValue) {
      console.log('PropertyService connection verified successfully.');
      return 'SUCCESS';
    } else {
      console.error('PropertyService mismatch: ' + retrieved + ' !== ' + testValue);
      return 'FAILURE: Mismatch';
    }
  } catch (e: any) {
    console.error('PropertyService error: ' + e.message);
    return 'FAILURE: ' + e.message;
  }
}

// @ts-ignore
global.smokeTest = smokeTest;
