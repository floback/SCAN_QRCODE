"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthRequest, UseAuthReturne } from "../types/types";
import { loginService } from "../services/auth.service";

export function useAuth(): UseAuthReturne {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const payload: AuthRequest = { email, password };

    try {
      const { access_token } = await loginService(payload);
      localStorage.setItem("token", access_token);

      setTimeout(() => {
        router.push("/qrcode");
      }, 1500);
    } catch (err) {
      setError("E-mail ou senha inválidos!");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
  };
}
