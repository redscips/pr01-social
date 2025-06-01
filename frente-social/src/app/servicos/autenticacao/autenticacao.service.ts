import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
//tipos
import { tUsuario } from '../../tipos/comuns';
//servicos
import { ClsComumService } from '../cls-comum.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService  implements CanActivate {

  //#region propriedade: instancias
  usuario: tUsuario = {}

  //variaveis
  Logado: boolean = false
  private inicializado: boolean = false

  //constantes
  readonly ssLogado: string = 'estado_login'
  //#endregion


  constructor(
    @Inject(PLATFORM_ID) private plataformaID: any,
    public ClsComum: ClsComumService
  ) {
    this.inicializaAutenticacao()
  }

  //#region gets/sets: Logado
  get getLogado(): boolean {
    return this.Logado;
  }

  setLogado(ctrl: boolean, usuario: tUsuario): void {

    this.Logado = ctrl
    this.usuario = usuario

    //valida se esta no ambiente do navegador
    if (isPlatformBrowser(this.plataformaID))
      sessionStorage.setItem(this.ssLogado, ctrl ? 'verdadeiro' : 'falso')
  }
  //#endregion

  //#region metodos
  /**
   * Inicializa o estado de autenticação a partir do sessionStorage.
   * Essa função será chamada antes do bootstrap da aplicação.
   */
  async inicializaAutenticacao(): Promise<void> {
    //evita multiplas execucoes
    if (this.inicializado) return;

    //promessa: busca se o usuario esta logado
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.plataformaID)) {
        //setta variavel de acordo com armazenamento local da sessao: memoria
        this.Logado = sessionStorage.getItem(this.ssLogado) === 'verdadeiro';
        this.inicializado = true
      }
      //retorna
      resolve();
    });
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
    if (this.getLogado) {
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
