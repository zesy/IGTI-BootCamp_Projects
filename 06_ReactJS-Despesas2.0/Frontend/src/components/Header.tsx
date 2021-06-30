import "../assets/styles/main.scss";
import { IUser } from "../interfaces/interfaces";
import { doLogout } from "../services/HttpService";

interface HeaderProps {
  user: IUser;
  onLogout: () => void;
}
export default function Header(props: HeaderProps) {
  function logout() {
    props.onLogout();
    doLogout();
  }
  return (
    <div className="flex space-between b-bottom">
      <h1>Despesas</h1>
      <div className="flex all-center">
        <p>User: {props.user.nome}</p>
        <button className="btn-logout" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}
