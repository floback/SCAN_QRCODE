import { User } from "../types/types";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

// CREATEUSER
export const createUser = async (
  data: Partial<User>
): Promise<User | null> => {
  return await fetchWithAuth<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/user`,
    {
      method: "POST",
      body:JSON.stringify(data),
    }
  );
};

//DELETEUSER
export const deleteUser = async (
  id: string
): Promise<boolean> => {
  const result = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
    {
      method: "DELETE",
    }
  );
  return result !== null;
};

//ATUALIZAR USER
export const updateUser = async (
  id: string,
  updateData: Partial<User>
): Promise<User | null> => {
  return await fetchWithAuth<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updateData), 
    }
  );
};


//BUSCAR TODOS OS USUÁRIOS
export const fetchUsers = async (): Promise<User[] | null> => {
  return await fetchWithAuth<User[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/user`
  );
};
