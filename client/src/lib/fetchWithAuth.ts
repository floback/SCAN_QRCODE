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
      const errorText = await response.text();
      console.error("Erro na requisição:", response.status, errorText);
      return null;
    }

    if (response.status === 204) {
      // DELETE geralmente retorna 204 No Content
      return true as T;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro inesperado:", error);
    // Só redireciona se for um erro de autenticação — NÃO aqui!
    return null;
  }
}
