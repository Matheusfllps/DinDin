const joi = require('joi')

const transacaoSchema = async (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body
  try {
    const schemaTrasacao = joi.object({
      descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição está vazio'
      }),
      valor: joi.number().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'string.empty': 'O campo valor está vazio',
        'number.base': 'O campo valor deve ser um número'
      }),
      data: joi.string().required().messages({
        'any.required': 'O campo data é obrigatório',
        'string.empty': 'O campo data está vazio',
        'string.base': 'O campo data precisa ser do tipo string'
      }),
      categoria_id: joi.number().required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'string.empty': 'O campo categoria_id está vazio',
        'number.base': 'O campo categoria_id deve ser um número'
      }),
      tipo: joi.string().required().messages({
        'any.required': 'O campo tipo é obrigatório',
        'string.empty': 'O campo tipo está vazio'
      })
    })

    await schemaTrasacao.validateAsync({
      descricao,
      valor,
      data,
      categoria_id,
      tipo
    })
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { transacaoSchema }
