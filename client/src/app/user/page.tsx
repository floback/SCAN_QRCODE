"use client";

import { useState } from "react";
import { useUserManagement } from "./hook/useUser";
import { User } from "./types/types";
import { ModalUser } from "@/components/modal/Modaluser";
import {
  Search,
  Pencil,
  Trash,
  Check,
  Plus,
  Info,
  Users,
  Disc,
  Dot,
} from "lucide-react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InfoCard from "@/components/Card";
import UserTable from "@/components/UserTable";

enum UserType {

  admin = "admin",
  user = "user",
}

export default function UserManagementPage() {
  const {
    users,
    editingUserId,
    deleteUser,
    handleToggleStatus,
    handleEdit,
    handleSaveEdit,
    createUser,
  } = useUserManagement();

  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const totalAdmins = users.filter((user) => user.type_user.toLowerCase() === "admin").length;
  const totalNormalUsers = users.filter((user) => user.type_user.toLowerCase() === "user").length;

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.status) ||
      (statusFilter === "inactive" && !user.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-cyan-100 px-8 py-10 font-sans text-base">
      <div className="bg-white rounded-3xl p-8 shadow-lg max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">CONTROL USERS</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <InfoCard title="Total de Usuários" value={users.length} icon={Users} bgColor="bg-indigo-600" />
            <InfoCard title="Total de Admins" value={totalAdmins} icon={Users} bgColor="bg-emerald-500" />
            <InfoCard title="Total de Users" value={totalNormalUsers} icon={Users} bgColor="bg-amber-500" />
          </div>

          <div className="flex flex-wrap gap-3 justify-end items-center w-full">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-5 w-5 text-gray-800" />
              <Input
                type="text"
                placeholder="Buscar por nome"
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="border text-base rounded px-4 py-2 shadow text-gray-800"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <ModalUser
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              onSave={async (data) => {
                await createUser(data);
                setIsCreateModalOpen(false);
              }}
            />

            <Button
              typeStyle="secondary"
              fullWidth={false}
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="mr-1" /> Add User
            </Button>
          </div>
        </div>

        {/* Tabela */}
        <UserTable
          users={users}
          filteredUsers={filteredUsers}
          editingUserId={editingUserId}
          editedUser={editedUser}
          setEditedUser={setEditedUser}
          handleEdit={handleEdit}
          handleSaveEdit={handleSaveEdit}
          deleteUser={deleteUser}
          handleToggleStatus={handleToggleStatus}
        />

        {/* Legenda */}
        <div className="mt-6 text-base text-gray-600 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Disc className="text-green-500" size={14} />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Disc className="text-red-500" size={14} />
            <span>Inactive</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 ml-auto">
            <Info size={16} />
            <span>Status icons are clickable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
