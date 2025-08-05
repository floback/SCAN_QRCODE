import Input from "@/components/Input";
import Button from "@/components/Button";
import { Dispatch, SetStateAction, useState } from "react";
import { CloudDownload, X } from "lucide-react";

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  linkAdd: string;
  setLinkAdd: Dispatch<SetStateAction<string>>;
  apiConnect: string;
  setApiConnect: Dispatch<SetStateAction<String>>;
  numberFone: string;
  setNumberFone: Dispatch<SetStateAction<string>>;
  createQrcode: (data: FormData) => Promise<any>;
}

export default function QrcodeForm({
  linkAdd,
  name,
  setName,
  setLinkAdd,
  numberFone,
  setNumberFone,
  createQrcode,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedQrcode, setGeneratedQrcode] = useState<any>(null);
  const [appType, setAppType] = useState("whatsapp");
  const [iconFile, setIconFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      let finalLink = linkAdd;

      if (!finalLink && numberFone) {
        switch (appType) {
          case "whatsapp":
            finalLink = `https://wa.me/${numberFone}`;
            break;
          case "telegram":
            finalLink = `https://t.me/${numberFone}`;
            break;
          case "signal":
            finalLink = `https://signal.me/#p/${numberFone}`;
            break;
          default:
            finalLink = `https://wa.me/${numberFone}`;
        }
      }

      const formData = new FormData();
      formData.append("link_add", finalLink || "");
      formData.append("number_fone", numberFone || "");
      formData.append("name", name || "");
      formData.append("app_type", appType);

      if (iconFile) {
        formData.append("icone_qrcode", iconFile);
      }

      const newQR = await createQrcode(formData);

      if (newQR) {
        setGeneratedQrcode(newQR);
        setModalVisible(true);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar QR Code");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow p-2 flex flex-col gap-3 w-full md:w-1/3">
        <h1 className="text-xl font-bold mb-4 text-gray-700">GENERATE QR CODE</h1>
        <Input size="sm" label="Enter Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Promoção dia das mãe" />
        <Input size="sm" label="Enter Link" value={linkAdd} onChange={(e) => setLinkAdd(e.target.value)} placeholder="Ex: https://site.com" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select App</label>
          <select
            value={appType}
            onChange={(e) => setAppType(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-cyan-500"
          >
            <option value="none">NONE</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="signal">Signal</option>
          </select>
        </div>

        <Input size="sm" label="Enter Phone Number" value={numberFone} onChange={(e) => setNumberFone(e.target.value)} placeholder="Ex: 5521921..." />

        {/* Upload de imagem para ícone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ícone para o centro (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setIconFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
          />
        </div>

        <Button typeStyle="secondary" size="sm" onClick={handleSubmit}>Generate</Button>
      </div>

      {/* Modal */}
      {modalVisible && generatedQrcode && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
          <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
            <h2 className="text-xl text-cyan-800 font-bold mb-4 text-center">
              QR Code Gerado com Sucesso
            </h2>
            <img
              src={generatedQrcode.img}
              alt="QR Code"
              className="mx-auto h-48 w-48 object-contain mb-4"
            />
            <div className="flex flex-col items-center gap-2">
              <a
                href={generatedQrcode.img}
                download={`qrcode-${generatedQrcode.name || "download"}.png`}
                className="bg-green-600 text-white px-10 py-3 hover:bg-green-700 rounded text-center"
              >
                <CloudDownload />
              </a>
              <button
                className="bg-red-600 text-white px-10 py-2 hover:bg-green-700 rounded text-center"
                onClick={() => setModalVisible(false)}
              >
                <X />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
