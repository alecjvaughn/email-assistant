import { describe, it, expect } from 'vitest';
import type { AppConfig } from './models/config';

describe('Config Schema Validation', () => {
  it('should validate a basic config object', () => {
    const config: AppConfig = {
      version: '1.0',
      labels: {
        'talent': { nested: true },
      },
      rules: [
        { 
          id: '1', 
          name: 'Test Rule', 
          type: 'sender_match',
          pattern: 'test@example.com', 
          target_label: 'test',
        },
      ],
      digest: {
        enabled: true,
        frequency: 'daily',
        time: '09:00',
      },
    };

    expect(config.version).toBe('1.0');
    expect(config.labels['talent']?.nested).toBe(true);
    expect(config.rules[0]?.type).toBe('sender_match');
  });
});
