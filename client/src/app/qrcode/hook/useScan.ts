"use client";

import { useEffect, useState, useMemo } from "react";
import { ScanQrCode } from "@/app/qrcode/types/types";
import { fetchScanData } from "@/app/qrcode/service/service.scan";
import { io } from "socket.io-client";


// useScan.ts
export function useScanData() {
  const [data, setData] = useState<ScanQrCode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalScans, setTotalScans] = useState(0);
  const [mostScannedCode, setMostScannedCode] = useState("");
  const [topRegion, setTopRegion] = useState("");
  const [topCity, setTopCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const rawData: ScanQrCode[] = await fetchScanData();
      if (!rawData || !Array.isArray(rawData)) {
        throw new Error("Dados inválidos retornados da API");
      }

      setData(rawData);
      setTotalScans(rawData.length);

      const codeCount = rawData.reduce((acc, item) => {
        acc[item.id_qrcode] = (acc[item.id_qrcode] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      setMostScannedCode(Object.entries(codeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Nenhum");

      const regionCount = rawData.reduce((acc, item) => {
        acc[item.region] = (acc[item.region] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      setTopRegion(Object.entries(regionCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Desconhecida");

      const cityCount = rawData.reduce((acc, item) => {
        acc[item.city] = (acc[item.city] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      setTopCity(Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Desconhecida");

    } catch (err: any) {
      console.error("Erro na requisição:", err);
      setError(err.message || "Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchData();

  const socket = io(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("🔌 Conectado ao WebSocket");
  });

  socket.on("new-scan", (newScan: ScanQrCode) => {
    console.log("📥 Novo scan recebido:", newScan);
    setData((prev) => [newScan, ...prev]);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Desconectado do WebSocket");
  });

  return () => {
    socket.disconnect();
  };
}, []);


  const filteredData = useMemo(() => {
    return data.filter((entry) =>
      [entry.city, entry.region, entry.ip, entry.qrcode?.name]
        .some((value) =>
          String(value || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [data, searchTerm]);

  return {
    data: filteredData,
    searchTerm,
    setSearchTerm,
    totalScans,
    mostScannedCode,
    topRegion,
    topCity,
    error,
    loading,
    fetchData,
  };
}

