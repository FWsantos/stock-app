import Product from "../types/Product";

class RestApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = "https://interview.t-alpha.com.br";
  }

  private getHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
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

  async getAllProducts() {
    return await fetch(`${this.baseURL}/api/products/get-all-products`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async createProduct(product: Product) {
    return await fetch(`${this.baseURL}/api/products/create-product`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        description: product.description,
        name: product.name,
        price: product.price,
        stock: product.stock,
      }),
    });
  }
}

export default RestApiService;
