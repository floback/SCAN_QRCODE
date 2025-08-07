"use client";

import { useState } from "react";
import { useScanData } from "../scan/hook/useScan";
import { useQrcodeData } from "./hook/useQrcode";
import { QrCode } from "@/app/qrcode/types/types";
import {
  MapPin,
  QrCodeIcon,
  ScanLine,
  Trophy,
} from "lucide-react";

import ScanTable from "@/app/scan/components/ScanTable";
import QrcodeForm from "@/app/qrcode/components/QrcodeForm";
import QrcodeTable from "@/app/qrcode/components/QrcodeTable";
import InfoCard from "@/components/Card";
import ModalQrcode from "@/app/qrcode/components/modal/ModalQrcode";
import SiderBarMenu from "@/components/SiderBarMenu"; // Certifique-se que o caminho está correto

export default function QrcodePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<QrCode | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [linkAdd, setLinkAdd] = useState("");
  const [name, setName] = useState("");
  const [numberFone, setNumberFone] = useState("");
  const [generatedQrcode, setGeneratedQrcode] = useState<QrCode | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ novo estado

  const {
    dataQrcode,
    searchQrcode,
    setSearchQrcode,
    createQrcode,
    deleteQrcode,
    loading,
    error,
    fetchData,
    totalCodes,
  } = useQrcodeData();

  const {
    data,
    searchTerm,
    setSearchTerm,
    totalScans,
    mostScannedCodeName,
    topCity,
    fetchData: fetchScanData,
  } = useScanData();

  return (
    <div className="flex bg-cyan-100 min-h-screen">
      {/* Sidebar fixo */}
      <SiderBarMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Conteúdo principal ajustável */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-2" : "ml-16"
        } min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-50 p-6 text-sm font-sans`}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Formulário */}
          <QrcodeForm
            name={name}
            setName={setName}
            linkAdd={linkAdd}
            setLinkAdd={setLinkAdd}
            numberFone={numberFone}
            setNumberFone={setNumberFone}
            createQrcode={createQrcode}
            generatedQrcode={setGeneratedQrcode}
            setModalVisible={setModalVisible}
          />

          {/* Tabela */}
          <QrcodeTable
            dataQrcode={dataQrcode}
            searchQrcode={searchQrcode}
            setSearchQrcode={setSearchQrcode}
            setShowEditModal={setShowEditModal}
            setEditData={setEditData}
            setLoadingModal={setLoadingModal}
            deleteQrcode={deleteQrcode}
          />
        </div>

        <ModalQrcode
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          loading={loadingModal}
          data={editData}
          setLoadingModal={setLoadingModal}
          fetchData={fetchData}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <InfoCard
            title="TOTAL QR CODE"
            value={totalCodes}
            icon={QrCodeIcon}
            bgColor="bg-blue-600"
          />
          <InfoCard
            title="TOTAL SCAN"
            value={totalScans}
            icon={ScanLine}
            bgColor="bg-green-600"
          />
          <InfoCard
            title="CODE PLUS SCANNING"
            value={mostScannedCodeName || "-"}
            icon={Trophy}
            bgColor="bg-yellow-500"
          />
          <InfoCard
            title="SCANNING CITY"
            value={topCity || "-"}
            icon={MapPin}
            bgColor="bg-green-700"
          />
        </div>

        <ScanTable
          data={data}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </main>
    </div>
  );
}
