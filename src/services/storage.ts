/**
 * Interface for reading and writing string-based data.
 *
 * @method read - Reads data from the storage medium. Returns string or null if not found.
 * @method write - Writes the provided string data to the storage medium.
 */
export interface StorageAdapter {
  read(): string | null;
  write(data: string): void;
}
