"use client";

import ScanTable from "@/components/ScanTable";
import QrcodeForm from "@/components/QrcodeForm";
import QrcodeTable from "@/components/QrcodeTable";
import { useScanData } from "./hook/useScan";
import { useQrcodeData } from "./hook/useQrcode";
import ModalQrcode from "@/components/ModalQrcode";
import { useState } from "react";
import { QrCode } from "@/app/qrcode/types/types";
import InfoCard from "@/components/Card";
import { MapPin, QrCodeIcon, ScanLine, Trophy } from "lucide-react";

export default function QrcodePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<QrCode | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [linkAdd, setLinkAdd] = useState("");
  const [name, setName] = useState("");
  const [numberFone, setNumberFone, ] = useState("");
  const [generatedQrcode, setGeneratedQrcode] = useState<QrCode | null>(null);
  const [modalVisible, setModalVisible] = useState(false);


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
    mostScannedCode,
    topCity,
    fetchData: fetchScanData, // renomeando para clareza
  } = useScanData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-50 p-6 text-sm font-sans">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Formulário de geração */}
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

        {/* Tabela de QRCodes */}
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
      
      {/* Cards de estatísticas */}
      <ScanTable data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        await fetchScanData();
      {/* <button 
  onClick={fetchScanData}
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
>
  Atualizar Scans
</button> */}

    </div>
  );
}