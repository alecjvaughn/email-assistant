import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { GooglePropertiesStorage } from './googlePropertiesStorage';

interface MockUserProperties {
  getProperty: Mock;
  setProperty: Mock;
}

describe('GooglePropertiesStorage', () => {
  let mockProperties: MockUserProperties;

  beforeEach(() => {
    mockProperties = {
      getProperty: vi.fn(),
      setProperty: vi.fn(),
    };
    
    (global as any).PropertiesService = {
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
