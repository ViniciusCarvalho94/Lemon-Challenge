const stringForMessage = 'Para fazer qualquer requisição POST utilize algum software de sua preferencia passando um json no body.';
const objectForExample = {
  numeroDoDocumento: 'string',
  tipoDeConexao: 'string',
  classeDeConsumo: 'string',
  modalidadeTarifaria: 'string',
  historicoDeConsumo: [
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
  ],
};

module.exports = () => ({
  message: stringForMessage,
  example: objectForExample,
});
