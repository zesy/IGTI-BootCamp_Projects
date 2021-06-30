import { IExpense, IUser } from "../interfaces/interfaces";

const BASE_URL = "http://localhost:3001";

function handleResponses(resp: Response) {
  if (resp.ok) return resp.json();
  else throw new Error(resp.statusText);
}
export async function getExpenses(date: string): Promise<IExpense[]> {
  return await fetch(`${BASE_URL}/despesas?mes=${date}&_sort=dia`, { credentials: "include" }).then(handleResponses);
}
export async function getLoggedUser(): Promise<IUser> {
  return await fetch(`${BASE_URL}/sessao/usuario`, { credentials: "include" }).then(handleResponses);
}

export async function doLogin(email: string, senha: string): Promise<IUser> {
  return await fetch(`${BASE_URL}/sessao/criar`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponses);
}

export async function doLogout() {
  return await fetch(`${BASE_URL}/sessao/finalizar`, { credentials: "include", method: "POST" }).then(handleResponses);
}
