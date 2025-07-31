"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { User } from "../../types/types";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<User>) => void;
}

enum UserType {
  admin = "admin",
  user = "user"
}

export const ModalUser: React.FC<ModalUserProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    password: "",
    type_user: UserType.user,
    // status: true, // não incluir na criação
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        type_user: UserType.user,
      });
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  }, [isOpen]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Remove status caso esteja presente
    const { status, ...dataToSave } = formData;
    const payload = { ...dataToSave, avatar: avatarFile };
delete (payload as any).status;
onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Adicionar Novo Usuário</h2>

        <div className="grid grid-cols-1 gap-4">
          <Input
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <select
            className="border rounded px-4 py-2 text-base"
            value={formData.type_user}
            onChange={(e) =>
              setFormData({ ...formData, type_user: e.target.value as "user" | "admin" })
            }
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>

          {/* Avatar Upload */}
          <div className="mt-2">
            <label className="block mb-1 text-sm text-gray-700 font-medium">
              Avatar (opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Preview do avatar"
                className="mt-2 h-20 w-20 object-cover rounded-full border"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button typeStyle="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button typeStyle="secondary" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};
