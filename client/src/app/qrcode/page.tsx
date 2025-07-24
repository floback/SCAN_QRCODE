"use client";

import { useScanData } from "./hook/useScan";
import { useQrcodeData } from "./hook/useQrcode";
import { useState } from "react";
import { QrCode } from "@/app/qrcode/types/types";
import { MapPin, QrCodeIcon, ScanLine, Trophy } from "lucide-react";
import ScanTable from "@/components/ScanTable";
import QrcodeForm from "@/components/QrcodeForm";
import QrcodeTable from "@/components/QrcodeTable";
import InfoCard from "@/components/Card";
import ModalQrcode from "@/components/modal/ModalQrcode";

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
    mostScannedCodeName,
    topCity,
    fetchData: fetchScanData, 
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
      <InfoCard
          title="TOTAL QR CODE"
          value={totalCodes}
          icon={QrCodeIcon}
          bgColor="bg-blue-600" // Azul roxo: Representa tecnologia, estabilidade
        />        
      <InfoCard
          title="TOTAL SCAN"
          value={totalScans}
          icon={ScanLine}
          bgColor="bg-green-600" // Verde: Ação, sucesso, algo positivo (scans feitos)
        />
         <InfoCard
          title="CODE PLUS SCANNING"
          value={mostScannedCodeName || "-"}
          icon={Trophy}
          bgColor="bg-yellow-500" // Amarelo: Destaque, premiação
        />

        <InfoCard title="SCANNING CITY"
        value={topCity || "-"}
        icon={MapPin}
        bgColor="bg-green-700" />
      </div>
      
      {/* Cards de estatísticas */}
     <ScanTable data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


    </div>
  );
}