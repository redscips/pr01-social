import { Component, Input } from '@angular/core';
import { tPost } from '../../tipos/comuns';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  //#region propriedades
  @Input() post!: tPost
  //#endregion
}
