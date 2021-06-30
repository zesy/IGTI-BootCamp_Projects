import { ReactElement } from "react";
import { ICategories } from "../interfaces/interfaces";

export function generateCategoriesTable(categories: ICategories[] | undefined): ReactElement[] {
  let theCells: ReactElement[];

  if (categories && categories.length >= 1) {
    theCells = categories.map((item, i) => {
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
  return theCells;
}
