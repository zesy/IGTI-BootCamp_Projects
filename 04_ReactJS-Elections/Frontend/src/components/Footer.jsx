export default function Footer({
  isChallenge = false,
  moduleNum = 0,
  moduleName = "",
  date = "",
}) {
  const moduleClassName = "px-5 py-2";
  const atvType = isChallenge ? "Desafio" : "Atividade";

  return (
    <div className="bg-gray-800 text-white p-4 space-y-4 mt-10">
      <div className="flex flex-col pb-4 border-b border-gray-400">
        <div className="flex flex-row justify-center items-center">
          <a href="https://github.com/zesy">
            <img
              src="https://raw.githubusercontent.com/zesy/zesy/main/_some-imgs/GitHub-Mark-Light-32px.png"
              alt="github"
            />
          </a>
          <a href="https://github.com/zesy">
            <span className="font-semibold text-3xl">/zesy</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-2">
          <p className="text-sm">Desenvolvido como {atvType} para:</p>
        </div>

        <div className="flex flex-row items-center justify-center divide-x">
          <div className={moduleClassName}>
            <p className="font-semibold">BootCamp</p>
            <a href="https://www.igti.com.br" target="_blank" rel="noreferrer">
              <img
                src="https://raw.githubusercontent.com/zesy/zesy/main/_some-imgs/igti-logo.png"
                alt="github"
              />
            </a>
          </div>

          <div className={moduleClassName}>
            <p className="text-sm font-semibold">Desenvolvedor React</p>
            <p className="text-sm">
              Módulo {moduleNum} - {moduleName}
            </p>
            <p className="text-sm">
              <small>{date}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
