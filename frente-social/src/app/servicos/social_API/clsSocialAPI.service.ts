import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
//tipos
import { TokenResposta, tUsuario } from '../../tipos/comuns'
import { isPlatformBrowser } from '@angular/common';
import { RequisicaoService } from '../http/requisicao.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

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
  //usuario
  private usuario = 'reds'
  private senha = 'ujm%¨&90'
  //#endregion

  constructor(
    @Inject(PLATFORM_ID) private platformaId: Object,
    private req: RequisicaoService
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
          if (resposta && resposta.token) {
            if (isPlatformBrowser(this.platformaId)) {
              localStorage.setItem(this.token, resposta.token);
            }
          } else {
            throw new Error('Token não encontrado na resposta: ' +  resposta);
          }
        },
        error: (erros) => {
          console.log('Login - Erro(s): ' + erros.message);
        }
      })
  }

  criaLogin(usuario: tUsuario): Observable<boolean> {

    const token = this.getToken();
    //token obrigatorio
    if (token) {
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${token}`}

      //executa requisicao
      return this.req.execRequisicao(this.loginURL, 'POST', cabecalhos, undefined, usuario)
        .pipe(tap((resposta) => {
            alert('Cadastro - Sucesso: ' + JSON.stringify(resposta));
          }),
          map(() => true),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
          catchError((erros) => {
            console.log('Cadastro - Erro(s): ' + erros.message)
            return throwError(() => erros)
          }))
    }

    //converte a resposta p/ um observavel 'of'
    return of(false)
  }

  executaLogin(usuario: tUsuario): Observable<boolean> {

    const token = this.getToken();
    //token obrigatorio
    if (token) {
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${token}`}

      //executa requisicao
      return this.req.execRequisicao(this.loginURL, 'GET', cabecalhos, undefined, usuario, false)
        .pipe(tap((resposta) => {
            console.log('Login - Sucesso: ' + JSON.stringify(resposta));
          }),
          map(() => true),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
          catchError((erros) => {
            console.log('Login - Erro(s): ' + erros.message)
            return throwError(() => erros)
          }))
    }

    //retorna observavel 'of'
    return of(false)
  }

  getToken(): string | null {
    //var retorno
    let token: string | null = ''

    if (isPlatformBrowser(this.platformaId))
      token = localStorage.getItem(this.token);

    return token
  }
  //#endregion
}
