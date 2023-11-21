const pool = require('../../conexao')

const filtrarTransacoes = async (req, res) => {
  const usuarioId = req.usuario.id
  let filtroCategorias = req.query.filtro || []

  if (typeof filtroCategorias === 'string') {
    filtroCategorias = [filtroCategorias]
  }

  try {
    let query = `
        SELECT t.*, c.descricao AS categoria_nome
        FROM transacoes t
        INNER JOIN categorias c ON t.categoria_id = c.id
        WHERE t.descricao = $1`

    let params = [usuarioId]

    if (filtroCategorias.length > 0) {
      query += ' AND c.descricao IN ('
      query += filtroCategorias.map((_, index) => `$${index + 2}`).join(', ')
      query += ')'
      params = params.concat(filtroCategorias)
    }

    const result = await pool.query(query, params)
    const transacoes = result.rows

    return res.status(200).json(transacoes)
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.' })
  }
}

module.exports = { filtrarTransacoes }
