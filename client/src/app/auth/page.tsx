"use client";

import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { useAuth } from "./hook/useAuth";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
  } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 px-4">
      <section className="bg-white p-8 sm:p-10 w-full max-w-md rounded-3xl shadow-xl border border-cyan-100 animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-zinc-700 font-sans">Login</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
          />

          <div className="relative">
            <Input
              label="Senha"
              name="password"
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "password"}
              size="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button typeStyle="primary">Entrar</Button>
        </form>

        <div className="mt-5 text-center">
          <a href="/email/recovery" className="text-sm text-cyan-600 hover:text-cyan-800 hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        <div className="mt-3 text-center text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <a href="/user/register" className="text-cyan-600 hover:text-cyan-800 hover:underline">
            Crie uma aqui
          </a>
        </div>
      </section>
    </main>
  );
}
