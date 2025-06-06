import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../cabecalho/cabecalho.component';
import { RodapeComponent } from '../../rodape/rodape.component';
import { CommonModule } from '@angular/common';
import { criarAnimacao } from '../../../animacoes/animacoes';
import { ListaPostsComponent } from '../../lista-posts/lista-posts.component';

@Component({
  selector: 'app-inicial',
  imports: [CabecalhoComponent, RodapeComponent, CommonModule, ListaPostsComponent],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.scss',
  animations: [criarAnimacao('A', 'aparecer', ':enter')]
})
export class InicialComponent {
  //#region propriedade
  flgBarraLateral: boolean = false

  idBarra: string = 'id-barra-lateral'
  //#endregion

  //#region metodos
  controleBarraLateral() {
    this.flgBarraLateral = !this.flgBarraLateral;
  }
  //#endregion
}
