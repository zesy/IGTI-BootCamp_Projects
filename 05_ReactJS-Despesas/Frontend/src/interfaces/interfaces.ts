import { ReactNode } from "react";

export interface IExpense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: number;
}

export interface ExpenseTableProps {
  expenses: IExpense[] | undefined;
  children?: ReactNode;
}
