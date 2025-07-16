"use client";

import { useEffect, useState, useMemo } from "react";
import { ScanQrCode } from "@/app/qrcode/types/types";
import { fetchScanData } from "@/app/qrcode/service/scan.service";
import { io } from "socket.io-client";

export function useScanData() {
  const [data, setData] = useState<ScanQrCode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalScans, setTotalScans] = useState(0);
  const [mostScannedCode, setMostScannedCode] = useState<string>("");
  const [mostScannedCodeName, setMostScannedCodeName] = useState<string>("");
  const [topRegion, setTopRegion] = useState("");
  const [topCity, setTopCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const processScanData = (rawData: ScanQrCode[]) => {
    setData(rawData);
    setTotalScans(rawData.length);

    // QR Code mais escaneado
    const codeCountMap = rawData.reduce((acc, item) => {
      const id = item.qrcode?.id;
      if (!id) return acc;
      acc[id] = {
        count: (acc[id]?.count || 0) + 1,
        name: item.qrcode?.name || "Desconhecido",
      };
      return acc;
    }, {} as Record<string, { count: number; name: string }>);

    const sortedCodes = Object.entries(codeCountMap).sort((a, b) => b[1].count - a[1].count);
    if (sortedCodes.length > 0) {
      setMostScannedCode(sortedCodes[0][0]); // ID
      setMostScannedCodeName(sortedCodes[0][1].name); // Nome
    }

    // Região mais escaneada
    const regionCount = rawData.reduce((acc, item) => {
      acc[item.region] = (acc[item.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setTopRegion(Object.entries(regionCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Desconhecida");

    // Cidade mais escaneada
    const cityCount = rawData.reduce((acc, item) => {
      acc[item.city] = (acc[item.city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setTopCity(Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Desconhecida");
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const rawData = await fetchScanData();
      if (rawData && Array.isArray(rawData)) {
        processScanData(rawData);
      } else {
        throw new Error("Dados inválidos retornados da API");
      }
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
      setData((prevData) => {
        const updated = [newScan, ...prevData];
        processScanData(updated);
        return updated;
      });
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
    mostScannedCodeName,
    topRegion,
    topCity,
    error,
    loading,
    fetchData,
  };
}
