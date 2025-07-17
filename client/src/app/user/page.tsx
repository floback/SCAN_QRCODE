"use client";

import { useState } from "react";
import { useUserManagement } from "./hook/useUser";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Label } from "@/components/Label";
import InfoCard from "@/components/Card";
import { User } from "./types/types";
import {
  Search,
  Pencil,
  Trash,
  Check,
  Circle,
  CircleDot,
  Plus,
  Info,
  Users,
} from "lucide-react";

enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export default function UserManagementPage() {
  const {
    users,
    editingUserId,
    handleDelete,
    handleToggleStatus,
    handleEdit,
    handleSaveEdit,
  } = useUserManagement();

  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

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
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
              <input
                type="text"
                placeholder="Buscar por nome"
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md text-base shadow-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

            <Button size="md" typeStyle="secondary" fullWidth={false}>
              <Plus className="mr-1" /> Add User
            </Button>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full text-lg text-center text-gray-700">
            <thead className="bg-gray-100 text-base uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Password</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isEditing = editingUserId === user.id;
                return (
                  <tr key={user.id} className="odd:bg-white even:bg-gray-50 hover:bg-cyan-50 border-b">
                    {isEditing ? (
                      <>
                        <td className="px-4 py-3">
                          <Input defaultValue={user.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
                        </td>
                        <td className="px-4 py-3">
                          <Input defaultValue={user.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
                        </td>
                        <td className="px-4 py-3">
                          <Input placeholder="••••••••" showTogglePassword onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })} />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            defaultValue={user.type_user}
                            onChange={(e) => setEditedUser({ ...editedUser, type_user: e.target.value as UserType })}
                            className="w-full border rounded px-3 py-2 text-base"
                          >
                            {Object.values(UserType).map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={editedUser.status ?? user.status}
                              onChange={(e) => setEditedUser({ ...editedUser, status: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition" />
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full" />
                          </label>
                        </td>
                        <td className="px-4 py-3 flex justify-center gap-2">
                          <Button typeStyle="primary" size="md" fullWidth={false} onClick={() => handleSaveEdit(user.id, editedUser).then(() => setEditedUser({}))}>
                            <Check size={20} />
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">••••••••</td>
                        <td className="px-4 py-3">{user.type_user}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleToggleStatus(user.id, user.status)}>
                            {user.status ? <Circle className="text-green-500" size={20} /> : <CircleDot className="text-red-500" size={20} />}
                          </button>
                        </td>
                        <td className="px-4 py-3 flex justify-center gap-3">
                          <button className="text-cyan-600 hover:text-cyan-800" onClick={() => { handleEdit(user.id); setEditedUser(user); }}>
                            <Pencil size={20} />
                          </button>
                          <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(user.id)}>
                            <Trash size={20} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legenda */}
        <div className="mt-6 text-base text-gray-600 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Circle className="text-green-500" size={14} />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleDot className="text-red-500" size={14} />
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
