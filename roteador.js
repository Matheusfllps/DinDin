const express = require('express')
const { loginUsuario } = require('./controladores/usuarios/loginUsuario')

const cadastrarUsario = require('./controladores/usuarios/cadastrarUsuario')
const verificarLogin = require('./intermediarios/verificaLogin')
const { listarCategorias } = require('./controladores/categorias/listarcategoria')
const { detalharUsuario } = require('./controladores/usuarios/detalharUsuario')
const { atualizarUsuario } = require('./controladores/usuarios/atualizarUsuario')
const { obterExtrato } = require('./controladores/transacoes/obterExtrato')
const { listarTransacoes } = require('./controladores/transacoes/listarTransacoes')
const { detalharTransacao } = require('./controladores/transacoes/detalharTransacao')
const { cadastrarTransacao } = require('./controladores/transacoes/cadastrarTransacaoUsuarioLogado')
const { atualizarTransacao } = require('./controladores/transacoes/atualizarTransacao')
const { excluirTransacao } = require('./controladores/transacoes/excluirTransacao')
const { filtrarTransacoes } = require('./controladores/transacoes/filtrarTransacoesPorCategoria')
const { usuarioSchema, loginSchema } = require('./validacoes/usuarioSchema')
const { transacaoSchema } = require('./validacoes/transacaoSchema')

const rotas = express()

rotas.post('/usuarios', usuarioSchema, cadastrarUsario)
rotas.post('/login', loginSchema, loginUsuario)

rotas.use(verificarLogin)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario',  usuarioSchema, atualizarUsuario)
rotas.get('/transacao/extrato', obterExtrato)
rotas.get('/transacao', listarTransacoes)
rotas.get('/categoria', listarCategorias)
rotas.post('/transacao', transacaoSchema, cadastrarTransacao)
rotas.put('/transacao/:id', transacaoSchema,atualizarTransacao)
rotas.delete('/transacao/:id', excluirTransacao)
rotas.get('/transacao/:id', detalharTransacao)
rotas.get('/transacao', filtrarTransacoes)

module.exports = rotas
