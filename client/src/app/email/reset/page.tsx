"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useResetPassword } from "./hook/useReset";

export default function ResetPasswordPage() {
  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handleReset,
    message,
  } = useResetPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-soft w-full max-w-md">
        <h2 className="text-2xl text-zinc-700 font-bold text-center mb-4">
          Digite sua nova senha
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <Input
            label="Senha"
            id="new-password"
            name="newPassword"
            type="password"
            required
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Repita a senha"
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button typeStyle="primary">Enviar</Button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-zinc-600">{message}</p>
        )}
      </div>
    </div>
  );
}
