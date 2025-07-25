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


enum UserType{
  admin = "admin",
  user = "user"
}

export const ModalUser: React.FC<ModalUserProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    password: "",
    type_user: UserType.user,
    status: true,
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        type_user: UserType.user,
        status: true,
      });
    }
  }, [isOpen]);

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
            onChange={(e) => setFormData({ ...formData, type_user: e.target.value as "user" | "admin" })}
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
            />
            Ativo
          </label>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button typeStyle="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button typeStyle="secondary" onClick={() => onSave(formData)}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};
