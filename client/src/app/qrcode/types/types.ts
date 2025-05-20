
export interface QrCode {
  name: any;
  id: string;
  code: string; // valor único ou hash do QR gerado
  url: string; // link de redirecionamento
  type: 'WEB' | 'WHATSAPP'; // tipo de destino do QR
  createdAt: string; // ISO date string (ex: 2024-05-20T14:35:00Z)
  status: boolean; // se está ativo ou não
  createdBy: string; // ID do usuário criador (relacional)
}
