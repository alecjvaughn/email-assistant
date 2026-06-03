import { StorageAdapter } from './storage';
import { AppConfig } from '../models/config';

export class ConfigurationService {
  constructor(private storage: StorageAdapter) {}

  getConfig(): AppConfig {
    const raw = this.storage.read();
    if (!raw) {
      throw new Error('Configuration not found');
    }
    return JSON.parse(raw);
  }

  setConfig(config: AppConfig): void {
    this.storage.write(JSON.stringify(config, null, 2));
  }
}
