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
}
