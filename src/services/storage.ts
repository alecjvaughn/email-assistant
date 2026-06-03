export interface StorageAdapter {
  read(): string | null;
  write(data: string): void;
}
