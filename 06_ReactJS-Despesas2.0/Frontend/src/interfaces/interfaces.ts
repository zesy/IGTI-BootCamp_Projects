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

export interface CategoriesTableProps {
  categories: ICategories[] | undefined;
  children?: ReactNode;
}

export interface IUser {
  nome: string;
  email: string;
}

export interface ICategories {
  categoria: string | undefined;
  total: number | undefined;
}

export interface IAllExpenses {
  allExpenses: IExpense[] | undefined;
  totalExpense: number | undefined;
  totalCategories?: ICategories[];
}
