import { Injectable } from '@angular/core';
import { catchError, defer, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  constructor() { }

  //#region metodos
  //
  executaRequisicao(usuario: string, senha: string): Observable<any> {
      // Cria um objeto URLSearchParams e adiciona os parâmetros
      const params = new URLSearchParams();
      params.append('username', usuario);
      params.append('password', senha);
      //retorna uma promessa convertida em observavel
      return defer(async () => {
        //var retorno
        let data = {}
        try {
          //espera pela resposta da api: configura o corpo da requisicao
          const resposta = await fetch('', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
          })
          //converte respota p/ json
          data = await resposta.json()
          //validaco o retorno
          if (!resposta.ok) {
            throw new Error('Erro na requisição: ' + data + ' | ' + resposta.statusText);
          }
        } catch (erros) {
          this.trataExcecao(erros)
        } finally {
          //def retorno
          return data
        }
      })
      .pipe(map((data: any) => data))
      .pipe(catchError(this.trataExcecao));
    }

  //tratamento de erros
  private trataExcecao(erro: any): Observable<any> {
    return throwError(() => new Error(erro.message));
  }
  //
  //#endregion
}
