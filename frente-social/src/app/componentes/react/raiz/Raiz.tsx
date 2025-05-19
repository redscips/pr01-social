//importacoes: css in ts
import * as E from './Estilos'

interface RaizProps {
  rotulo: string;
  // Torne o onNotify opcional, caso não seja necessário em todos os cenários
  noClique?: (detalhes: any) => void;
}

//componente
const Raiz = ({ rotulo, noClique }: RaizProps) => {
  //#region eventos
  //
  const trabalhaClick = (evento: any) => {
    noClique? noClique({ mensagem: evento + ' Clique detectado no React' }) : () => {};
  };
  //
  //#endregion

  return (<E.default onClick={trabalhaClick}>{rotulo}</E.default>);
};

//-----------------
export default Raiz;
