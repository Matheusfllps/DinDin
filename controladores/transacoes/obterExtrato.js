const pool = require('../../conexao')

const obterExtrato = async (req, res) => {
  try {
    const usuarioId = req.usuario.id

    const transacoesEntradaResult = await pool.query(
      'SELECT valor FROM transacoes WHERE usuario_id = $1 AND tipo = $2',
      [usuarioId, 'entrada']
    )

    let somaTransacoesEntrada = 0
    for (const transacao of transacoesEntradaResult.rows) {
      somaTransacoesEntrada += parseFloat(transacao.valor) || 0
    }

    const transacoesSaidaResult = await pool.query(
      'SELECT valor FROM transacoes WHERE usuario_id = $1 AND tipo = $2',
      [usuarioId, 'saida']
    )

    let somaTransacoesSaida = 0
    for (const transacao of transacoesSaidaResult.rows) {
      somaTransacoesSaida += parseFloat(transacao.valor) || 0
    }

    return res
      .status(200)
      .json({ entrada: somaTransacoesEntrada, saida: somaTransacoesSaida })
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.1' })
  }
}
module.exports = {
  obterExtrato
}
