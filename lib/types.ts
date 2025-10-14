import { NextApiRequest, NextApiResponse } from "next";

export interface Theme {
  id: number | null;
  slug: string;
  name: string;
  category?: string;
  description?: string;
  is_preview?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
  thumbnail?: string | null;
  phone_thumbnail?: string | null;
  package_ids: number[];
  packages?: Package[];
  theme_category_ids: number[];
  theme_categories?: ThemeCategory[];
  cover_video?: boolean;
  active: boolean;
  features: string[];
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
  image: null | string | FileList;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Client {
  id?: number;
  name: string;
  phone?: number | string;
  music_title?: string;
  opening_title: string;
  opening_description: string;
  closing_title: string;
  closing_description: string;
  gift_bank_name: string;
  gift_account_name: string;
  gift_account_number: string | number;
  slug?: string;
  events: Event[];
  participants: Participant[];
  gallery?: string[] | FileList | [];
  videos?: string[] | FileList | [];
  music?: string | File | null;
  status?: "paid" | "unpaid" | "completed" | null;
  theme_id: number | null;
  theme_category_id: number | null | number[];
  package_id: number | null;
  package?: Package;
  packages?: Package[];
  theme_category?: ThemeCategory;
  theme?: Theme | null;
  cover: null | string;
  seo: null | string;
  is_preview?: boolean;
  is_detail?: boolean;
  guests?: string[];
  wishes?: Review[];
  media?: MediaForm | null;
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
  id?: number;
  name: string;
  unlimited_revisions: boolean;
  custom_opening_closing: boolean;
  unlimited_guest_names: boolean;
  max_events: number;
  max_gallery_photos: number;
  max_videos: number;
  contact_social_media: boolean;
  background_sound: boolean;
  rsvp_and_greetings: boolean;
  custom_cover: boolean;
  digital_envelope: boolean;
  google_maps_integration: boolean;
  add_to_calendar: boolean;
  price: number;
  discount: number;
  countdown: boolean;
  created_at?: string;
  updated_at?: string;
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
  client_slug: string;
  theme_name: string;
  theme_category: string;
  theme_phone_thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  password?: string;
}
export interface ThemeCategory {
  id: number;
  slug: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ClientForm {
  id?: number;
  client_id?: number;
  image_link: string;
  video_link: string;
  music_title: string;
  created_at?: string;
  updated_at?: string;
}

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export type Status = "unpaid" | "paid" | "completed";

export interface SEO {
  url: string;
  seo_image: string;
  page_title: string;
  description: string;
  theme_name: string;
  name: string;
}

export interface ThemeUsage extends Theme {
  usage_count: number;
  client_slug: string;
  testimonials?: Testimonials[];
}

export type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export interface Order {
  id?: number;
  order_id: string;
  client_id: number;
  name: string;
  phone: string | number;
  theme_id: number;
  package_id: number;
  price: number;
  discount: number;
  admin_fee: number;
  created_at?: string;
  updated_at?: string;
  theme?: Theme;
  package?: Package;
  client?: Client;
}

export interface MediaForm {
  client_id?: string;
  music_title?: string;
  video_link?: string;
  image_link?: string;
  created_at?: string;
  updated_at?: string;
}
