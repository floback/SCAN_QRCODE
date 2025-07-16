"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordRequest } from "../service/resetPassword.service";
import { ResetPasswordData } from "../types/resetPassword";


export const useResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();


  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("Token inválido.");
      return;
    }

    const data: ResetPasswordData = {
      token,
      newPassword,
      confirmPassword,
    };

    if(newPassword !== confirmPassword){
      setMessage("As senha não coincidem.");
      return;
    }
    
    const response = await resetPasswordRequest(data);

    if (response.success) {
      setMessage("Senha alterada com sucesso!");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);

    } else {
      setMessage(`Erro: ${response.message}`);
    }
  };

  return {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handleReset,
    message,
  };
};
