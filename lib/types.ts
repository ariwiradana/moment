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
