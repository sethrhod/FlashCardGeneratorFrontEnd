export abstract class AuthorizedHttpClient {
  private token: string | null = null;

  protected getToken(): string | null {
    return this.token;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  /** NSwag will call this before every fetch */
  public async transformOptions(options: RequestInit): Promise<RequestInit> {
    const token = this.getToken();
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return options;
  }
}