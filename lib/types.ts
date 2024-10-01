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

export interface Theme {
  id: number;
  name: string;
}

export interface Client {
  id: number;
  slug: string;
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
