"use client";

import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import { useRegister } from "./hook/useResgister";

export default function RegisterPage() {
  const {
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
  } = useRegister();

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 sm:p-10 w-full max-w-md rounded-3xl border shadow-lg"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-700 text-center mb-8 font-sans">
          Criar Conta
        </h2>

        <Input
          label="Nome completo"
          name="name"
          placeholder="Digite seu nome completo"
          required
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          inputRef={nameRef}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Confirmar Email"
          type="email"
          name="confirmEmail"
          placeholder="Confirme seu email"
          required
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirmar Senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button typeStyle="primary">Salvar</Button>

        <div className="mt-5 text-center">
          <a
            href="/auth"
            className="text-sm text-cyan-600 hover:text-cyan-800 hover:underline transition-colors"
          >
            Já tem uma conta? Faça login
          </a>
        </div>
      </form>
    </div>
  );
}
