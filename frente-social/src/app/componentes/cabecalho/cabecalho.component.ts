import { Component, HostListener, Input } from '@angular/core';
import { ClsComumService } from '../../servicos/cls-comum.service';
import { ssLogado, ssUsuario } from '../../servicos/autenticacao/autenticacao.service'
import { tUsuario } from '../../tipos/comuns';

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  //region propriedades: entradas
  @Input() nomeUsuario: string = ''
  @Input() strIDBarra: string = ''
  @Input() IDSessaoMural: string = ''

  ehGrudado: boolean = false;
  //#endregion

  constructor(
    private ClsComum: ClsComumService
  ) {
    this.apresentacao()
  }

  //#region eventos
  onClickBotao(): void { this.deslogar() }
  onClickMural(evento: Event): void { this.aplicaScrollID(evento, this.IDSessaoMural) }

  //host
  @HostListener('window:scroll', [])
  onWindowScroll(): void { this.aplicaEstilo() }
  //#endregion

  //#region metodos
  apresentacao(): void {
  try {
    const usuario = JSON.parse(this.ClsComum.configuraArmazenamento('pegar', 'sessao', ssUsuario)) as tUsuario
    this.nomeUsuario = usuario.des_nome!
  } catch (error) {
    this.nomeUsuario = ''
  }
}

  deslogar(): void {
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssLogado, 'falso')
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssUsuario, JSON.stringify({}))

    this.ClsComum.navegar(['/login'])
  }

  aplicaEstilo(): void {
    //define o limiar de 100px para aplicar a classe 'sticky'
    this.ehGrudado = window.scrollY > 100;
  }

  aplicaScrollID(evento: Event, idSessao: string) {
    //desabilita o reload da pagina
    evento.preventDefault();
    evento.stopPropagation();

    //efetua o scroll ate a sessao
    document.getElementById(idSessao)   //retorno o elemento
      ?.scrollIntoView({
        //suaviza o scroll ate a sessao
        behavior: 'smooth'
      });
  }
  //#endregion
}
