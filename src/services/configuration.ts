import { StorageAdapter } from './storage';
import { AppConfig } from '../models/config';

/**
 * Service for managing application configuration.
 *
 * @param {StorageAdapter} storage - The storage adapter used for data persistence.
 * @method getConfig - Loads, parses, and returns the AppConfig. Throws an error if configuration is not found.
 * @method setConfig - Stringifies and writes the provided AppConfig to the storage medium.
 */
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
