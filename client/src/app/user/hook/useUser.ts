"use client";

import { useEffect, useState, useMemo } from "react";
import { User } from "../types/types";
import {
  fetchUsers,
  createUser as createUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from "../services/user.service";

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchUser, setSearchUser] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchUsers();
    if (data) setUsers(data);
    setLoading(false);
  };

  const createUser = async (newUser: Partial<User>) => {
    const created = await createUserApi(newUser);
    if (created) setUsers((prev) => [...prev, created]);
    else setError("Erro ao criar usuário");
  };

  const updateUser = async (id: string, updateData: Partial<User>) => {
    const updated = await updateUserApi(id, updateData);
    if (updated) {
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updated : user))
      );
    } else {
      setError("Erro ao atualizar usuário");
      console.log("Atualizando com dados:", updateData);

    }
  };

  const deleteUser = async (id: string) => {
    const success = await deleteUserApi(id);
    if (success) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } else {
      setError("Erro ao deletar usuário");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    await updateUser(id, { status: !currentStatus });
  };

  const handleEdit = (id: string) => {
    setEditingUserId(id);
  };

  const handleSaveEdit = async (id: string, updatedData: Partial<User>) => {
    await updateUser(id, updatedData);
    setEditingUserId(null);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchUser.toLowerCase())
      )
    );
  }, [users, searchUser]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    users: filteredUsers,
    loading,
    error,
    editingUserId,
    setEditingUserId,
    searchUser,
    setSearchUser,
    createUser,
    updateUser,
    deleteUser,
    handleEdit,
    handleSaveEdit,
    handleToggleStatus,
    fetchData,
  };
}
