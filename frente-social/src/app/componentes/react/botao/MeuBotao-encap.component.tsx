import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import ReactDOM from 'react-dom/client';
// componentes: react
import MeuBotao from './MeuBotao';

@Component({
  selector: 'meu-botao-encap',
  template: `<div #container></div>`
})
export class MeuBotaoEncapComponent implements AfterViewInit, OnDestroy {
  //#region propriedades: inputs de acordo com propriedades do componente react
  @Input() rotulo!: string;
  //conteudo que sera injetado no template angular: pela variavel local do template
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  //#endregion

  private raiz?: ReactDOM.Root;

  //construto: injeta o id da plataforma no angular: local onde app esta rodando
  constructor(@Inject(PLATFORM_ID) private plataformaID: Object) {}

  //#region metodos
  renderizaComponenteReact() {
    if (isPlatformBrowser(this.plataformaID)) {
      this.raiz = ReactDOM.createRoot(this.container.nativeElement);
      if (this.raiz) {
        this.raiz.render(<MeuBotao rotulo={this.rotulo} />);
      }
    }
  }

  destroiComponenteReact() {
    if (this.raiz) {
      this.raiz.unmount();
    }
  }
  //#endregion

  //#region eventos
  //interface
  ngAfterViewInit(): void { this.renderizaComponenteReact() }
  ngOnDestroy(): void { this.destroiComponenteReact() }
  //#endregion
}
