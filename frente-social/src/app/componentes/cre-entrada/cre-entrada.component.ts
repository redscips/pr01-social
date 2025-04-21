import { Component, Input, Output, EventEmitter } from '@angular/core';
//importacoes: componentes angular
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
//tipos
import { tTipoEntrada } from '../../tipos/comuns';

@Component({
  selector: 'app-cre-entrada',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './cre-entrada.component.html',
  styleUrl: './cre-entrada.component.scss'
})
export class CreEntradaComponent {
  //props: podem serem passados na sua referencia
  //entradas: inputs
  @Input() rEntrada: string = '';
  @Input() TipoEntrada: tTipoEntrada = 'text';
  @Input() strDescricao: string = '';
  @Input() strNome: string = '';
  //retornam valores p/ seus pais
  //saidas: outputs
  @Output() siEntrada = new EventEmitter<string>();
  //comuns do template
  iEntrada: string = '';

  //funcoes
  atualizaInput(str: string): void {
    //atualiza o campo localmente
    this.iEntrada = str;
    //retorna o valor p/ componente pai
    this.siEntrada.emit(str);
  }
}

