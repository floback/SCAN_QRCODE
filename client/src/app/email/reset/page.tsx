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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-cyan-50 from-cyan-100 to-cyan-200 via-cyan-300">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
       <h2 className="text-2xl text-zinc-700 font-sans font-bold text-center mb-4">Digite sua nova senha</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            required
            className="w-full border px-4 py-2 rounded text-zinc-500"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full border px-4 py-2 rounded text-zinc-500"
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600">
            Enviar
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
