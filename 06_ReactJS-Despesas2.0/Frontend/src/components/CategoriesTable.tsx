import { ReactElement } from "react";

import { CategoriesTableProps } from "../interfaces/interfaces";

export default function CategoriesTableTable(props: CategoriesTableProps) {
  //
  let theCells: ReactElement[];
  if (props.categories && props.categories.length >= 1) {
    theCells = props.categories.map((item, i) => {
      return (
        <tr key={i}>
          <td align="left">{item.categoria}</td>
          <td align="right">R$ {item.total?.toFixed(2)}</td>
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
            <td align="left">Categoria</td>
            <td align="right">Valor&nbsp;(R$)</td>
          </tr>
        </thead>
        <tbody>{theCells}</tbody>
      </table>
    </div>
  );
}
