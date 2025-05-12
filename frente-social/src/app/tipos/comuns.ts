//campos de entrada: tipo de entradas mapeados
export type tTipoEntrada = 'text' | 'tel' | 'email' | 'password'

//login
export type tUsuario = {
  nome: string,
  email: string,
  senha: string
}

export type TokenResposta = {
  token: string
}
