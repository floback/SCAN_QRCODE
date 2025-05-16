"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // <-- Mostra loader

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      // Simula tempo de carregamento antes de redirecionar
      setTimeout(() => {
        router.push("//");
      }, 2000);
    } catch (err) {
      setError("E-mail ou senha inválidos!");
      setIsLoading(false); // <-- Oculta loader se falhar
    }
  };

  if (isLoading) return <Loader />;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-cyan-50 from-cyan-100 to-cyan-200 via-cyan-300">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 w-130 rounded-3xl border shadow-lg"
      >
        <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-zinc-700 font-sans">Login</h2> 
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-1.5 text-sm">
            Email
          </label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded text-zinc-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu E-mail"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1.5 text-sm">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
            className="w-full border px-4 py-2 rounded text-zinc-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite seu Password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2.5 rounded-md hover:bg-cyan-600 transition-colors font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Entrar
        </button>

        <div className="mt-5 text-center">
          <a
            href="/email/recovery"
            className="text-sm text-cyan-600 hover:text-cyan-800 hover:underline transition-colors"
          >
            Esqueceu a senha?
          </a>
        </div>
      </form>
    </div>
  );
}
