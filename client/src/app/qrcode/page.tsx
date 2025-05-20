'use client';

import { useEffect, useState } from 'react';
import InfoCard from "@/components/Card";
import { QrCode, ScanLine, Trophy, MapPin } from "lucide-react";
import Button from "@/components/Button"
interface QrCodeData {
  id: string;
  ip_address: string;
  country: string;
  city: string;
  region: string;
  name: string;
  link_add: string;
  created_at: string;
}

export default function QrcodePage() {
  const [data, setData] = useState<QrCodeData[]>([]);
  const [totalCodes, setTotalCodes] = useState(0);
  const [totalScans, setTotalScans] = useState(0);
  const [mostScannedCode, setMostScannedCode] = useState('');
  const [topRegion, setTopRegion] = useState('');

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qrcode`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await res.json();
        setData(result);
        setTotalCodes(result.length);
        setTotalScans(result.length);

        // Calcula código mais escaneado e região com mais acessos, se necessário.
        setMostScannedCode('');
        setTopRegion('');
      } catch (error) {
        console.error('Erro ao carregar QR Codes:', error);
      }
    };

    fetchQRCodes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-50 p-8 text-sm font-sans">
      <h1 className="text-xl font-bold mb-4 text-gray-700">GENERATE QR CODE</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <input type="text" placeholder="Enter a number or a link" className="w-full mb-2 px-4 py-2 border rounded" />
          <input type="text" placeholder="Enter code name" className="w-full mb-2 px-4 py-2 border rounded" />
         <Button typeStyle="secondary" size="small" fullWidth={false}>
            Gerar QR Code
        </Button>

        </div>
        <div>
          <input type="text" placeholder="🔍 Search" className="w-full px-4 py-2 border rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <InfoCard title="Total QR Code" value={totalCodes} icon={QrCode} />
        <InfoCard title="Total Scan" value={totalScans} icon={ScanLine} />
        <InfoCard title="Code Plus Scanning" value={mostScannedCode || "-"} icon={Trophy} />
        <InfoCard title="Scanning Region" value={topRegion || "-"} icon={MapPin} />
      </div>

      <h2 className="text-lg font-bold mb-2 text-gray-800">QR CODE SCANNED</h2>
      <div className="overflow-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-left text-gray-700">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="px-2 py-2">IP</th>
              <th className="px-2 py-2">COUNTRY</th>
              <th className="px-2 py-2">CITY</th>
              <th className="px-2 py-2">REGION</th>
              <th className="px-2 py-2">CODE NAME</th>
              <th className="px-2 py-2">LINK ADD</th>
              <th className="px-2 py-2">DATE AND TIME</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-200">
                <td className="px-2 py-1">{entry.ip_address}</td>
                <td className="px-2 py-1">{entry.country}</td>
                <td className="px-2 py-1">{entry.city}</td>
                <td className="px-2 py-1">{entry.region}</td>
                <td className="px-2 py-1">{entry.name}</td>
                <td className="px-2 py-1 text-blue-600 underline">
                  <a href={entry.link_add} target="_blank" rel="noopener noreferrer">
                    {entry.link_add}
                  </a>
                </td>
                <td className="px-2 py-1">{new Date(entry.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
