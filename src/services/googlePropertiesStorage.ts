import { StorageAdapter } from './storage';

/**
 * Google Apps Script PropertiesService implementation of the StorageAdapter.
 *
 * @param {string} key - The key used to store the configuration in user properties. Defaults to 'APP_CONFIG'.
 * @method read - Retrieves the string value associated with the key from user properties.
 * @method write - Persists the string data to user properties using the specified key.
 */
export class GooglePropertiesStorage implements StorageAdapter {
  constructor(private key: string = 'APP_CONFIG') {}

  read(): string | null {
    return PropertiesService.getUserProperties().getProperty(this.key);
  }

  write(data: string): void {
    PropertiesService.getUserProperties().setProperty(this.key, data);
  }
}
