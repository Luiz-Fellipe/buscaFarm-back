interface IMedicine {
  medicine_id: string;
  price: number;
  amount: number;
}

export default interface ICreateBudgetReqDTO {
  user_id: string;
  pharmacie_id: string;
  medicines: IMedicine[];
}
