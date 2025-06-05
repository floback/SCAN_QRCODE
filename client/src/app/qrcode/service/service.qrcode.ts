// src/app/qrcode/service/service.qrcode.ts
"use client";

import { QrCode } from "../types/types";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

// Criar novo QR Code
export const createQrcode = async (
  newQrcode: Partial<QrCode>
): Promise<QrCode | null> => {
  return await fetchWithAuth<QrCode>(
    `${process.env.NEXT_PUBLIC_API_URL}/qrcode`,
    {
      method: "POST",
      body: JSON.stringify(newQrcode),
    }
  );
};

// Buscar todos os QR Codes
export const getAllQrcodes = async (): Promise<QrCode[] | null> => {
  return await fetchWithAuth<QrCode[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/qrcode`
  );
};

// Atualizar QR Code
export const updateQrcode = async (
  id: string,
  updatedData: Partial<QrCode>
): Promise<QrCode | null> => {
  return await fetchWithAuth<QrCode>(
    `${process.env.NEXT_PUBLIC_API_URL}/qrcode/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedData),
    }
  );
};


// Deletar QR Code
export const deleteQrcode = async (
  id: string
): Promise<boolean> => {
  const result = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/qrcode/${id}`,
    {
      method: "DELETE",
      body: JSON.stringify(deleteQrcode),
    }
  );
  return result !== null;
};
