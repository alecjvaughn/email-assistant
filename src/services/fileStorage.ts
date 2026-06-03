import { StorageAdapter } from './storage';
import * as fs from 'fs';

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
