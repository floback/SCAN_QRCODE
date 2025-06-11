// components/ScanTable.tsx
"use client";

import { Search } from "lucide-react";

interface ScanEntry {
  id: number;
  ip: string;
  country: string;
  city: string;
  region: string;
  name?: string;
  link_add: string;
  create_date: string;
}

interface ScanTableProps {
  data: ScanEntry[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function ScanTable({ data, searchTerm, setSearchTerm }: ScanTableProps) {
  return (
    <div className="overflow-auto bg-white rounded-xl shadow p-2 mt-1">
      <h2 className="text-lg font-bold mb-2 text-gray-800">QR CODE SCANNED</h2>
      <div className="flex items-center gap-2 mb-2">
        <Search className="text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-none outline-none bg-transparent text-gray-700 text-sm placeholder:text-sm py-1"
        />
      </div>
      <div className="h-[96] overflow-auto flex-grow">
        <table className="min-w-full text-center text-gray-600 text-sm">
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
              <tr key={entry.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-cyan-100 transition-colors duration-200">
                <td className="px-2 py-1">{entry.ip}</td>
                <td className="px-2 py-1">{entry.country}</td>
                <td className="px-2 py-1">{entry.city}</td>
                <td className="px-2 py-1">{entry.region}</td>
                <td className="px-2 py-1">{entry.name || "-"}</td>
                <td className="px-2 py-1 text-blue-600 underline text-xs max-w-xs truncate">
                  <a href={entry.link_add} target="_blank" rel="noopener noreferrer">
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
