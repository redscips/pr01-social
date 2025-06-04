import { Component, Input } from '@angular/core';
import { ClsComumService } from '../../servicos/cls-comum.service';
import { ssLogado, ssUsuario } from '../../servicos/autenticacao/autenticacao.service'

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  @Input() nomeUsuario: string = ''

  constructor(
    private ClsComum: ClsComumService
  ) {}

  //#region eventos
  onClickBotao(): void { this.deslogar() }
  //#endregion

  //#region metodos
  deslogar(): void {
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssLogado, 'falso')
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssUsuario, JSON.stringify({}))

    this.ClsComum.navegar(['/login'])
  }
  //#endregion
}
