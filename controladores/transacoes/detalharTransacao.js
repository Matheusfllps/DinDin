const pool = require('../../conexao')

const detalharTransacao = async (req, res) => {
  const { id } = req.params

  try {
    const queryResult = await pool.query(
      'SELECT * FROM transacoes WHERE id = $1',
      [id]
    )

    if (!queryResult.rows.length) {
      return res
        .status(404)
        .json({ mensagem: 'Transação não encontrada para o usuário logado.' })
    }
    const transacao = queryResult.rows[0]

    return res.status(200).json(transacao)
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.' })
  }
}

module.exports = {
  detalharTransacao
}
