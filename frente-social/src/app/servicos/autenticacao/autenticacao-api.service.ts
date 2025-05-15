import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, defer, map, Observable, of, throwError } from 'rxjs';
//tipos
import { TokenResposta } from '../../tipos/comuns'
import { isPlatformBrowser } from '@angular/common';
import { RequisicaoService } from '../http/requisicao.service';

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

  constructor(@Inject(PLATFORM_ID) private platformaId: Object, private req: RequisicaoService) { }

  //#region metodos
  //
  validaToken(usuario: string, senha: string): Observable<TokenResposta> {
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
        const resposta = await fetch(this.tokenURL, {
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
    .pipe(map(data => data as TokenResposta))
    .pipe(catchError(this.trataExcecao));
  }

  executaLogin(strEmail: string, strSenha: string): Observable<any> {
    //--------------------------
    const token = this.getToken();
    //token obrigatorio
    if (token) {
      //dados que serao enviados no post: corpo
      const payload = { strEmail, strSenha }
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${token}`}
      //executa requisicao
      return this.req.execRequisicao(this.loginURL, 'POST', cabecalhos, payload)
    } else {
      return of({})
    }

    // //define os cabecalhos p/ a requisicao
    // const headers: HeadersInit = {
    //   'Content-Type': 'application/json'
    // };
    // //se o token existir, adiciona o cabecalho de autorizacao
    // if (token) {
    //   headers['Authorization'] = `Token ${token}`;
    // }
    // //retorna a promessa convertida p/ obersavel
    // return defer(async () => {
    //   //espera pela resposta da api: configura o corpo da requisicao
    //   const resposta = await fetch(this.loginURL, {
    //     method: 'POST',
    //     headers,
    //     body: JSON.stringify(payload)
    //   });
    //   // Mesmo que a resposta não seja ok, extrai o JSON
    //   const respostaJSON = await resposta.json()
    //   //validaco o retorno
    //   if (!resposta.ok) {
    //     throw new Error('Erro na requisição: ' + respostaJSON.erro + ' | ' + resposta.statusText);
    //   }
    //   //def retorno: resposta no formato json
    //   return respostaJSON;
    // }).pipe(catchError(this.trataExcecao));

  }

  executaLoginToken() {
    //retorna validacao do token
    this.validaToken(this.usuario, this.senha)
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
          alert('Login - Erro(s): ' + erros.message);
        }
      })
  }

  deslogar(): void {
    if (isPlatformBrowser(this.platformaId)) {
      localStorage.removeItem(this.token);
    }
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
