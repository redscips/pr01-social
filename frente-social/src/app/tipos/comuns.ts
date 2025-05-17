//campos de entrada: tipo de entradas mapeados
export type tTipoEntrada = 'text' | 'tel' | 'email' | 'password'

//login
export type tUsuario = {
  des_nome?: string,
  des_login?: string,
  des_senha?: string
}

export type TokenResposta = {
  token: string
}
