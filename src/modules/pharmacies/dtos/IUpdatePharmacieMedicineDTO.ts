interface IMedicine {
  medicine_id: string;
  price: string | number;
  amount: string | number;
}

export default interface IUpdatePharmacieMedicineDTO {
  medicines: IMedicine[];
}
