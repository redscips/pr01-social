import { AfterViewInit, Component } from '@angular/core';
import { CabecalhoComponent } from '../../cabecalho/cabecalho.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { criarAnimacao } from '../../../animacoes/animacoes';
import { ListaPostsComponent } from '../../lista-posts/lista-posts.component';
import { ClsComumService } from '../../../servicos/cls-comum.service';

@Component({
  selector: 'app-inicial',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, ListaPostsComponent],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss',
  animations: [criarAnimacao('A', 'aparecer', ':enter')]
})
export class InicialComponent implements AfterViewInit {
  //#region propriedade
  idBarra: string = 'id-barra-lateral'
  IDNavbar: string = ''

  flg: boolean = false
  //#endregion

  constructor (
    private clsComum: ClsComumService
  ) {}

  //#region eventos
  retornaID(id: string): void { this.IDNavbar = id }
  ngAfterViewInit(): void { this.preparaForm() }
  //#endregion

  //#region metodos
  preparaForm(): void {
    //valida se o codigo esta neste momento esta rodando no navegador e nao no servidor
    if (this.clsComum.validaDOM()) {
      //assume que o bundle do bootstrap ja esta disponível globalmente: carrega funcoes bootstrao
      const bs = (window as any).bootstrap as typeof import('bootstrap');
      if (bs) {

        //retorna script
        const scroll = document.querySelector('[data-bs-spy="scroll"]')

        const intancia = bs.ScrollSpy.getOrCreateInstance(scroll!, {
          target: '#' + this.IDNavbar
        });
        //efetua refresh do comportamento do bootstrap
        intancia.refresh();
      }
    }
  }
  //#endregion
}
