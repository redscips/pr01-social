//importacoes: css in ts
import * as E from './Estilos'

interface RaizProps {
  rotulo: string;
}

//componente
const Raiz = ({ rotulo }: RaizProps) => {
  return <E.default>{rotulo}</E.default>;
};

//-----------------
export default Raiz;
