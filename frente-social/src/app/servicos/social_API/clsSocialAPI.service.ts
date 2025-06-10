import { Injectable } from '@angular/core';
//tipos
import { TokenResposta, tUsuario } from '../../tipos/comuns'
import { RequisicaoService } from '../http/requisicao.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ClsComumService } from '../cls-comum.service';

@Injectable({
  providedIn: 'root'
})
export class ClsSocialAPIService {

  //#region propriedades
  //endpoint
  private tokenURL = 'http://localhost:8000/api/token/'
  private loginURL = 'http://www.redesocial.com/ocultosocial/login/'
  //token
  private token = 'tokenAPI';
  private vlrToken: string = ''
  //usuario
  private usuario = 'reds'
  private senha = 'ujm%¨&90'
  //#endregion

  //#region gets/sets : vlrToken
  get getToken(): string {
    return this.ClsComum.configuraArmazenamento('pegar', 'sessao', this.token)
  }
  //#endregion

  constructor(
    private req: RequisicaoService,
    private ClsComum: ClsComumService
  ) { }

  //#region metodos
  validaToken(usuario: string = '', senha: string = ''): void {
    //parametros da url
    const parametros = {
      'username': usuario ? usuario : this.usuario,
      'password': senha ? senha: this.senha
    }

    //executa requisicao
    this.req.execRequisicao<TokenResposta>(this.tokenURL, 'POST', undefined, 'application/x-www-form-urlencoded', parametros, true)
      .subscribe({
        next: (resposta: TokenResposta) => {
          //verifica se o token foi retornado
          if (resposta)
              this.vlrToken = this.ClsComum.configuraArmazenamento('definir', 'sessao', this.token, resposta.token)
          else
            throw new Error('Token não encontrado na resposta: ' +  resposta);
        },
        error: (erros) => console.log('Login - Erro(s): ' + erros.message)
      })
  }

  criaLogin(usuario: tUsuario): Observable<any> {

    const token = this.getToken;
    //token obrigatorio
    if (token) {
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${token}`}

      //executa requisicao
      return this.req.execRequisicao(this.loginURL, 'POST', cabecalhos, undefined, usuario)
        .pipe(tap((resposta) => JSON.stringify(resposta)),
          map((resposta) => Object.assign(new tUsuario(), resposta)),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
          catchError((erros) => {
            console.log('Cadastro - Erro(s): ' + erros.message)
            return throwError(() => erros)
          }))
    }

    //converte a resposta p/ um observavel 'of'
    return of(false)
  }

  executaLogin(usuario: tUsuario): Observable<any> {

    const token = this.getToken;
    //token obrigatorio
    if (token) {
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${token}`}

      //executa requisicao
      return this.req.execRequisicao(this.loginURL, 'GET', cabecalhos, undefined, usuario, false)
        .pipe(tap((resposta) => JSON.stringify(resposta)),
          map((resposta) => Object.assign(new tUsuario(), resposta)),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
          catchError((erros) => {
            console.log('Login - Erro(s): ' + erros.message)
            return throwError(() => erros)
          }))
    }

    //retorna observavel 'of'
    return of(false)
  }
  //#endregion
}
