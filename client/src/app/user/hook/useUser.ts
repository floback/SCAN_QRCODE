"use client";

import { useEffect, useState } from "react";
import { User } from "../types/types";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../services/user.service";

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res);
  };

  const handleCreateUser = async (data: Partial<User>) => {
    const newUser = await createUser(data);
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
  try {
    await updateUser(id, { status: !currentStatus });
    await fetchUsers();
  } catch (error) {
    console.error("Erro ao alterar status:", error);
  }
};

  const handleEdit = (id: string) => {
    setEditingUserId(id);
  };

  const handleSaveEdit = async (id: string, updatedData: Partial<User>) => {
    const updated = await updateUser(id, updatedData);
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? updated : user))
    );
    setEditingUserId(null);
  };

 
  return {
    users,
    editingUserId,
    handleDelete,
    handleToggleStatus,
    handleEdit,
    handleSaveEdit,
    handleCreateUser,
  };
}
