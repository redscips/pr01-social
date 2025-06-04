import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EntrarComponent } from './entrar/entrar.component';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, EntrarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { }
