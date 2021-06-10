import Footer from "./components/Footer";
import Header from "./components/Header";
import Investment from "./components/Investment";
import { dataInvests } from "./data/dataInvests";

export default function App() {
  const VERSION = "1.1";
  const investments = dataInvests.investments;
  const reports = dataInvests.reports;

  return (
    <>
      <header>
        <Header version={VERSION}/>
      </header>

      <main>
        {investments.map(inv => {
          const invReports = reports.filter(rep => rep.investmentId === inv.id);

          return <Investment key={inv.id} descr={inv.description}>{invReports}</Investment>;
        })}
      </main>

      <footer>
        <Footer atvType="Atividade" module="2" moduleName="React I" date="jun/2021"/>
      </footer>
    </>
  );
}
