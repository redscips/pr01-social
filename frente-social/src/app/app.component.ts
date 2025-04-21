import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//importacoes: componentes
import { LoginComponent } from './componentes/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rede Social';
}
