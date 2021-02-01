export default interface IUpdatePharmacieDTO {
  pharmacieId: string;
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
}
