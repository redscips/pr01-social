import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
//importacoes: componentes angular
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
//tipos
import { tTipoEntrada } from '../../tipos/comuns';

@Component({
  selector: 'app-cre-entrada',
  imports: [FormsModule],
  templateUrl: './cre-entrada.component.html',
  styleUrl: './cre-entrada.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CreEntradaComponent),
    multi: true,
  }]
})
export class CreEntradaComponent implements ControlValueAccessor {
  //#region propriedades
  //inputs
  @Input() rEntrada: string = '';
  @Input() TipoEntrada: tTipoEntrada = 'text';
  @Input() strDescricao: string = '';
  @Input() strID: string = '';
  //outputs: retornam valores p/ seus pais
  @Output() siEntrada = new EventEmitter<string>();
  //#endregion

  iEntrada: string = '';

  //#region eventos
  //objetos
  onChangeInput(str: string): void { this.atualizaInput(str) }
  //callbacks
  _onChange: (value: any) => void = (_: any) => {};
  //#endregion

  //#region metodos
  atualizaInput(str: string): void {
    //atualiza o campo localmente
    this.iEntrada = str;
    //retorna o valor p/ componente pai
    this.siEntrada.emit(str);
  }

  //interface
  writeValue(obj: any): void {
    this.iEntrada = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
  //#endregion
}

