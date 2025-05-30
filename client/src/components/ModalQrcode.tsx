"use client";

import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Label } from "@/components/Label";
import { updateQrcode } from "@/app/qrcode/service/service.qrcode";

interface ModalQrcodeProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  setLoadingModal: (value: boolean) => void;
  fetchData: () => Promise<void>;
}

export default function ModalQrcode({
  isOpen,
  onClose,
  data,
  setLoadingModal,
  fetchData,
}: ModalQrcodeProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    link: "",
    whatsapp: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && data) {
      setFormData({
        id: data.id || "",
        name: data.name || "",
        link: data.link_add || "",
        whatsapp: data.number_fone || "",
        status: data.status ?? true,
      });
    }
  }, [isOpen, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.link || !formData.whatsapp) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      setLoadingModal(true);

      await updateQrcode(String(formData.id), {
        name: formData.name,
        link_add: formData.link,
        number_fone: formData.whatsapp,
        status: formData.status,
      });

      alert("QR Code atualizado com sucesso!");
      await fetchData();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar QR Code.");
    } finally {
      setLoading(false);
      setLoadingModal(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
          <Dialog.Title className="text-xl font-bold mb-4">
            Editar QR Code
          </Dialog.Title>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                label="Nome"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <Input
                label="Link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                label="WhatsApp"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
              />
              <Label htmlFor="status">Ativo</Label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
