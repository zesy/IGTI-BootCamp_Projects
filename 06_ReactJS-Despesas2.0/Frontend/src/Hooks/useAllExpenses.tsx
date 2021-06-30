import { useEffect, useState } from "react";
import { IAllExpenses, ICategories, IExpense } from "../interfaces/interfaces";
import { getExpenses } from "../services/HttpService";

export function useAllExpenses(year: string, month: string): IAllExpenses {
  const [allExpenses, setExpenses] = useState<IExpense[]>();
  const [totalExpense, setTotalExpense] = useState<number>();

  useEffect(() => {
    async function getTheExpenses() {
      try {
        const theDate: string = `${year}-${month.toString().padStart(2, "0")}`;
        const theExpenses: IExpense[] = await getExpenses(theDate);
        let total: number = 0;
        for (const expense of theExpenses) {
          total += expense.valor;
        }

        setExpenses(theExpenses);
        setTotalExpense(total);
      } catch (error) {
        console.log(error.message);
      }
    }
    getTheExpenses();
  }, [year, month]);

  const totalCategories = allExpenses?.reduce((total: ICategories[], current) => {
    let newCat = true;

    for (let item of total) {
      if (item.total)
        if (item.categoria === current.categoria) {
          item.total += current.valor;
          newCat = false;
        }
    }

    if (newCat) total.push({ categoria: current.categoria, total: current.valor });
    return total;
  }, [] as ICategories[]);
  console.log(totalCategories);

  return {
    allExpenses,
    totalExpense,
    totalCategories,
  };
}
