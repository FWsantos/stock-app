class RestApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = "https://interview.t-alpha.com.br";
  }

  async login(taxNumber: string, password: string) {
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

  async registerUser(
    name: string,
    taxNumber: string,
    mail: string,
    phone: string,
    password: string
  ) {
    return await fetch(`${this.baseURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        taxNumber,
        mail,
        phone,
        password,
      }),
    });
  }
}

export default RestApiService;
