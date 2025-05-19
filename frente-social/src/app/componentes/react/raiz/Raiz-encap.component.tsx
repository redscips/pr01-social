import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import ReactDOM from 'react-dom/client';
// componentes: react
import Raiz from './Raiz';

@Component({
  selector: 'raiz-encap',
  templateUrl: './Raiz-encap.component.html'
})
export class RaizEncapComponent implements AfterViewInit, OnDestroy {
  //#region propriedades: inputs de acordo com propriedades do componente react
  @Input() rotulo!: string;
  //conteudo que sera injetado no template angular: pela variavel local do template
  @ViewChild('react', { static: true }) react!: ElementRef<HTMLElement>;
  //#endregion

  private raiz?: ReactDOM.Root;

  //construto: injeta o id da plataforma no angular: local onde app esta rodando
  constructor(@Inject(PLATFORM_ID) private plataformaID: Object) {}

  //#region metodos
  renderizaComponenteReact() {
    if (isPlatformBrowser(this.plataformaID)) {
      this.raiz = ReactDOM.createRoot(this.react.nativeElement);
      if (this.raiz) {
        this.raiz.render(<Raiz rotulo={this.rotulo} />);
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
