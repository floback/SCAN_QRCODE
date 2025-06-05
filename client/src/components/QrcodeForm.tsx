import Input from "@/components/Input";
import Button from "@/components/Button";
import { Dispatch, SetStateAction, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  linkAdd: string;
  setLinkAdd: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  numberFone: string;
  setNumberFone: Dispatch<SetStateAction<string>>;
  createQrcode: (data: any) => Promise<any>; // ⬅️ Certifique-se que retorna o objeto com `img`
}

export default function QrcodeForm({
  linkAdd,
  setLinkAdd,
  name,
  setName,
  numberFone,
  setNumberFone,
  createQrcode,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedQrcode, setGeneratedQrcode] = useState<any>(null);

  const handleSubmit = async () => {
  try {
    const newQR = await createQrcode({
      link_add: linkAdd || undefined,
      number_fone: numberFone || undefined,
      name: name || undefined,
    });

    if (newQR) {
      console.log("Novo Qrcode:",newQR);
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
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 w-full md:w-1/3">
        <h1 className="text-xl font-bold mb-4 text-gray-700">GENERATE QR CODE</h1>
        <Input label="Enter Link" value={linkAdd} onChange={(e) => setLinkAdd(e.target.value)} placeholder="Ex: https://wa.me/..." />
        <Input label="Enter Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Comercial Lote XV" />
        <Input label="Enter Phone Number" value={numberFone} onChange={(e) => setNumberFone(e.target.value)} placeholder="Ex: 5521..." />
        <Button typeStyle="secondary" size="small" onClick={handleSubmit}>Generate</Button>
      </div>

      {/* Modal */}
      {modalVisible && generatedQrcode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-700">QR Code Gerado com Sucesso</h2>
            <img
              src={
                 generatedQrcode.img.startsWith("data:image")
                  ? generatedQrcode.img
                  : `data:image/png;base64,${generatedQrcode.img}`
              }
              alt="QR Code"
              className="mx-auto h-48 w-48 object-contain mb-4"
            />
            <a
              href={generatedQrcode.img}
              download={`qrcode-${generatedQrcode.name || "download"}.png`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
              Download QR Code
            </a>
            <button
              className="mt-4 text-sm text-gray-500 hover:underline block mx-auto"
              onClick={() => setModalVisible(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
