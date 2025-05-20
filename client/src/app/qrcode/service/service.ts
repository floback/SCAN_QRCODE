// app/qrcode/service.ts
import { QrCode } from "../types/types";

export const fetchQRCodes = async (): Promise<QrCode[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qrcode`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar QR Codes");
  }

  return res.json();
};
