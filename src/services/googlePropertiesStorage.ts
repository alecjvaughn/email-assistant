import { StorageAdapter } from './storage';

export class GooglePropertiesStorage implements StorageAdapter {
  constructor(private key: string = 'APP_CONFIG') {}

  read(): string | null {
    return PropertiesService.getUserProperties().getProperty(this.key);
  }

  write(data: string): void {
    PropertiesService.getUserProperties().setProperty(this.key, data);
  }
}
