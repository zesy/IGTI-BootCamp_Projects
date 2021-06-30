import React, { useMemo } from "react";
import { generateExpensesTable } from "../Helpers/generateExpensesTable";
import { ExpenseTableProps } from "../interfaces/interfaces";

export const ExpenseTable = React.memo((props: ExpenseTableProps) => {
  //
  const tableCells = useMemo(() => {
    return generateExpensesTable(props.expenses);
  }, [props.expenses]);

  return (
    <div className="mt-32">
      <table>
        <thead>
          <tr>
            <td align="left">Despesa</td>
            <td align="left">Categoria</td>
            <td align="center">Dia</td>
            <td align="right">Valor&nbsp;(R$)</td>
          </tr>
        </thead>
        <tbody>{tableCells}</tbody>
      </table>
    </div>
  );
});
