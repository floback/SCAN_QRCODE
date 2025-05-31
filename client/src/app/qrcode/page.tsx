"use client";

import {
  QrCode as QrCodeIcon,
  ScanLine,
  Trophy,
  MapPin,
  Search,
} from "lucide-react";
import InfoCard from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useScanData } from "./hook/useScan";
import { useQrcodeData } from "./hook/useQrcode";
import ModalQrcode from "@/components/ModalQrcode";
import { useState } from "react";
import { QrCode } from "@/app/qrcode/types/types";

export default function QrcodePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<QrCode | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [linkAdd, setLinkAdd] = useState("");
  const [name, setName] = useState("");
  const [numberFone, setNumberFone, ] = useState("");

  const { dataQrcode, createQrcode, deleteQrcode, loading, error, fetchData } =
    useQrcodeData();

  const {
    data,
    searchTerm,
    setSearchTerm,
    totalCodes,
    totalScans,
    mostScannedCode,
    topCity,
  } = useScanData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-50 p-6 text-sm font-sans">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Formulário de geração */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 w-full md:w-1/2">
          <h1 className="text-xl font-bold mb-4 text-gray-700">
            GENERATE QR CODE
          </h1>
          <Input
            label="Enter Link"
            placeholder="Ex: 5521... https://wa.me/..."
            size="sm"
            className="w-full"
            value={linkAdd}
            onChange={(e) => setLinkAdd(e.target.value)}
          />

          <Input
            label="Enter Name"
            placeholder="Ex: Comercial Lote XV, Campanha Nova ISP"
            size="sm"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Enter Phone Number"
            placeholder="Ex: 5521..."
            size="sm"
            className="w-full"
            value={numberFone}
            onChange={(e) => setNumberFone(e.target.value)}
          />
          <Button
            typeStyle="secondary"
            size="small"
            onClick={() => {
              if (!linkAdd || !name) {
                alert("Preencha todos os campos obrigatórios.");
                return;
              }
              createQrcode({
                link_add: linkAdd,
                name,
                number_fone: numberFone,
              });

              // limpa os campos depois de criar
              setLinkAdd("");
              setName("");
              setNumberFone("");
            }}
          >
            Generate
          </Button>
        </div>

        {/* Tabela de QRCodes */}
        {/* Adicionadas as classes h-96 e overflow-auto para altura fixa e rolagem */}
        <div className="bg-white rounded-xl shadow p-4 w-full md:w-1/2 flex flex-col">
          <h1 className="text-lg font-bold mb-2 text-gray-800">
            QR CODE GENERATED
          </h1>
          <div className="bg-white rounded-md shadow p-2 w-full max-w-sm mb-2 mr-auto">
            <div className="flex items-center gap-2">
              <Search className="text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-none outline-none bg-transparent text-gray-700 text-sm placeholder:text-sm py-1"
              />
            </div>
          </div>
          {/* Adicionada a classe overflow-auto para a tabela ter rolagem */}
          <div className="h-[10] overflow-auto flex-grow"> 
            <table className="min-w-full text-sm text-center text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0">
                <tr>
                  <th className="px-2 py-2">NAME</th>
                  <th className="px-2 py-2">IMG</th>
                  <th className="px-2 py-2">LINK</th>
                  <th className="px-2 py-2">NUMBER FONE</th>
                  <th className="px-2 py-2">STATUS</th>
                  <th className="px-2 py-2">CREATE DATE</th>
                  <th className="px-2 py-2"></th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {dataQrcode.map((qrcode) => (
                  <tr key={qrcode.id} className="border-b border-gray-200">
                    <td className="px-2 py-1 text-xs">{qrcode.name || "-"}</td>
                   <td className="px-2 py-1"><img src={qrcode.img} alt="QR Code" className="h-12 w-12 object-contain" /></td>
                    {/* Diminuída a fonte para `text-xs` na coluna LINK */}
                    <td className="px-2 py-1 text-blue-600 underline text-xs max-w-xs truncate">
                      <a href={qrcode.link_add} target="_blank" rel="noopener noreferrer">{qrcode.link_add}</a></td>
                    <td className="px-2 py-1">{qrcode.number_fone || "-"}</td>
                    <td className="px-2 py-1 text-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mx-auto ${
                          qrcode.status ? "bg-green-500" : "bg-gray-400"
                        }`}
                        title={qrcode.status ? "Ativo" : "Inativo"}
                      ></span>
                    </td>
                    <td className="px-2 py-1">
                      {qrcode.create_date
                        ? new Date(qrcode.create_date).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-2 py-1 flex gap-2">
                      <button
                        className="text-xs bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLoadingModal(true);
                          setShowEditModal(true);
                          setTimeout(() => {
                            setEditData(qrcode);
                            setLoadingModal(false);
                          }, 500);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          const confirmed = confirm(
                            `Tem certeza que deseja deletar o QR Code "${qrcode.name}"?`
                          );
                          if (confirmed) {
                            deleteQrcode(qrcode.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      <ModalQrcode
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        loading={loadingModal}
        data={editData}
        setLoadingModal={setLoadingModal}
        fetchData={fetchData}
      />

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <InfoCard title="TOTAL QR CODE" value={totalCodes} icon={QrCodeIcon} />
        <InfoCard title="TOTAL SCAN" value={totalScans} icon={ScanLine} />
        <InfoCard
          title="CODE PLUS SCANNING"
          value={mostScannedCode || "-"}
          icon={Trophy}
        />
        <InfoCard title="SCANNING CITY" value={topCity || "-"} icon={MapPin} />
      </div>

      {/* Tabela de escaneamentos */}
      <div className="overflow-auto bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-2 text-gray-800">
          QR CODE SCANNED
        </h2>
        <div className="flex items-center gap-2">
          <Search className="text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none outline-none bg-transparent text-gray-700 text-sm placeholder:text-sm py-1"
          />
        </div>
        <table className=" min-w-full text-center text-gray-700 text-sm">
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
              <tr key={entry.id} className="border-b border-gray-200">
                <td className="px-2 py-1">{entry.ip}</td>
                <td className="px-2 py-1">{entry.country}</td>
                <td className="px-2 py-1">{entry.city}</td>
                <td className="px-2 py-1">{entry.region}</td>
                <td className="px-2 py-1">{entry.name || "-"}</td>
                {/* Diminuída a fonte para `text-xs` na coluna LINK ADD da tabela de scans */}
                <td className="px-2 py-1 text-blue-600 underline text-xs max-w-xs truncate">
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