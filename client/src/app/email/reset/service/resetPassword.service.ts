import { ResetPasswordData } from "./resetPassword.types";

export async function resetPasswordRequest(data: ResetPasswordData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/email/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    return {
      success: res.ok,
      message: result.message || "Erro desconhecido",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro ao conectar com o servidor.",
    };
  }
}
