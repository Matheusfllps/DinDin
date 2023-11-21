const pool = require('../../conexao')

const listarTransacoes = async (req, res) => {
  const { id } = req.usuario
  try {
    const queryResult = await pool.query(
      'SELECT * FROM transacoes WHERE usuario_id = $1',
      [id]
    )
    const transacoes = queryResult.rows

    return res.status(200).json(transacoes)
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.' })
  }
}

module.exports = {
  listarTransacoes
}
