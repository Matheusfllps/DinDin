const pool = require('../../conexao')

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body
  const usuarioId = req.usuario.id

  try {
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res
        .status(400)
        .json({ mensagem: 'Campos obrigatórios não foram fornecidos.' })
    }

    const categoriaQueryResult = await pool.query(
      'SELECT * FROM categorias WHERE id = $1',
      [categoria_id]
    )

    if (categoriaQueryResult.rows.length === 0) {
      return res.status(400).json({ mensagem: 'Categoria não encontrada.' })
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
      return res
        .status(400)
        .json({ mensagem: 'O tipo deve ser "entrada" ou "saida".' })
    }

    const transacaoQueryResult = await pool.query(
      'INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [descricao, valor, data, categoria_id, tipo, usuarioId]
    )

    const transacaoCadastrada = transacaoQueryResult.rows[0]

    return res.status(201).json(transacaoCadastrada)
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.' })
  }
}

module.exports = { cadastrarTransacao }
