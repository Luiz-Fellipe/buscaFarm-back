interface IMedicine {
  medicine_id: string;
  price: number;
  amount: number;
}

export default interface ICreateBudgetDTO {
  user_id: string;
  pharmacie_id: string;
  value: number;
  medicines: IMedicine[];
}
