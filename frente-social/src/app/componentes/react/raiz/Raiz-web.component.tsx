import { createRoot } from 'react-dom/client';
//componente react
import Raiz from './Raiz';

class RaizWebComponent extends HTMLElement {
  //cria o elemento raiz que hospeda os componentes react
  private raiz?: ReturnType<typeof createRoot>;

  //#region propriedades
  // atributos do componente raiz
  static get observedAttributes() {
    return ['rotulo'];
  }
  //
  //#endregion

  //#region eventos
  //quando o elemento eh incorporado ao DOM
  connectedCallback() {
    //caso nao tenha o elemento raiz dos componentes react: cria
    if (!this.raiz) {
      this.raiz = createRoot(this);
      //renderiza a raiz na pagina
      this.renderizaComponente();
    }
  }

  //quando o componente for destruido
  disconnectedCallback() {
    this.raiz?.unmount();
  }

  //chamado a cada alteracao no elementos: atualizacao
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //valida renderizar componente novamente: caso de atualizacao
    if (oldValue !== newValue) {
      this.renderizaComponente();
    }
  }
  //
  //#endregion

  //#region metodos
  //
  private renderizaComponente() {
    //identifica as propriedades/atributos
    const rotulo = this.getAttribute('rotulo') || '';
    //renderiza o componente react no DOM
    this.raiz?.render(<Raiz
        rotulo={rotulo}
        noClique={(detalhes: any) => this.disparaEvento('noClique', detalhes)}
      />);
  }
  //

  private disparaEvento(tipoEvento: string, detail: any) {
    //dispara um evento customizado no web componente
    const event = new CustomEvent(tipoEvento, { detail });
    this.dispatchEvent(event);
  }
  //#endregion
}

//registra o elemento customizado com o nome de 'raiz-web'
customElements.define('raiz-web', RaizWebComponent);
