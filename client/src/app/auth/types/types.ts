import { GenericHTMLFormElement } from "axios";

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
}

export interface UseAuthReturne {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    error: string;
    isLoading: boolean;
    showPassword: boolean;
    togglePaswordVisibility: () => void;
    hanbleLoading: (e: React.FormEvent<GenericHTMLFormElement>) => Promise<void>;
}

