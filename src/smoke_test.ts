import { GooglePropertiesStorage } from './services/googlePropertiesStorage';
import { ConfigurationService } from './services/configuration';
import { GmailService } from './services/gmailService';
import { LabelManager } from './services/labelManager';

/**
 * Interface for the Google Apps Script global scope.
 */
interface GasGlobal {
  smokeTest: typeof smokeTest;
  manualSyncTest: typeof manualSyncTest;
  GooglePropertiesStorage: typeof GooglePropertiesStorage;
  ConfigurationService: typeof ConfigurationService;
  GmailService: typeof GmailService;
  LabelManager: typeof LabelManager;
}

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
 * Manual verification function for Phase 2 labeling logic.
 */
export function manualSyncTest(): void {
  const storage = new GooglePropertiesStorage();
  const configService = new ConfigurationService(storage);
  const gmailService = new GmailService();
  const manager = new LabelManager(gmailService, configService);

  console.log('Running Manual Sync Test...');

  // 1. Manually set a test config in Properties
  configService.setConfig({
    version: '1.0',
    labels: {
      'TestCategory': { nested: true, description: 'Test' },
      'TestCategory/SubTest': { nested: false }
    },
    rules: [],
    digest: { enabled: false, frequency: 'daily', time: '09:00' }
  });

  // 2. Run sync
  manager.syncLabels();
  console.log("Sync complete. Please check your Gmail for 'TestCategory' and 'TestCategory/SubTest' labels.");
}

/**
 * Expose functions and classes to the global scope for Google Apps Script.
 */
declare var global: GasGlobal;

global.smokeTest = smokeTest;
global.manualSyncTest = manualSyncTest;
global.GooglePropertiesStorage = GooglePropertiesStorage;
global.ConfigurationService = ConfigurationService;
global.GmailService = GmailService;
global.LabelManager = LabelManager;
