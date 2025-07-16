"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerUser } from "../service/register.service";
import { RegisterRequest } from "../types/types";

export function useRegister() {
  const router = useRouter();

  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (email !== confirmEmail) {
      toast.error("Os e-mails não coincidem.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const payload: RegisterRequest = { name, email, password };
      await registerUser(payload);

      toast.success("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => router.push("/auth"), 2000);
    } catch (err) {
      toast.error("Erro ao criar conta. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    isLoading,
    nameRef,
    setFullName,
    setEmail,
    setConfirmEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
  };
}
