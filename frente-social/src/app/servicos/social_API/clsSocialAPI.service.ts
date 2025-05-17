import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
//tipos
import { TokenResposta } from '../../tipos/comuns'
import { isPlatformBrowser } from '@angular/common';
import { RequisicaoService } from '../http/requisicao.service';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClsSocialAPIService {
  //endpoint requisicao
  private tokenURL = 'http://localhost:8000/api/token/'
  private loginURL = 'http://www.redesocial.com/ocultosocial/login/'
  //token
  private token = 'tokenAPI';
  //usuario
  private usuario = 'reds'
  private senha = 'ujm%¨&90'

  constructor(@Inject(PLATFORM_ID) private platformaId: Object, private req: RequisicaoService) { }

  //#region metodos
  //
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

  executaLogin(strEmail: string, strSenha: string): Observable<boolean> {
    //--------------------------
    const token = this.getToken();
    //token obrigatorio
    if (token) {
      //dados que serao enviados no post: corpo
      const payload = {'des_login': strEmail, 'des_senha': strSenha }
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${token}`}
      //executa requisicao
      return this.req.execRequisicao(this.loginURL, 'POST', cabecalhos, undefined, payload)
        .pipe(tap((resposta) => {
            alert('Login - Sucesso: ' + JSON.stringify(resposta));
          }),
          map(() => true),   //mapeia o resultado e retorna 'verdadeiro' caso nao de erros
          catchError((erros) => {
            console.log('Login - Erro(s): ' + erros.message)
            return this.req.trataExcecao(erros)
          }))
    }
    //def retorno
    return of(false)
  }

  getToken(): string | null {
    //var retorno
    let token: string | null = ''
    //validacao
    if (isPlatformBrowser(this.platformaId)) {
      token = localStorage.getItem(this.token);
    }
    //def retorno
    return token
  }
  //#endregion
}
