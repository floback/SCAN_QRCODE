"use client";

import { useEffect, useState, useMemo } from "react";
import { QrCode } from "../types/types";

export function useQrcodeData() {
  const [data, setData] = useState<QrCode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCodes, setTotalCodes] = useState(0);
  const [totalScans, setTotalScans] = useState(0);
  const [mostScannedCode, setMostScannedCode] = useState("");
  const [topRegion, setTopRegion] = useState("");
  const [topCity, setTopCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("Token não encontrado");
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scan/find/join`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Erro ao buscar dados:", response.statusText);
          return;
        }

        const rawData: QrCode[] = await response.json();

        // Agrupar por id_qrcode para contar códigos únicos
        const uniqueCodeIds = new Set(rawData.map((item) => item.id_qrcode));
        setTotalCodes(uniqueCodeIds.size);

        // Total de scans
        setTotalScans(rawData.length);

        // Código mais escaneado
        const codeCount = rawData.reduce((acc, item) => {
          acc[item.id_qrcode] = (acc[item.id_qrcode] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const mostScanned = Object.entries(codeCount).sort((a, b) => b[1] - a[1])[0]?.[0];
        setMostScannedCode(mostScanned || "Nenhum");

        // Região mais comum
        const regionCount = rawData.reduce((acc, item) => {
          acc[item.region] = (acc[item.region] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        
        const topRegionName = Object.entries(regionCount).sort((a, b) => b[1] - a[1])[0]?.[0];
        setTopRegion(topRegionName || "Desconhecida");
        
        // Contagem de cidade
        const cityCount = rawData.reduce((acc, item) => {
            acc[item.city] = (acc[item.city] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const topCityName = Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0]; 
        setTopCity(topCityName || "Descinhecida");


        setData(rawData);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  return {
    data: filteredData,
    searchTerm,
    setSearchTerm,
    totalCodes,
    totalScans,
    mostScannedCode,
    topRegion,
    topCity,
  };
}
