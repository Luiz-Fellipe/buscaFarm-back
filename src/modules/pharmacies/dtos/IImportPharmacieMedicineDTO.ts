interface IMedicine {
  name: string;
  manufacturer: string;
  price: Number;
  amount: Number;
}

export default interface IImportPharmacieMedicineDTO {
  pharmacieId: string;
  medicines: Record<string, string>[];
}
