import { ChangeEvent, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAllExpenses } from "../Hooks/useAllExpenses";

import ExpenseTable from "../components/ExpenseTable";
import CategoriesTable from "../components/CategoriesTable";

import "../assets/styles/main.scss";

export default function PageMain() {
  //
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
  const [selectedYear, setSelectedYear] = useState<string>("2021");

  const { allExpenses, totalExpense, totalCategories } = useAllExpenses(selectedYear, selectedMonth);

  //HANDLERS
  function handleMonthChange(evt: ChangeEvent<{ value: unknown }>) {
    setSelectedMonth(evt.target.value as string);
  }
  function handleYearChange(evt: ChangeEvent<{ value: unknown }>) {
    setSelectedYear(evt.target.value as string);
  }

  return (
    <>
      <div className="container flex space-between">
        <div className="flex all-center">
          <label htmlFor="select-month">Mês:</label>
          <select className="input" id="select-month" value={selectedMonth} onChange={handleMonthChange}>
            {THE_MONTHS.map((month, i) => (
              <option key={month} value={i + 1}>
                {month}
              </option>
            ))}
          </select>

          <label htmlFor="select-year">Ano:</label>
          <select className="input" id="select-year" value={selectedYear} onChange={handleYearChange}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="mr txt-gray">
          <h3>
            Total Despesas: <span className="txt-black">R$ {totalExpense?.toFixed(2)}</span>
          </h3>
        </div>
      </div>
      <div>
        <Tabs className="w-full">
          <TabList className="flex all-center b-bottom no-space-x gap32">
            <Tab>Categorias</Tab>
            <Tab>Despesas</Tab>
          </TabList>

          <TabPanel>
            <CategoriesTable categories={totalCategories} />
          </TabPanel>
          <TabPanel>
            <ExpenseTable expenses={allExpenses} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
