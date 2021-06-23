import axios from "axios";
import { IExpense } from "../interfaces/interfaces";
const doAxios = axios.create({ baseURL: "http://localhost:3001" });

export async function getExpenses(date: string): Promise<IExpense[]> {
  const { data } = await doAxios.get(`/despesas?mes=${date}&_sort=dia`);
  // console.log(data);
  return data;
}
