"use client";

import { ScanQrCode } from "@/app/qrcode/types/types";

export async function fetchScanData(): Promise<ScanQrCode[] | null> {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token não encontrado");
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scan/find/join`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar dados:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
}
