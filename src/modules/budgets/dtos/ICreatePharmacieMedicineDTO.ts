interface Imedicine {
  medicine_id: string;
  price: number;
  amount: number;
}

export default interface ICreatePharmacieMedicineDTO {
  pharmacie_id: string;
  medicines: Imedicine[];
}
