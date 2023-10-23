export interface GeneralPersonData {
  name: string;
  url: string;
}

export interface BasicPerson extends GeneralPersonData{
  uid: string;
}

export interface Person extends GeneralPersonData {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export type ComparableProperty = 'mass' | 'height';
