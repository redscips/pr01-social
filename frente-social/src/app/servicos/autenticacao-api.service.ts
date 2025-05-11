import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoAPIService {
  //endpoint requisicao
  private loginURL = "http://www.redesocial.com/ocultosocial/login/"

  //cliente http
  constructor(private http: HttpClient) { }

  //#region metodos
  executaLogin(strEmail: string, strSenha: string): Observable<any> {
    //dados a serem enviados
    const payload = { strEmail, strSenha }
    //def retorno
    return this.http.post<any>(this.loginURL, payload)
      .pipe(catchError(this.trataExcecao));
  }

  // Tratamento básico de erro
  private trataExcecao(error: HttpErrorResponse) {
    return throwError(() => new Error('Ocorreu um erro no login. Tente novamente.' + error.message));
  }
  //#endregion
}
