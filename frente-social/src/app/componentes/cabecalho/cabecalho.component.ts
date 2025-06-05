import { Component, HostListener, Input } from '@angular/core';
import { ClsComumService } from '../../servicos/cls-comum.service';
import { ssLogado, ssUsuario } from '../../servicos/autenticacao/autenticacao.service'

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  //region propriedades: entradas
  @Input() nomeUsuario: string = ''

  ehGrudado: boolean = false;
  //#endregion

  constructor(
    private ClsComum: ClsComumService
  ) {}

  //#region eventos
  onClickBotao(): void { this.deslogar() }

  //host
  @HostListener('window:scroll', [])
  onWindowScroll(): void { this.aplicaEstilo() }
  //#endregion

  //#region metodos
  deslogar(): void {
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssLogado, 'falso')
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssUsuario, JSON.stringify({}))

    this.ClsComum.navegar(['/login'])
  }

  aplicaEstilo(): void {
    //define o limiar de 100px para aplicar a classe 'sticky'
    this.ehGrudado = window.scrollY > 100;
  }
  //#endregion
}
