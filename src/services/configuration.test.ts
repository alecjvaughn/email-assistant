import { describe, it, expect } from 'vitest';
import { ConfigurationService } from './configuration';
import { FileStorage } from './fileStorage';
import * as path from 'path';

describe('ConfigurationService', () => {
  const samplePath = path.resolve(__dirname, '../config.sample.json');
  const storage = new FileStorage(samplePath);
  const service = new ConfigurationService(storage);

  it('should correctly load and parse the real config.sample.json', () => {
    const config = service.getConfig();
    expect(config.version).toBe('1.0');
    expect(config.labels).toHaveProperty('talent');
    expect(config.labels['talent']?.nested).toBe(true);
    expect(config.rules[0]?.target_label).toBe('talent/Company Name');
  });

  it('should save and retrieve changes correctly', () => {
    // Create a temp file for this test to avoid modifying the sample
    const tempPath = path.resolve(__dirname, './test-config.json');
    const tempStorage = new FileStorage(tempPath);
    const tempService = new ConfigurationService(tempStorage);
    
    const newConfig = {
      version: '2.0',
      labels: {},
      rules: [],
      digest: { enabled: false, frequency: 'daily' as const, time: '12:00' }
    };
    
    tempService.setConfig(newConfig);
    const retrieved = tempService.getConfig();
    expect(retrieved.version).toBe('2.0');
    
    // Cleanup
    import('fs').then(fs => {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    });
  });
});
