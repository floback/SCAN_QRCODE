"use client";
import { QrCode } from "../types/types";

// Buscar todos os QR Codes
export const getAllQrcodes = async (): Promise<QrCode[] | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token não encontrado");
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qrcode`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error("Erro ao buscar QR Codes:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
};

// Criar novo QR Code
export const createQrcode = async (newQrcode: Partial<QrCode>): Promise<QrCode | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token não encontrado");
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qrcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newQrcode),
    });

    if (!response.ok) {
      console.error("Erro ao criar QR Code:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
};

// Deletar QR Code
export const deleteQrcode = async (id: number): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token não encontrado");
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qrcode/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Erro ao deletar QR Code:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return false;
  }
};
