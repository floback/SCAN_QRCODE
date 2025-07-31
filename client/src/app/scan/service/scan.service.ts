"use client";

import { ScanQrCode } from "@/app/qrcode/types/types";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

// Buscar todos os QR Codes scaneados
export const fetchScanData = async (): Promise<ScanQrCode[] | null> => {
  return await fetchWithAuth<ScanQrCode[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/scan/join/`
  );
}


// Enviar novo scan para o backend
export const postScan = async (dto: any): Promise<any> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar dados de scan");
  }

  return await response.json();
};
