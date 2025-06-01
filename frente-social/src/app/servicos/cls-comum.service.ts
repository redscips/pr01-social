import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClsComumService {

  constructor(
    private roteador: Router,
    @Inject(PLATFORM_ID) private plataforma_id: any
  ) { }

  //#region metodos
  /**
   * Manipula a memoria da aplicacao. Local de armazenamento.
   * @param tipoExecucao Acao sendo executada: pegar(GET) ou definir(SET).
   * @param nomeVariavel Nome da variavel no armazenamento escolhido.
   * @param valorVariavel Valor que sera salvo: Padrao - String vazia.
   * @param LocalArmazenamento Local onde sera salvo: Padrao - Sessao.
   * @returns
   */
  configuraArmazenamento(tipoExecucao: 'pegar' | 'definir', LocalArmazenamento: 'local' | 'sessao', nomeVariavel: string, valorVariavel: any = ''): any {
    //var retorno
    let valor: any = ''

    //valida se esta com o ambiente do navegador disponivel
    //nome da variavel no armazenamento eh obrigatorio
    if (nomeVariavel.length > 0 && isPlatformBrowser(this.plataforma_id)) {

      switch (tipoExecucao) {
        case 'definir':
          LocalArmazenamento === 'local' ? localStorage.setItem(nomeVariavel, valorVariavel) : sessionStorage.setItem(nomeVariavel, valorVariavel)
          valor = valorVariavel
          break
        default:
          //pegar
          valor =  LocalArmazenamento === 'local' ? localStorage.getItem(nomeVariavel) : sessionStorage.getItem(nomeVariavel)
      }
    }

    return valor
  }

  /**
   * Executa a navegacao p/ a rota informada:
   *
   * Utiliza o servico de roteamento (Router) padrao
   *
   * @param rotas - Um vetor contendo as rotas a serem navegadas, por exemplo, ['/url_rota'].
   * @returns Uma promessa (Promise) que resolve p/ 'verdadeiro' se a navegacao for bem-sucedida ou 'falso' caso haja algum erro.
   */
  async navegar(rotas: string[]): Promise<boolean> {
    //navega p/ rota passada
    return await this.roteador.navigate(rotas)
      .then(res => res)     //caso sucesso
      .catch((erros) => {   //caso falha
        this.trataExcecao(erros)
        return false
      })
  }

  /**
   * Executa o tratamento de excecoes geradas na aplicacao.
   * @param erros Os erros a serem reportados.
   * @param flgAlert Exibe os erros como um pop-up alerta (opcional).
   */
  trataExcecao<T>(erros: T, flgAlert: boolean = false): void {
      //exibe o erro como pop-up / exibe o erro no console
      flgAlert ? alert(erros) : console.log(erros)
    }
  //#endregion
}
