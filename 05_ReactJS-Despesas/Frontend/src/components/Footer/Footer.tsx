import "./footer.scss";

type FooterProps = {
  isChallenge: boolean;
  moduleNum: number;
  moduleName: string;
  date: string;
};

export default function Footer(props: FooterProps) {
  const atvType = props.isChallenge ? "Desafio" : "Atividade";

  return (
    <div id="div-footer" className="flex-column all-center">
      <div className="flex-row all-center space-x pb border-bottom">
        <a href="https://github.com/zesy" className="flex-row all-center">
          <img
            src="https://raw.githubusercontent.com/zesy/zesy/main/_some-imgs/GitHub-Mark-Light-32px.png"
            alt="github"
          />
          /zesy
        </a>
        <a href="https://www.linkedin.com/in/wesley-andrade1994/" className="flex-row all-center">
          <img src="https://raw.githubusercontent.com/zesy/zesy/main/_some-imgs/In-White-34px.png" alt="linkedin" />
          /wesley
        </a>
      </div>

      <div className="flex-col all-center more-info">
        <div className="mb-1">
          <p>Desenvolvido como {atvType} para:</p>
        </div>

        <div className="flex-row all-center space-x">
          <div className="flex-col all-center border-right">
            <p className="font-semibold">BootCamp</p>
            <a href="https://www.igti.com.br" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/zesy/zesy/main/_some-imgs/igti-logo.png" alt="github" />
            </a>
          </div>

          <div className="flex-col all-center">
            <p className="text-sm font-semibold">Desenvolvedor React</p>
            <p className="text-sm">
              Módulo {props.moduleNum} - {props.moduleName}
            </p>
            <p className="text-sm">
              <small>{props.date}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
