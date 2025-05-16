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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-cyan-50 from-cyan-100 to-cyan-200 via-cyan-300">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-zinc-700 font-sans">
          Recuperação de Senha
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            className="w-full border px-4 py-2 rounded text-zinc-500"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600">
            Enviar
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
