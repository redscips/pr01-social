import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-lista-posts',
  imports: [PostComponent],
  templateUrl: './lista-posts.component.html',
  styleUrl: './lista-posts.component.scss'
})
export class ListaPostsComponent {

}
