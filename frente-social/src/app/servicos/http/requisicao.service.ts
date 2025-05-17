import { Injectable } from '@angular/core';
import { catchError, defer, map, Observable, throwError } from 'rxjs';
import { Dict } from 'styled-components/dist/types';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  constructor() { }

  //#region metodos
  /**
   * Realiza uma requisicao HTTP com Fetch API.
   * @type<T> Um tipo generico
   * @param strURL URL da requisicao
   * @param requisicao Configuracoes: metodo, cabecalhos e corpo
   * @returns Um observavel do tipo <T>
   */
  execRequisicao<T>(strURL: string, metodo: 'GET' | 'POST', parametrosCab: Dict<any> = {}, strTipoConteudo: string = 'application/json', parametrosCorpo: Dict<any> = {}, flgCorpoURL: boolean = false): Observable<T> {
    //adiciona tipo de conteudo no cabecalho
    parametrosCab['Content-Type'] = strTipoConteudo
    //configura requisicao
    const requisicao: RequestInit = {
      method: metodo,
      headers: parametrosCab
    }
    //validacao
    if (parametrosCorpo) {
      //cria objeto que usa parametros na URL
      const parametros = metodo === 'GET' || flgCorpoURL? this.converteParametrosURL(parametrosCorpo) : ''
      //--------------
      switch (metodo) {
        case 'POST':
          //verificacao
          if (flgCorpoURL) {
            requisicao.body = parametros.toString()
          } else {
            requisicao.body = JSON.stringify(parametrosCorpo)    //converte dicionario em json
          }
          break;
        default:    //GET
          //adiciona na URL
          strURL += `?${parametros.toString()}`;
          break;
      }
    }
    //retorna uma promessa convertida p/ observavel
    return defer(async (): Promise<any> => {
      //espera pela resposta da api: configura o corpo da requisicao
      const resposta = await fetch(strURL, requisicao)
      //retorna o tipo de dados da resposta
      const tipoConteudo = resposta.headers.get('content-type')
      //variavel
      let data: any = {}
      try {
        //caso 1: tipo de dados json -> retorna resposta json
        //case 2: tipo de dados texto -> retorna o texto apenas
        data = tipoConteudo && tipoConteudo.includes('json')
        ? await resposta.json()
        : await resposta.text()
      } catch (erros) {
        this.trataExcecao(erros)
      }
      //verifica se houve erro na requisicao
      // : lanca exececao detalhando o erro
      if (resposta.ok) {
        return data   //retorna resultado da requisicao
      } else {
        data = JSON.stringify(data)
        throw new Error(`"Funcao=executaRequisicao<T>_RequisicaoService" => Erro(s) | Data: ${data} | Resposta: ${resposta.status} - ${resposta.statusText}}`)
      }
    })
    .pipe(map<any, T>((data: any) => data as T),   //mapeia o resultado retornado p/ tipo 'T'
      catchError(erros => this.trataExcecao(erros)));
  }

  private converteParametrosURL(parametrosCorpo: Dict<any>): URLSearchParams {
    //cria objeto que usa parametros na URL
    const parametros = new URLSearchParams();
    //-------------------------
    Object.entries(parametrosCorpo).forEach(([chave, valor]) => {
      parametros.append(chave, String(valor));
    })
    //def retorno
    return parametros
  }

  //tratamento de erros
  trataExcecao<T>(erro: T): Observable<T> {
    return throwError(() => erro);
  }
  //
  //#endregion
}
