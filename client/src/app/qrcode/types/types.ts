export interface ScanQrCode {
  id: string;
  id_qrcode: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  latitude: string;
  longitude: string;
  create_date: string;
  name: string | null;
  link_add: string;
  status: boolean
  number_fone: string;
}

export interface QrCode {
  id: string;
  id_user: string;
  code: string;
  img: string;
  link_add: string;
  number_fone: string;
  status: boolean; 
  create_date: string; 
  update_at: string;   
  name?: string;
}
