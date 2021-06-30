import React, { useCallback } from "react";
import { apiDoLogout } from "../services/HttpService";
import { IUser } from "../interfaces/interfaces";
import "../assets/styles/main.scss";

interface HeaderProps {
  user: IUser;
  onLogout: () => void;
}
export const Header = React.memo((props: HeaderProps) => {
  const { user, onLogout } = props;

  const logout = useCallback(() => {
    onLogout();
    apiDoLogout();
  }, [onLogout]);

  return (
    <div className="flex space-between b-bottom">
      <h1>Despesas</h1>
      <div className="flex all-center gap32">
        <p>
          <strong className="txt-gray">User: </strong>
          {user.nome}
        </p>
        <button className="btn-logout" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
});
