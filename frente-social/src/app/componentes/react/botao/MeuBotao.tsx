//importacoes: css in ts
import * as E from './estilos'

interface MeuBotaoProps {
  rotulo: string;
}

//componente
const MeuBotao = ({ rotulo }: MeuBotaoProps) => {
  return <E.default>{rotulo}</E.default>;
};

//
export default MeuBotao;
