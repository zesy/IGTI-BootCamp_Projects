import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import PageMain from "./pages/PageMain";
import PageLogin from "./pages/PageLogin";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { getLoggedUser } from "./services/HttpService";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/interfaces";

function App() {
  const [logged, setLogged] = useState<IUser | null>(null);

  useEffect(() => {
    getLoggedUser().then(setLogged, onLogout);
  }, []);

  function onLogin(user: IUser) {
    setLogged(user);
  }
  function onLogout() {
    setLogged(null);
  }

  if (logged) {
    return (
      <>
        <Router>
          <Route path="/login">
            <Redirect to="/despesas" />
          </Route>
          <Route path="/despesas">
            <Header user={logged} onLogout={onLogout} />
            <PageMain />
            <Footer date="Jun/2021" isChallenge moduleName="React II" moduleNum={3} />
          </Route>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
        </Router>
      </>
    );
  } else {
    return (
      <Router>
        <Route path="/login">
          <PageLogin onLogin={onLogin} />
          <Footer date="Jun/2021" isChallenge moduleName="React II" moduleNum={3} />
        </Route>
        <Route path="/despesas">
          <Redirect to="/login" />
        </Route>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
      </Router>
    );
  }
}

export default App;
