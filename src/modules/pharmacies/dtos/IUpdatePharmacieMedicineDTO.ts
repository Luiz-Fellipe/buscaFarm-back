interface IMedicine {
  medicine_id: string;
  price: number;
  amount: number;
}

export interface IUpdateMedicineDTO extends IMedicine {
  pharmacie_id: string;
}

export default interface IUpdatePharmacieMedicineDTO {
  medicines: IMedicine[];
}
