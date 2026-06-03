import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GooglePropertiesStorage } from './googlePropertiesStorage';

describe('GooglePropertiesStorage', () => {
  let mockProperties: any;

  beforeEach(() => {
    mockProperties = {
      getProperty: vi.fn(),
      setProperty: vi.fn(),
    };
    
    // @ts-ignore
    global.PropertiesService = {
      getUserProperties: () => mockProperties
    };
  });

  it('should call getProperty on read', () => {
    const storage = new GooglePropertiesStorage('TEST_KEY');
    mockProperties.getProperty.mockReturnValue('{"test": true}');
    
    const result = storage.read();
    
    expect(mockProperties.getProperty).toHaveBeenCalledWith('TEST_KEY');
    expect(result).toBe('{"test": true}');
  });

  it('should call setProperty on write', () => {
    const storage = new GooglePropertiesStorage('TEST_KEY');
    storage.write('{"test": true}');
    
    expect(mockProperties.setProperty).toHaveBeenCalledWith('TEST_KEY', '{"test": true}');
  });
});
