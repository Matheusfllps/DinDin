const pool = require('../../conexao')

const excluirTransacao = async (req, res) => {
  const { id } = req.params

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

    await pool.query('DELETE FROM transacoes WHERE id = $1', [id])

    return res.status(204).send()
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.2' })
  }
}

module.exports = { excluirTransacao }
