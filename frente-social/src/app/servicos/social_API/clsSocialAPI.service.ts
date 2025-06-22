import { Injectable } from '@angular/core';
//tipos
import { tLogin, tUsuario } from '../../tipos/comuns'
import { RequisicaoService } from '../http/requisicao.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ClsComumService } from '../cls-comum.service';
import { AutenticacaoService, ssUsuario } from '../autenticacao/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class ClsSocialAPIService {

  //#region propriedades
  //endpoint
  private tokenURL = 'http://localhost:8000/api/token/'
  private loginURL = 'http://www.redesocial.com/ocultosocial/login/'
  private postURL = 'http://www.redesocial.com/ocultosocial/post/'
  //#endregion


  //#region gets/sets : vlrToken
  //#endregion

  constructor(
    private req: RequisicaoService,
    private ClsComum: ClsComumService,
    private ClsAutent: AutenticacaoService
  ) { }

  //#region metodos
  criaLogin(usuario: tUsuario): Observable<any> {
    //executa requisicao
    return this.req.execRequisicao(this.loginURL, 'POST', undefined, undefined, usuario)
      .pipe(tap((resposta: any) => JSON.stringify(resposta)),
        map((resposta: any) => {
          let login = Object.assign(new tLogin(), resposta)
          //loga usuario no sistema
          this.ClsAutent.setLogado(true, login)
          //def retorno
          return login
        }),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
        catchError((erros) => {
          console.log('Cadastro - Erro(s): ' + erros.message)
          return throwError(() => erros)
        }))
  }

  executaLogin(usuario: tUsuario): Observable<any> {
    //parametros da url
    const parametros = {
      'username': usuario.username,
      'password': usuario.password
    }

    //executa requisicao
    return this.req.execRequisicao<tUsuario>(this.tokenURL, 'POST', undefined, 'application/x-www-form-urlencoded', parametros, true)
      .pipe(tap((resposta: any) => JSON.stringify(resposta)),
        map((resposta: any) => {
          //verifica se o token foi retornado
          let login = Object.assign(new tLogin(), resposta)
          //loga usuario no sistema
          this.ClsAutent.setLogado(true, login)
          //def retorno
          return login

          if (resposta) {
              this.ClsComum.configuraArmazenamento('definir', 'sessao', ssUsuario, JSON.stringify(resposta))
              return resposta
          } else
            throw new Error('Token não encontrado na resposta: ' +  resposta);
        }),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
        catchError((erros) => {
          console.log('Cadastro - Erro(s): ' + erros.message)
          return throwError(() => erros)
        }))
  }

  criarPost(): Observable<any> {
    let usuario = this.ClsComum.configuraArmazenamento('pegar', 'sessao', ssUsuario) as tUsuario
    //token obrigatorio
    if (usuario.token) {
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${usuario.token}`}

      //executa requisicao
      return this.req.execRequisicao(this.postURL, 'POST', cabecalhos, undefined)
        .pipe(tap((resposta) => JSON.stringify(resposta)),
          map((resposta) => resposta),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
          catchError((erros) => {
            console.log('Cadastro - Erro(s): ' + erros.message)
            return throwError(() => erros)
          }))
    }

    //converte a resposta p/ um observavel 'of'
    return of(false)
  }
  //#endregion
}
