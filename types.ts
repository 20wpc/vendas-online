
export interface Event {
  id?: number;
  title: string;
  date: string; // YYYY-MM-DD for filtering
  displayDate: string; // User-friendly date for display
  location: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  reminderSet?: boolean;
}

export interface CompanyInfo {
    id?: number;
    name: string;
    email: string;
    cnpj: string;
    pixKey: string;
    pixQrCodePayload: string;
}