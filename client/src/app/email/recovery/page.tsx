"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRecovery } from "./hook/useRecovery";

export default function RecoveryPage() {
  const { email, setEmail, message, handleSubmit, loading } = useRecovery();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-zinc-700">
          Recuperação de Senha
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          />

          <Button typeStyle="primary" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-zinc-600">{message}</p>
        )}
      </div>
    </div>
  );
}
