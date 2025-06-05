"use client";

import { useEffect, useState, useMemo } from "react";
import { QrCode } from "../types/types";
import {
  getAllQrcodes,
  createQrcode as createQrcodeApi,
  deleteQrcode as deleteQrcodeApi,
  updateQrcode as updateQrcodeApi,
} from "../service/service.qrcode";

export function useQrcodeData() {
  const [dataQrcode, setData] = useState<QrCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQrcode, setSearchQrcode] = useState("");

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
      return created;
    } catch (err: any) {
      setError(err.message);
      
    }
    
  };

  const updateQrcode = async (id: string, updatedData: Partial<QrCode>) => {
    try {
      const updated = await updateQrcodeApi(id, updatedData);
      if (updated) {
        setData((prev) =>
          prev.map((qrcode) => (qrcode.id === String(id) ? updated : qrcode))
        );
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteQrcode = async (id: string) => {
    try {
      const successDelete = await deleteQrcodeApi(id);
      if (successDelete) setData((prev) => prev.filter((qrcode) => qrcode.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };


  const filterData = useMemo(() => {
    return dataQrcode.filter((entry) => 
      Object.values(entry).some((value) =>
       String(value).toLowerCase().includes(searchQrcode.toLowerCase())
      )
    );
  }, [dataQrcode, searchQrcode]);
  
  
  useEffect(() => {
    fetchData();
  }, []);

  return {
    dataQrcode: filterData,
    loading,
    error,
    fetchData,
    createQrcode,
    deleteQrcode,
    updateQrcode,
    searchQrcode,
    setSearchQrcode,
  };
}
