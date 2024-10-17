import { NextApiRequest, NextApiResponse } from "next";

export interface Theme {
  id: number | null;
  slug: string;
  name: string;
  category?: string;
  is_preview?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
  thumbnail?: string | null;
  package_ids: number[];
  packages?: Package[];
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
  child: string | null;
  parents_male: string | null;
  parents_female: string | null;
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

export interface Event {
  id?: number;
  client_id?: number | null;
  name: string;
  address: string;
  address_url: string;
  date: string;
  start_time: string;
  end_time: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Client {
  id?: number;
  name: string;
  opening_title: string;
  opening_description: string;
  closing_title: string;
  closing_description: string;
  gift_bank_name: string;
  gift_account_name: string;
  gift_account_number: string;
  slug?: string;
  events: Event[];
  participants: Participant[];
  gallery?: string[] | FileList | [];
  videos?: string[] | FileList | [];
  music?: string | File | null;
  status?: "paid" | "unpaid";
  theme_id: number | null;
  package_id: number | null;
  packages?: Package;
  theme?: Theme | null;
  cover: null | string;
  is_testimoni?: boolean;
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

export interface Package {
  id: number;
  name: string;
  unlimited_revisions: boolean;
  unlimited_guest_names: boolean;
  max_events: string;
  max_gallery_photos: string;
  contact_social_media: boolean;
  background_sound: boolean;
  max_videos: string;
  rsvp_and_greetings: boolean;
  custom_cover_photo: boolean;
  digital_envelope: boolean;
  google_maps_integration: boolean;
  add_to_calendar: boolean;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Blob {
  size: number;
  uploadedAt: Date;
  pathname: string;
  url: string;
  downloadUrl: string;
}

export interface Testimonials {
  id: number;
  client_id: number;
  name: string;
  comments: string;
  client_name: string;
  client_cover: string;
  theme_name: string;
  theme_category: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  password?: string;
}

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;
