import { Injectable } from '@angular/core';
import { catchError, defer, map, Observable, tap, throwError } from 'rxjs';
//tipos
import { TokenResposta } from '../tipos/comuns'

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoAPIService {
  //endpoint requisicao
  private tokenURL = 'http://localhost:8000/api/token/'
  private loginURL = 'http://www.redesocial.com/ocultosocial/login/'
  //token
  private token = 'tokenAPI';
  //usuario
  private usuario = 'reds'
  private senha = 'ujm%¨&90'

  //cliente http
  constructor() { }

  //#region metodos
  //
  validaToken(usuario: string, senha: string): Observable<TokenResposta> {
    // Cria um objeto URLSearchParams e adiciona os parâmetros
    const params = new URLSearchParams();
    params.append('username', usuario);
    params.append('password', senha);
    //retorna uma promessa convertida em observavel
    return defer(async () => {
      //espera pela resposta da api: configura o corpo da requisicao
      const resposta = await fetch(this.tokenURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });
      // Mesmo que a resposta não seja ok, extrai o JSON
      const respostaJSON = await resposta.json()
      //validaco o retorno
      if (!resposta.ok) {
        throw new Error('Erro na requisição: ' + respostaJSON + ' | ' + resposta.statusText);
      }
      //def retorno: resposta no formato json
      return respostaJSON;
    }).pipe(catchError(this.trataExcecao))
  }

  executaLogin(strEmail: string, strSenha: string): Observable<any> {
    //dados que serao enviados no post
    const payload = { strEmail, strSenha }
    //retorna token
    const token = this.getToken();
    //define os cabecalhos p/ a requisicao
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    //se o token existir, adiciona o cabecalho de autorizacao
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    //retorna a promessa convertida p/ obersavel
    return defer(async () => {
      //espera pela resposta da api: configura o corpo da requisicao
      const resposta = await fetch(this.loginURL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      // Mesmo que a resposta não seja ok, extrai o JSON
      const respostaJSON = await resposta.json()
      //validaco o retorno
      if (!resposta.ok) {
        throw new Error('Erro na requisição: ' + respostaJSON.erro + ' | ' + resposta.statusText);
      }
      //def retorno: resposta no formato json
      return respostaJSON;
    }).pipe(catchError(this.trataExcecao));
  }

  executaLoginToken() {
    //retorna validacao do token
    this.validaToken(this.usuario, this.senha)
      .subscribe({
        next: (resposta: TokenResposta) => {
          //verifica se o token foi retornado
          if (resposta && resposta.token) {
            localStorage.setItem(this.token, resposta.token);
          } else {
            throw new Error('Token não encontrado na resposta: ' +  resposta);
          }
        },
        error: (erros) => {
          alert('Login - Erro(s): ' + erros.message);
        }
      })
  }

  deslogar(): void {
    localStorage.removeItem(this.token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  //retorna se usuario esta logado
  flgAutenticado(): boolean {
    return !!this.getToken();
  }

  //tratamento de erros
  private trataExcecao(erro: any): Observable<any> {
    return throwError(() => new Error(erro.message));
  }
  //#endregion
}
