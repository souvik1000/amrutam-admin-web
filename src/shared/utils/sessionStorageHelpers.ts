export class SessionStorage {
  static setItem(key: string, value: unknown) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T = unknown>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    if (data && data !== "undefined") {
      try {
        return JSON.parse(data) as T;
      } catch {
        return (data as unknown as T) ?? null;
      }
    }
    return null;
  }

  static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  static clear() {
    sessionStorage.clear();
  }

  static appendToArray<T = unknown>(key: string, items: T | T[]) {
    const current = (this.getItem<T[]>(key) ?? []) as T[];
    const incoming = Array.isArray(items) ? items : [items];
    const updated = [...current, ...incoming];
    this.setItem(key, updated);
    return updated;
  }

  static updateArray<T = unknown>(
    key: string,
    updater: (current: T[]) => T[]
  ) {
    const current = (this.getItem<T[]>(key) ?? []) as T[];
    const updated = updater(current);
    this.setItem(key, updated);
    return updated;
  }
}
