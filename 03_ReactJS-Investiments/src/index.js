/**
 * Importação do módulo principal do React.
 * A partir da versão 17.x, não é mais obrigatório
 * para criar componentes. Entretanto, a importação
 * é necessária neste arquivo pois "React" é de fato
 * utilizado com StrictMode
 */
import React from 'react';

/**
 * Este é o módulo do React que renderiza HTML.
 * Em mobile temos, por exemplo, o react-native
 */
import ReactDOM from 'react-dom';

/**
 * Importação do componente principal
 * da aplicação
 */
import App from './App';

/**
 * Este arquivo pode ser considerado o CSS
 * Global do App. Perceba a peculiaridade da
 * sintaxe de importação
 */
import './index.css';

/**
 * <React.StrictMode> é utilizado na fase
 * de "Desenvolvimento" gerando mais mensagens
 * de erro para apoiar o Desenvolvedor. Por isso
 * é comum ocorrerem renderizações "a mais".
 * Ele é retirado automaticamente em produção.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
