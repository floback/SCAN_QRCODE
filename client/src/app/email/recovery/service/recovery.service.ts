import { RecoveryRequest, RecoveryResponse } from "../types/types";

export async function sendRecoveryEmail(payload: RecoveryRequest): Promise<RecoveryResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/recovery-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erro ao enviar e-mail.");
  }

  return data;
}
