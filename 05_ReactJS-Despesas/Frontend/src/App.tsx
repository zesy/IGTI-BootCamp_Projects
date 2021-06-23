import { ChangeEvent, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { IExpense } from "./interfaces/interfaces";

import Footer from "./components/Footer";
import ExpenseTable from "./components/ExpenseTable";

import "./assets/styles/main.scss";
import { getExpenses } from "./services/HttpService";

function App() {
  const THE_MONTHS: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembto",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const [selectedMonth, setSelectedMonth] = useState<string>("1");
  const [selectedYear, setSelectedYear] = useState<string>("2020");
  const [expenses, setExpenses] = useState<IExpense[]>();
  const [totalExpense, setTotalExpense] = useState<number>();

  useEffect(() => {
    async function getTheExpenses() {
      try {
        const theDate: string = `${selectedYear}-${selectedMonth?.toString().padStart(2, "0")}`;
        const theExpenses: IExpense[] = await getExpenses(theDate);
        let total: number = 0;
        theExpenses.map((item) => (total = total + item.valor));
        setExpenses(theExpenses);
        setTotalExpense(total);
      } catch (error) {
        console.log(error.message);
      }
    }
    getTheExpenses();
  }, [selectedMonth, selectedYear]);

  //HANDLERS
  function handleMonthChange(evt: ChangeEvent<{ value: unknown }>) {
    setSelectedMonth(evt.target.value as string);
  }
  function handleYearChange(evt: ChangeEvent<{ value: unknown }>) {
    setSelectedYear(evt.target.value as string);
  }

  return (
    <>
      <div className="container flex">
        <Box component="div" flex="1">
          <FormControl>
            <InputLabel id="label-month">Mês</InputLabel>
            <Select
              className="input"
              labelId="label-month"
              id="select-month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {THE_MONTHS.map((month, i) => (
                <MenuItem key={month} value={i + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="label-year">Ano</InputLabel>
            <Select
              className="input"
              id="select-year"
              labelId="label-year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box component="div" className="mr txt-gray">
          <h3>
            Total Despesas: <span className="txt-black">R$ {totalExpense?.toFixed(2)}</span>
          </h3>
        </Box>
      </div>
      <ExpenseTable expenses={expenses} />
      <Footer isChallenge={false} moduleNum={3} moduleName="React II" date="jun/2021" />
    </>
  );
}

export default App;
