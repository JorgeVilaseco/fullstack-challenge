class LocalStorageService {
  public getItem<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    if (!!item) {
      return JSON.parse(item);
    }
  }

  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public getJwtToken(): string | undefined {
    const user = this.getItem<{ access_token: string }>("user");
    if (!!user) {
      return user.access_token;
    }
  }
}

export default new LocalStorageService();