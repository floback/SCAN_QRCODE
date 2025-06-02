import Input from "@/components/Input";
import Button from "@/components/Button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  linkAdd: string;
  setLinkAdd: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  numberFone: string;
  setNumberFone: Dispatch<SetStateAction<string>>;
  createQrcode: (data: any) => void;
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
  const handleSubmit = () => {
    if (!linkAdd || !name) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    createQrcode({ link_add: linkAdd, name, number_fone: numberFone });
    setLinkAdd("");
    setName("");
    setNumberFone("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 w-full md:w-1/3">
      <h1 className="text-xl font-bold mb-4 text-gray-700">GENERATE QR CODE</h1>
      <Input label="Enter Link" value={linkAdd} onChange={(e) => setLinkAdd(e.target.value)} placeholder="Ex: https://wa.me/..." />
      <Input label="Enter Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Comercial Lote XV" />
      <Input label="Enter Phone Number" value={numberFone} onChange={(e) => setNumberFone(e.target.value)} placeholder="Ex: 5521..." />
      <Button typeStyle="secondary" size="small" onClick={handleSubmit}>Generate</Button>
    </div>
  );
}
