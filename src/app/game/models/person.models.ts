export interface BasicPersonProperties {
  uid: string;
  name: string;
  url: string;
}

export interface Person extends BasicPersonProperties {
  created: string;
  edited: string;
  films: string[];
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}

export type ComparableProperty = 'mass' | 'height';
