// src/lib/fetchWithAuth.ts
export async function fetchWithAuth<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token ausente. Redirecionando...");
      window.location.href = "/auth";
      return null;
    }

    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      console.warn("Token inválido ou expirado. Redirecionando...");
      localStorage.removeItem("token");
      window.location.href = "/auth";
      return null;
    }

    if (!response.ok) {
      console.error("Erro na requisição:", response.status, await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro inesperado:", error);
    window.location.href = "/auth";
    return null;
  }
}
