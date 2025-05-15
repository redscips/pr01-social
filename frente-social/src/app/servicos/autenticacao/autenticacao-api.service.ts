import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
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

  executaLogin(strEmail: string, strSenha: string): void {
    //--------------------------
    const token = this.getToken();
    //token obrigatorio
    if (token) {
      //dados que serao enviados no post: corpo
      const payload = { strEmail, strSenha }
      //cabecalho
      const cabecalhos = {'Authorization': `Token ${token}`}
      //executa requisicao
      this.req.execRequisicao(this.loginURL, 'POST', cabecalhos, undefined, payload)
        .subscribe({
          next: (resposta) => {
            alert('Login - Sucesso: ' + JSON.stringify(resposta));
          },
          error: (erros) => {
            alert('Login - Erro(s): ' + erros.message);
          }
        });
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
  //#endregion
}
