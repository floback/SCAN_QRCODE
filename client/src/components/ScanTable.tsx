"use client";

import { Search } from "lucide-react";
import { ScanQrCode } from "@/app/qrcode/types/types"
interface ScanTableProps {
  data: ScanQrCode[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function ScanTable({ data, searchTerm, setSearchTerm }: ScanTableProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full flex flex-col">
      <h1 className="text-lg font-bold mb-2 text-gray-800">QR CODE SCANNED</h1>
      
      <div className="bg-white rounded-md shadow p-2 w-full max-w-sm mb-2 mr-auto">
        <div className="flex items-center gap-2">
          <Search className="text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none outline-none bg-transparent text-gray-700 text-sm placeholder:text-sm px-1 py-1 text-center-1"
          />
        </div>
      </div>

      <div className="h-[150] overflow-auto flex-grow">
        <table className="min-w-full text-sm text-center text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0">
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
              <tr
                key={entry.id}
                className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-cyan-100 transition-colors duration-200"
              >
                <td className="px-2 py-2 text-center-1 text-xs">{entry.ip}</td>
                <td className="px-2 py-2 text-center-1 text-xs">{entry.country}</td>
                <td className="px-2 py-2 text-center-1 text-xs">{entry.city}</td>
                <td className="px-2 py-2 text-center-1 text-xs">{entry.region}</td>
                <td className="px-2 py-2 text-center-1 text-xs">{entry.name}</td>
                <td className="px-2 py-2 text-center-1 text-blue-600 underline text-xs max-w-xs truncate">
                  <a
                    href={entry.link_add}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.link_add}
                  </a>
                </td>
                <td className="px-2 py-2 text-center-1 text-xs">
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
