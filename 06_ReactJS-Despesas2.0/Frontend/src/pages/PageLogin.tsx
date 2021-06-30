import { FormEvent } from "react";
import { useState } from "react";
import "../assets/styles/main.scss";
import { IUser } from "../interfaces/interfaces";
import { doLogin } from "../services/HttpService";

interface PageLoginProps {
  onLogin: (user: IUser) => void;
}

export default function PageLogin(props: PageLoginProps) {
  //
  const [email, setEmail] = useState<string>("usuario@email.com");
  const [pass, setPass] = useState<string>("1234");
  const [loginErro, setLoginErro] = useState<boolean>(false);

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    doLogin(email, pass).then(
      (user) => {
        props.onLogin(user);
      },
      (e) => {
        setLoginErro(true);
      }
    );
  }

  return (
    <div>
      <div className="flex all-center">
        <h1>Faça seu Login:</h1>
      </div>
      <div className="flex all-center">
        <form onSubmit={handleSubmit}>
          <div className="col form">
            <label htmlFor="input-user">E-mail</label>
            <input
              type="text"
              name="input-user"
              id="input-user"
              value={email}
              onChange={(evt) => {
                setEmail(evt.target.value as string);
              }}
            />
          </div>
          <div className="col form">
            <label htmlFor="input-pass">Senha</label>
            <input
              type="password"
              name="input-pass"
              value={pass}
              onChange={(evt) => {
                setPass(evt.target.value as string);
              }}
            />
          </div>
          <div className="col mt-32">
            <button className="btn-login">Login</button>
          </div>
          {loginErro && <div className="erroLogin">Email ou senha incorreto!</div>}
        </form>
      </div>
    </div>
  );
}
