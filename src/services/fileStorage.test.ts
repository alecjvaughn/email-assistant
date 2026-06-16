import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FileStorage } from './fileStorage';
import * as fs from 'fs';
import * as path from 'path';

describe('FileStorage', () => {
  const testFilePath = path.resolve(__dirname, 'test-storage.txt');

  afterEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('should write and read data correctly', () => {
    const storage = new FileStorage(testFilePath);
    const testData = 'Hello World';
    storage.write(testData);
    expect(storage.read()).toBe(testData);
  });

  it('should return null if file does not exist', () => {
    const storage = new FileStorage('non-existent-file.txt');
    expect(storage.read()).toBeNull();
  });

  it('should overwrite existing data', () => {
    const storage = new FileStorage(testFilePath);
    storage.write('Initial Data');
    storage.write('New Data');
    expect(storage.read()).toBe('New Data');
  });
});
