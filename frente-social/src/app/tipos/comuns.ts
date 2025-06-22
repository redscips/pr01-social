//campos de entrada: tipo de entradas mapeados
export type tTipoEntrada = 'text' | 'tel' | 'email' | 'password'

//login
export class tUsuario {
  constructor(
    public id?: number,
    public username?: string,
    public des_nome?: string,
    public password?: string,
    public token?: string
  ) {}
}

//posts
export type tPost = {
  id: number,
  strUrl?: string,
  strNome: string,
  strData?: Date,
  strMensagem: string,
  qtdGostei?: number,
  qtdNaoGostei?: number,
  comentarios?: tPost[]
}
