export const LocalStorage = {
  get<T>(itemKey: string): T | undefined {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(itemKey);
      if (item && item !== 'undefined') {        
        return JSON.parse(item) as unknown as T;
      }
      return undefined;
    }
  },

  set<T>(itemKey: string, value: T) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(itemKey, JSON.stringify(value));
    }
  },

  delete(itemKey: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(itemKey);
    }
  },
};
