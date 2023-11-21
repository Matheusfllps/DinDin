const pool = require('../../conexao')

const listarCategorias = async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM categorias')
    const categorias = queryResult.rows

    return res.status(200).json(categorias)
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.' })
  }
}

module.exports = {
  listarCategorias
}
