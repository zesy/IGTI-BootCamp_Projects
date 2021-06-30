import { ReactElement } from "react";

import { ExpenseTableProps } from "../interfaces/interfaces";

export default function ExpenseTable(props: ExpenseTableProps) {
  //
  let theCells: ReactElement[];
  if (props.expenses && props.expenses.length >= 1) {
    theCells = props.expenses.map((item, i) => {
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
        <tbody>{theCells}</tbody>
      </table>
    </div>
  );
}
