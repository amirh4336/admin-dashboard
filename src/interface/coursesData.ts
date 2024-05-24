export interface ICafe {
  _id: string;
  name: string;
  description: string;
  address: number;
  phone: string;
  capacity: string;
  image: string;
  menu: IFood[];
  owner: string;
}

export interface  IFood {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  cafe: string
}

export interface ICategory {
  totalRecords: number;
  data: {
    id: number;
    name: string;
  }[];
}
