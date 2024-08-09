class RestApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = "https://interview.t-alpha.com.br";
  }

  async loginUser(taxNumber: string, password: string) {
    return await fetch(`${this.baseURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taxNumber,
        password,
      }),
    });
  }
}
