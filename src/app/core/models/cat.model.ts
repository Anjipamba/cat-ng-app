export interface Cat {
  id: string;
  name: string;
  age: string;
  description: string;
}

export type CatCreateDto = Omit<Cat, 'id'>;

export interface CatApiEntity {
  id: string;
  info: Omit<Cat, 'id'>;
}

export interface CatApiResponse {
  status_code: number;
  data: CatApiEntity[];
}
