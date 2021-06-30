import React, { useMemo } from "react";
import { generateCategoriesTable } from "../Helpers/generateCategoriesTable";
import { CategoriesTableProps } from "../interfaces/interfaces";

export const CategoriesTable = React.memo((props: CategoriesTableProps) => {
  //
  const tableCells = useMemo(() => {
    return generateCategoriesTable(props.categories);
  }, [props.categories]);

  return (
    <div className="mt-32">
      <table>
        <thead>
          <tr>
            <td align="left">Categoria</td>
            <td align="right">Valor&nbsp;(R$)</td>
          </tr>
        </thead>
        <tbody>{tableCells}</tbody>
      </table>
    </div>
  );
});
