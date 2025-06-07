import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { tPost } from '../../tipos/comuns';

@Component({
  selector: 'app-lista-posts',
  imports: [PostComponent],
  templateUrl: './lista-posts.component.html',
  styleUrl: './lista-posts.component.scss'
})
export class ListaPostsComponent {
  //#region propriedades
  posts!: tPost[]; // ou seus dados reais

  indiceAtivo!: number
  //#endregion

  //#region gets/sets
  set setIndiceAtivo(indice: number) {
    this.indiceAtivo = indice;
  }
  //#endregion

  //#region eventos: classe
  ngOnInit(): void { this.preparaForm() }
  //#endregion

  //#region metodos
  preparaForm(): void {
    this.posts = [
      {
        id: 1,
        strNome: 'fulano',
        strMensagem: 'Mensagem',
        qtdGostei: 2,
        qtdNaoGostei: 1
      },
      {
        id: 2,
        strNome: 'ciclano',
        strMensagem: 'este é um post',
        qtdGostei: 3,
        qtdNaoGostei: 0
      },
      {
        id: 3,
        strNome: 'beltrano',
        strMensagem: 'este é outro post',
        qtdGostei: 1,
        qtdNaoGostei: 0
      },
      {
        id: 4,
        strNome: 'fulano',
        strMensagem: 'Mensagem',
        qtdGostei: 2,
        qtdNaoGostei: 1
      },
      {
        id: 5,
        strNome: 'ciclano',
        strMensagem: 'este é um post',
        qtdGostei: 3,
        qtdNaoGostei: 0
      },
      {
        id: 6,
        strNome: 'beltrano',
        strMensagem: 'este é outro post',
        qtdGostei: 1,
        qtdNaoGostei: 0
      },
      {
        id: 7,
        strNome: 'fulano',
        strMensagem: 'Mensagem',
        qtdGostei: 2,
        qtdNaoGostei: 1
      },
      {
        id: 8,
        strNome: 'ciclano',
        strMensagem: 'este é um post',
        qtdGostei: 3,
        qtdNaoGostei: 0
      },
      {
        id: 9,
        strNome: 'beltrano',
        strMensagem: 'este é outro post',
        qtdGostei: 1,
        qtdNaoGostei: 0
      },
      {
        id: 10,
        strNome: 'fulano',
        strMensagem: 'Mensagem',
        qtdGostei: 2,
        qtdNaoGostei: 1
      },
      {
        id: 11,
        strNome: 'ciclano',
        strMensagem: 'este é um post',
        qtdGostei: 3,
        qtdNaoGostei: 0
      },
      {
        id: 12,
        strNome: 'beltrano',
        strMensagem: 'este é outro post',
        qtdGostei: 1,
        qtdNaoGostei: 0
      }
    ]
  }
  //#endregion
}
