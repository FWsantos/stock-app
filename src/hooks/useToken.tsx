import { useEffect, useState } from "react";

export default function useToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  return { token, setToken: saveToken };
}
