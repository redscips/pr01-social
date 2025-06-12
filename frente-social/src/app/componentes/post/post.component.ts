import { Component, Input } from '@angular/core';
import { tPost } from '../../tipos/comuns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  //#region propriedades
  @Input() post!: tPost

  @Input() flgComentario: boolean = false
  //#endregion

  //#region eventos
  onClick(): void { this.incrementaContador(1) }
  onClick2(): void { this.incrementaContador(2) }
  //#endregion

  //#region metodos
  incrementaContador(opcao: number): void {
    switch (opcao) {
      case 1:
        this.post.qtdGostei = this.post.qtdGostei ? this.post.qtdGostei + 1 : 1
        break
      default:
        this.post.qtdNaoGostei = this.post.qtdNaoGostei ? this.post.qtdNaoGostei + 1 : 1
    }
  }
  //#endregion
}
