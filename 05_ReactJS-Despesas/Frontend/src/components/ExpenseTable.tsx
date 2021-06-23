import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Box } from "@material-ui/core";
import { ReactElement } from "react";

import { ExpenseTableProps } from "../interfaces/interfaces";

export default function ExpenseTable(props: ExpenseTableProps) {
  let theCells: ReactElement[];
  if (props.expenses && props.expenses.length >= 1) {
    theCells = props.expenses.map((item) => {
      return (
        <TableRow key={item.id}>
          <TableCell align="left">{item.descricao}</TableCell>
          <TableCell align="left">{item.categoria}</TableCell>
          <TableCell align="center">{item.dia}</TableCell>
          <TableCell align="right">R$ {item.valor}</TableCell>
        </TableRow>
      );
    });
  } else
    theCells = [
      <TableRow>
        <TableCell align="left">Não há dados</TableCell>
      </TableRow>,
    ];

  return (
    <Box component="div" flex="1">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Despesa</TableCell>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="center">Dia</TableCell>
              <TableCell align="right">Valor&nbsp;(R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{theCells}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
