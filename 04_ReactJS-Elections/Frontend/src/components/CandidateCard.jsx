export default function CandidateCard({
  percent = 0,
  votes = "0",
  name = "",
  done = false,
}) {
  //
  const eleito = done ? "Eleito" : "Não Eleito";
  const colorEleito = done ? "text-green-400" : "text-red-300";

  return (
    <div className="border border-gray-300 rounded-sm w-48 h-36 shadow-md py-4 px-2 mx-2 my-2">
      <div className="flex flex-row">
        <div className="w-16 h-16">
          <img
            className="rounded-full"
            src={`./assets/img/${name.toLowerCase()}.png`}
            alt={name}
          />
        </div>
        <div className="w-auto h-16 items-center text-center pl-3">
          <h3 className={`font-semibold ${colorEleito}`}>{percent}%</h3>
          <p className="text-sm">{votes.toLocaleString("pt-br")} votes</p>
        </div>
      </div>
      <div className="text-center pt-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className={`text-sm font-semibold ${colorEleito}`}>{eleito}</p>
      </div>
    </div>
  );
}
