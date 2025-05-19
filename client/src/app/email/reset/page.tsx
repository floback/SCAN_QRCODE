'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword, confirmPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Senha alterada com sucesso!');
    } else {
      setMessage(`Erro: ${data.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl text-zinc-700 font-bold text-center mb-4">
          Digite sua nova senha
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            required
            className="w-full border border-zinc-300 px-4 py-2 rounded-md text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full border border-zinc-300 px-4 py-2 rounded-md text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
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
