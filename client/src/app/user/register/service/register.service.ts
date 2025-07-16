import axios from "axios";
import { RegisterRequest } from "../types/types";

export async function registerUser(data: RegisterRequest): Promise<void> {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, data);
}
