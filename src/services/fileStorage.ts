import type { StorageAdapter } from './storage';
import * as fs from 'fs';

/**
 * Local file-system implementation of the StorageAdapter.
 *
 * @param {string} filePath - Path to the configuration file on the local filesystem.
 * @method read - Reads the file content as UTF-8 string. Returns null if the file does not exist.
 * @method write - Synchronously writes string data to the specified file path using UTF-8 encoding.
 */
export class FileStorage implements StorageAdapter {
  constructor(private filePath: string) {}

  read(): string | null {
    if (!fs.existsSync(this.filePath)) return null;
    return fs.readFileSync(this.filePath, 'utf-8');
  }

  write(data: string): void {
    fs.writeFileSync(this.filePath, data, 'utf-8');
  }
}
