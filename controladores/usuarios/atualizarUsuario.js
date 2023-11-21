const pool = require('../../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  const token = req.header('Authorization').replace('Bearer ', '')

  try {
    const decodificarToken = jwt.verify(token, 'umaSenhaSegura')
    const usuarioId = decodificarToken.id
    const usuarioExistente = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({
        mensagem:
          'O e-mail informado já está sendo utilizado por outro usuário.'
      })
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    await pool.query(
      'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4',
      [nome, email, senhaCriptografada, usuarioId]
    )

    return res.status(204).end()
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Ocorreu um erro ao processar a requisição.' })
  }
}

module.exports = { atualizarUsuario }
