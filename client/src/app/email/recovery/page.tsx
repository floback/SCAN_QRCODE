"use client";
import { useState } from "react";

export default function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('API_URL:', process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/recovery-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (res.ok) {
      setMessage("Email de recuperação enviado!");
    } else {
      const { message } = await res.json();
      setMessage(`Erro: ${message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-zinc-700">
          Recuperação de Senha
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            className="w-full border border-zinc-300 px-4 py-2 rounded-md text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2.5 rounded-md hover:bg-cyan-600 transition-colors font-medium shadow-soft animate-pulseSoft"
          >
            Enviar
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-zinc-600">{message}</p>
        )}
      </div>
    </div>
  );
}
