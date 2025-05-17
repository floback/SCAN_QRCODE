"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações simples
    if (email !== confirmEmail) {
      return setError("Os e-mails não coincidem.");
    }
    if (password !== confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:3001/user/register", {
        name,
        email,
        password,
      });

      // Redireciona para login após cadastro
      router.push("/auth");
    } catch (err) {
      setError("Erro ao criar conta. Verifique os dados e tente novamente.");
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-cyan-50 from-cyan-100 to-cyan-200 via-cyan-300">
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 w-130 rounded-3xl border shadow-lg"
      >
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-zinc-700 font-sans">
            Criar Conta
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1.5 text-sm">
            Nome completo
          </label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded text-zinc-500"
            value={name}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1.5 text-sm">
            Email
          </label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded text-zinc-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1.5 text-sm">
            Confirmar Email
          </label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded text-zinc-500"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirme seu email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1.5 text-sm">
            Senha
          </label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded text-zinc-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1.5 text-sm">
            Confirmar Senha
          </label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded text-zinc-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2.5 rounded-md hover:bg-cyan-600 transition-colors font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Criar conta
        </button>

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
