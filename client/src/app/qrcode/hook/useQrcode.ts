"use client";

import { useEffect, useState } from "react";
import { QrCode } from "../types/types";
import {
  getAllQrcodes,
  createQrcode as createQrcodeApi,
  deleteQrcode as deleteQrcodeApi,
} from "../service/service.qrcode";

export function useQrcodeData() {
  const [dataQrcode, setData] = useState<QrCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllQrcodes();
      if (data) setData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createQrcode = async (newQrcode: Partial<QrCode>) => {
    try {
      const created = await createQrcodeApi(newQrcode);
      if (created) setData((prev) => [...prev, created]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteQrcode = async (id: number) => {
    try {
      const success = await deleteQrcodeApi(id);
      if (success) setData((prev) => prev.filter((qrcode) => qrcode.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataQrcode, loading, error, fetchData, createQrcode, deleteQrcode };
}
