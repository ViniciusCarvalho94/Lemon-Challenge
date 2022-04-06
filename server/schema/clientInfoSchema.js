const Joi = require('joi');

module.exports = Joi.object({
  numeroDoDocumento: Joi.string().custom((string, helpers) => {
    const valid = string.length === 14 || string.length === 11
      ? string
      : helpers.message('Número de documento inválido');
    return valid;
  }).required().messages({
    'string.base': 'Número de documento deve conter uma string',
    'any.required': 'Número de documento é obrigatório',
  }),

  tipoDeConexao: Joi.string().allow('monofasico', 'bifasico', 'trifasico').required()
    .messages({
      'string.base': 'Tipo de conexão deve conter uma string',
      'any.only': 'Informe um Tipo de conexão válido',
      'any.required': 'Tipo de conexão é obrigatório',
    }),

  classeDeConsumo: Joi.string().valid('residencial', 'industrial', 'comercial', 'rural', 'poderPublico').required()
    .messages({
      'string.base': 'Classe de consumo deve conter uma string',
      'any.only': 'Informe uma classe de consumo válida',
      'any.required': 'Classe de consumo é obrigatório',
    }),

  modalidadeTarifaria: Joi.string().valid('azul', 'branca', 'verde', 'convencional').required()
    .messages({
      'string.base': 'Modalidade tarifária deve conter uma string',
      'any.only': 'Informe uma modalidade tarifária válida',
      'any.required': 'Modalidade tarifária é obrigatório',
    }),

  historicoDeConsumo: Joi.array().min(3).max(12).items(Joi.number().min(0).max(9999))
    .required()
    .messages({
      'array.base': 'Histórico de consumo deve conter um array',
      'array.min': 'Histórico de consumo deve conter no mínimo 12 mêses',
      'array.max': 'Histórico de consumo deve conter no máximo 12 mêses',
      'number.base': 'Cada mês tem que ter o valor em número inteiro',
      'number.min': 'Cada mês pode ter o valor mínimo de 0',
      'number.max': 'Cada mês pode ter o valor máximo de 9999',
      'any.required': 'Histórico de consumo é obrigatório',
    }),
});
