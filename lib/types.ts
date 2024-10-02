export interface Blobs {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export interface Brides {
  male: {
    name: string;
    nickname: string;
    address: string;
    child: string;
    imageURL: string;
    parents: {
      male: string;
      female: string;
    };
  };
  female: {
    name: string;
    nickname: string;
    address: string;
    child: string;
    imageURL: string;
    parents: {
      male: string;
      female: string;
    };
  };
}

export interface Informations {
  date: string;
  time: string;
  location: string;
  locationLink: string;
  locationFull: string;
  prefix: string;
}

export interface Client {
  id: number;
  slug: string;
  name: string;
  male_name: string;
  male_nickname: string;
  male_address: string;
  male_child: string;
  male_parents_male: string;
  male_parents_female: string;
  female_name: string;
  female_nickname: string;
  female_address: string;
  female_child: string;
  female_parents_male: string;
  female_parents_female: string;
  date: string;
  time: string;
  location: string;
  location_link: string;
  location_full: string;
  theme_id: number;
  images: Blobs[] | [];
  bride_images: Blobs[] | [];
}

export interface Theme {
  id: number;
  name: string;
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
  gender: "male" | "female";
}

export interface ClientV2 {
  id?: number;
  name: string;
  slug?: string;
  address: string;
  address_url: string;
  address_full: string;
  participants: Participant[];
  date: string;
  time: string;
  theme_id: number | null;
  theme?: Theme | null;
}
