const joi = require("joi");

const usuarioSchema = async (req, res, next) => {
    const { nome, email, senha } = req.body;
    try {
        const schemaUser = joi.object({
            nome: joi.string().required().messages({
                "any.required": "O campo nome é obrigatório",
                "string.empty": "O campo nome está vazio",
                "string.base": "por favor insira um nome válido",
            }),
            email: joi.string().email().required().messages({
                "any.required": "O campo email é obrigatório",
                "string.empty": "O campo email está vazio",
                "string.email": "O campo email precisa ter um formato válido",
                "string.base": "por favor insira um email valido",
            }),
            senha: joi.string().min(4).required().messages({
                "any.required": "O campo senha é obrigatório",
                "string.empty": "O campo senha está vazio",
                "string.base": "O campo senha precisa ser do tipo string",
                "string.min": "O campo senha precisa, conter no minimo, 4 caracteres",
            }),
        });

        await schemaUser.validateAsync({ nome, email, senha });
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const loginSchema = async (req, res, next) => {
    const { email, senha } = req.body;
    try {
        const schemaUser = joi.object({
            email: joi.string().email().required().messages({
                "any.required": "O campo email é obrigatório",
                "string.empty": "O campo email está vazio",
                "string.email": "O campo email precisa ter um formato válido",
                "string.base": "por favor insira um email valido",
            }),
            senha: joi.string().min(4).required().messages({
                "any.required": "O campo senha é obrigatório",
                "string.empty": "O campo senha está vazio",
                "string.base": "O campo senha precisa ser do tipo string",
                "string.min":
                    "O campo senha precisa, conter no minimo, 4 caracteres",
            }),
        });

        await schemaUser.validateAsync({ email, senha });
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { usuarioSchema, loginSchema };
