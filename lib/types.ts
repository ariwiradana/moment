export interface Theme {
  id: number | null;
  name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  thumbnail?: string | null;
}

export interface Option {
  label: string;
  value: number | string;
}

export interface Participant {
  id?: number;
  client_id?: number | null;
  name: string;
  nickname: string;
  address: string;
  child: string;
  parents_male: string;
  parents_female: string;
  image: string | null | FileList;
  gender: "male" | "female";
  role: "bride" | "groom" | "participant";
  created_at?: Date | string;
  updated_at?: Date | string;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
}

export interface Client {
  id?: number;
  name: string;
  slug?: string;
  address: string;
  address_url: string;
  address_full: string;
  participants: Participant[];
  gallery?: string[] | FileList | [];
  videos?: string[] | FileList | [];
  date: string;
  status?: "paid" | "unpaid";
  start_time: string;
  end_time: string;
  theme_id: number | null;
  theme?: Theme | null;
  cover: null | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Review {
  id: number;
  client_id: number;
  name: string;
  attendant: string;
  wishes: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
