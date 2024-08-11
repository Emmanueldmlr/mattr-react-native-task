export interface User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  bio: string;
  score: number;
  location: LocationType;
  dob: string;
  photos: PhotoType[];
  interests: InterestsType[];
}

type LocationType = {
  city: string;
  country: string;
};

export type PhotoType = {
  id: number;
  path: string;
};

export type InterestsType = {
  id: number;
  name: string;
};
