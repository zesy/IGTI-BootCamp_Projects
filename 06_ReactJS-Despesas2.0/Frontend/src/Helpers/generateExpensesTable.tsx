import { ReactElement } from "react";
import { IExpense } from "../interfaces/interfaces";

export function generateExpensesTable(expenses: IExpense[] | undefined): ReactElement[] {
  let theCells: ReactElement[];

  if (expenses && expenses.length >= 1) {
    theCells = expenses.map((item, i) => {
      return (
        <tr key={i}>
          <td align="left">{item.descricao}</td>
          <td align="left">{item.categoria}</td>
          <td align="center">{item.dia}</td>
          <td align="right">R$ {item.valor}</td>
        </tr>
      );
    });
  } else {
    theCells = [
      <tr key={-1}>
        <td align="left">Não há dados</td>
      </tr>,
    ];
  }

  return theCells;
}
