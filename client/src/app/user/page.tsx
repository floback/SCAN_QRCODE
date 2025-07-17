"use client";

import { useUserManagement } from "./hook/useUser";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Label } from "@/components/Label";
import {
    Search,
    Pencil,
    Trash,
    Check,
    Circle,
    CircleDot,
    Plus,
    Info,
} from "lucide-react";
import { useState } from "react";
import { User, UserType } from "./types/types";

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

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && user.status) ||
            (statusFilter === "inactive" && !user.status);

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-cyan-100 px-6 py-8 font-sans">
            <div className="bg-white rounded-3xl p-6 shadow-md max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-xl font-bold text-gray-800">CONTROL USERS</h1>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm text-gray-600 font-semibold">
                            TOTAL USERS: {filteredUsers.length}
                        </span>

                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="pl-8 pr-2 py-1.5 border rounded-full text-sm shadow"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <select
                            className="border text-sm rounded px-3 py-1 shadow"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <Button size="sm" typeStyle="primary" fullWidth={false}>
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Tabela */}
                <div className="overflow-x-auto rounded-xl shadow">
                    <table className="min-w-full text-sm text-center text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Email</th>
                                <th className="px-3 py-2">Password</th>
                                <th className="px-3 py-2">Type</th>
                                <th className="px-3 py-2">Status</th>
                                <th className="px-3 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => {
                                const isEditing = editingUserId === user.id;
                                return (
                                    <tr
                                        key={user.id}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-cyan-50 border-b"
                                    >
                                        {isEditing ? (
                                            <>
                                                <td className="px-3 py-2">
                                                    <Input
                                                        size="sm"
                                                        defaultValue={user.name}
                                                        onChange={(e) =>
                                                            setEditedUser({ ...editedUser, name: e.target.value })
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Input
                                                        size="sm"
                                                        defaultValue={user.email}
                                                        onChange={(e) =>
                                                            setEditedUser({ ...editedUser, email: e.target.value })
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Input
                                                        size="sm"
                                                        placeholder="••••••••"
                                                        showTogglePassword
                                                        onChange={(e) =>
                                                            setEditedUser({ ...editedUser, password: e.target.value })
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <select
                                                        className="w-full border rounded px-2 py-1 text-sm"
                                                        defaultValue={user.type_user}
                                                        onChange={(e) =>
                                                            setEditedUser({
                                                                ...editedUser,
                                                                type_user: e.target.value as UserType,
                                                            })
                                                        }
                                                    >
                                                        {Object.values(UserType).map((type) => (
                                                            <option key={type} value={type}>
                                                                {type}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                              <td className="px-3 py-2">
  <div className="flex items-center justify-center gap-2">
    <Label htmlFor={`status-${user.id}`}>Status</Label>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        id={`status-${user.id}`}
        type="checkbox"
        className="sr-only peer"
        checked={editedUser.status ?? user.status}
        onChange={(e) =>
          setEditedUser({ ...editedUser, status: e.target.checked })
        }
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition" />
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full" />
    </label>
  </div>
</td>

                                                <td className="px-3 py-2 flex justify-center gap-2">
                                                    <Button
                                                        typeStyle="primary"
                                                        size="sm"
                                                        fullWidth={false}
                                                        onClick={() =>
                                                            handleSaveEdit(user.id, editedUser).then(() => setEditedUser({}))
                                                        }
                                                    >
                                                        <Check size={16} />
                                                    </Button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-3 py-2 text-xs">{user.name}</td>
                                                <td className="px-3 py-2 text-xs">{user.email}</td>
                                                <td className="px-3 py-2 text-xs">••••••••</td>
                                                <td className="px-3 py-2 text-xs">{user.type_user}</td>
                                                <td className="px-3 py-2">
                                                    <button
                                                        title={user.status ? "Deactivate" : "Activate"}
                                                        onClick={() => handleToggleStatus(user.id, user.status)}
                                                    >
                                                        {user.status ? (
                                                            <Circle className="text-green-500" size={16} />
                                                        ) : (
                                                            <CircleDot className="text-red-500" size={16} />
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-3 py-2 flex justify-center gap-2">
                                                    <button
                                                        className="text-cyan-600 hover:text-cyan-800"
                                                        title="Edit"
                                                        onClick={() => {
                                                            handleEdit(user.id);
                                                            setEditedUser(user);
                                                        }}
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        <Trash size={16} />
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
                <div className="mt-4 text-sm text-gray-600 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Circle className="text-green-500" size={12} />
                        <span>Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CircleDot className="text-red-500" size={12} />
                        <span>Inactive</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 ml-auto">
                        <Info size={14} />
                        <span>Status icons are clickable</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
