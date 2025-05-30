// src/app/qrcode/service/service.scan.ts
"use client";

import { ScanQrCode } from "@/app/qrcode/types/types";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function fetchScanData(): Promise<ScanQrCode[] | null> {
  return await fetchWithAuth<ScanQrCode[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/scan/find/join`
  );
}
