export default function DashHeader({ children }) {
  //
  const name = children.name ? children.name : "";
  const votingPopulation = children.votingPopulation
    ? children.votingPopulation
    : "0";
  const absence = children.absence ? children.absence : "0";
  const presence = children.presence ? children.presence : "0";

  return (
    <div className="text-center pb-5">
      <h4 className="font-semibold py-2">Eleições em {name}</h4>
      <div className="flex flex-row no-wrap text-sm items-center justify-center space-x-5 md:space-x-10 lg:space-x-20">
        <p>
          <span className="font-semibold">Total de Eleitores: </span>
          {votingPopulation.toLocaleString("pt-br")}
        </p>
        <p>
          <span className="font-semibold">Abstenção: </span>
          {absence.toLocaleString("pt-br")}
        </p>
        <p>
          <span className="font-semibold">Comparecimento: </span>
          {presence.toLocaleString("pt-br")}
        </p>
      </div>
    </div>
  );
}
