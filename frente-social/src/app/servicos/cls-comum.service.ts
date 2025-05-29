import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClsComumService {

  constructor(
    private roteador: Router
  ) { }

  //#region metodos
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
