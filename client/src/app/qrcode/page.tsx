"use client";

import { QrCode as QrCodeIcon, ScanLine, Trophy, MapPin, Search } from "lucide-react";
import InfoCard from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useQrcodeData } from "./service/service";

export default function QrcodePage() {
  const {
    data,
    searchTerm,
    setSearchTerm,
    totalCodes,
    totalScans,
    mostScannedCode,
    topRegion,
  } = useQrcodeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-50 p-6 text-sm font-sans">
  <h1 className="text-xl font-bold mb-4 text-gray-700">GENERATE QR CODE</h1>

  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 w-full md:w-1/2">
      <Input
        label="Enter a number or a link"
        placeholder="Ex: 5521... https://wa.me/..."
        size="sm"
        className="w-full"
      />
      <Input
        label="Enter code name"
        placeholder="Ex: Comercial Lote XV"
        size="sm"
        className="w-full"
      />
      <Button typeStyle="secondary" size="small">
        Generate
      </Button>
    </div>
  </div>

  {/* Cards de estatísticas */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
    <InfoCard title="TOTAL QR CODE" value={totalCodes} icon={QrCodeIcon} />
    <InfoCard title="TOTAL SCAN" value={totalScans} icon={ScanLine} />
    <InfoCard title="CODE PLUS SCANNING" value={mostScannedCode || "-"} icon={Trophy} />
    <InfoCard title="SCANNING REGION" value={topRegion || "-"} icon={MapPin} />
  </div>

  {/* Campo de busca abaixo dos cards */}
  <div className="bg-white rounded-xl shadow p-4 w-full mb-6">
    <div className="flex items-center gap-2">
      <Search className="text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border-none outline-none bg-transparent text-gray-700"
      />
    </div>
  </div>

  <h2 className="text-lg font-bold mb-2 text-gray-800">QR CODE SCANNED</h2>
  <div className="overflow-auto bg-white rounded-xl shadow p-4">
    <table className="min-w-full text-left text-gray-700 text-sm">
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
            <td className="px-2 py-1">{entry.ip}</td>
            <td className="px-2 py-1">{entry.country}</td>
            <td className="px-2 py-1">{entry.city}</td>
            <td className="px-2 py-1">{entry.region}</td>
            <td className="px-2 py-1">{entry.name || '-'}</td>
            <td className="px-2 py-1 text-blue-600 underline">
              <a
                href={entry.link_add}
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.link_add}
              </a>
            </td>
            <td className="px-2 py-1">
              {new Date(entry.create_date).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}
