const detalharUsuario = (req, res) => {
  res.status(201).json(req.usuario)
}

module.exports = {
  detalharUsuario
}
