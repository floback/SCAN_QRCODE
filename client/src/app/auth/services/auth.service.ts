import axios from "axios";
import { AuthRequest, AuthResponse } from "../types/types";

export async function loginService(payload: AuthRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>("http://localhost:3001/auth/login", payload);
  return response.data;
}
