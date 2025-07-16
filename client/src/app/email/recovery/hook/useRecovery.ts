"use client";

import { useState } from "react";
import { sendRecoveryEmail } from "../service/recovery.service";
import { RecoveryRequest } from "../types/types";
import { useRouter } from "next/navigation";


export function useRecovery() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload: RecoveryRequest = { email };

    
    try {
      const res = await sendRecoveryEmail(payload);
      setMessage(res.message || "Email de recuperação enviado!");
  
      setTimeout(() => {
        router.push("/auth");
      }, 2000);

    } catch (err: any) {
      setMessage(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }



  };



  return {
    email,
    setEmail,
    message,
    loading,
    handleSubmit,
  };
}
