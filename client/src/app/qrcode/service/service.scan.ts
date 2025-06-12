"use client";

import { ScanQrCode } from "@/app/qrcode/types/types";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

// Buscar todos os QR Codes scaneados
export const fetchScanData = async (): Promise<ScanQrCode[] | null> => {
  return await fetchWithAuth<ScanQrCode[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/scan/join/`
  );
}