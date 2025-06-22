import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
//tipos
import { tUsuario } from '../../tipos/comuns';
//servicos
import { ClsComumService } from '../cls-comum.service';

//constantes
export const ssLogado: string = 'estado_login'
export const ssUsuario: string = 'usuario_logado'

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService  implements CanActivate {

  //#region propriedade: instancias
  usuario: tUsuario = {}

  //variaveis
  Logado: boolean = false
  //#endregion


  constructor(
    public ClsComum: ClsComumService
  ) {
    this.getLogado()
  }

  //#region gets/sets: Logado
  getLogado(): tUsuario {
    //setta variavel de acordo com armazenamento local da sessao: memoria
    this.Logado = this.ClsComum.configuraArmazenamento('pegar', 'sessao', ssLogado) === 'verdadeiro'
    return this.usuario = this.ClsComum.configuraArmazenamento('pegar', 'sessao', ssUsuario) as tUsuario
  }

  setLogado(ctrl: boolean, usuario: tUsuario): void {
    this.Logado = ctrl
    this.usuario = usuario
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssLogado, ctrl ? 'verdadeiro' : 'falso')
    this.ClsComum.configuraArmazenamento('definir', 'sessao', ssUsuario, JSON.stringify(usuario))
  }
  //#endregion

  //#region interfaces: canActivate
  /**
   * Executa a navegação para a rota informada.
   *
   * Esse método utiliza o serviço Router para redirecionar o usuário para
   * uma rota específica definida no array de rotas.
   *
   * @returns Se o usuario esta logado no sistema (status)
   */
  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    //retorna se pode ou nao ativar a rota
    if (this.usuario) {
      //se o usuario esta logado e tenta acessar a area de login, redireciona p/ o mural
      if (state.url === '/login' || state.url.startsWith('/login')) {
        this.ClsComum.navegar(['/mural']);
        return false;
      } else
        return true;
    } else {
      //se nao estiver logado e tentar acessar uma rota protegida, redireciona p/ pagina de login (mas permite acesso a rota de login)
      if (state.url !== '/login' && !state.url.startsWith('/login')) {
        this.ClsComum.navegar(['/login']);
        return false;
      } else
        return true;
    }
  }
  //#endregion
}
