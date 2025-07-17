import axios from "axios";
import { User } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Função para obter o token do localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get(`${API_URL}/user`, getAuthHeaders());
  return res.data;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  const res = await axios.post(`${API_URL}/user`, data, getAuthHeaders());
  return res.data;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  const res = await axios.patch(`${API_URL}/user/${id}`, data, getAuthHeaders());
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/user/${id}`, getAuthHeaders());
};

export const toggleUserStatus = async (id: string, status: boolean): Promise<void> => {
  await axios.patch(`${API_URL}/user/${id}`, { status }, getAuthHeaders());
};
