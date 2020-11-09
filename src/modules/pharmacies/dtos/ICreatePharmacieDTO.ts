interface IMedicine {
  medicine_id: string;
  price: number;
  amount: number;
}

export default interface ICreatePharmacieDTO {
  company_name: string;
  cnpj: string;
  city: string;
  uf: string;
  neighborhood: string;
  street: string;
  adress_number?: string;
  zip_code: string;
  complement: string;
  latitude: number;
  longitude: number;
  phone?: string;
  medicines: IMedicine[];
}
