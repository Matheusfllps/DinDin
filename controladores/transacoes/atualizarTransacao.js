const pool = require('../../conexao')

const atualizarTransacao = async (req, res) => {
  const { id } = req.params
  const { descricao, valor, data, categoria_id, tipo } = req.body

  try {
    const transacaoQueryResult = await pool.query(
      'SELECT * FROM transacoes WHERE id = $1',
      [id]
    )

    if (transacaoQueryResult.rows.length === 0) {
      return res
        .status(404)
        .json({ mensagem: 'Transação não encontrada para o usuário logado.' })
    }

    await pool.query(
      'UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6',
      [descricao, valor, data, categoria_id, tipo, id]
    )

    return res.status(204).send()
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.' })
  }
}

module.exports = { atualizarTransacao }
