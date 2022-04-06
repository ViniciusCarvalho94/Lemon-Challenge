const clientInfoSchema = require('../schema/clientInfoSchema');
const errorConstructor = require('../utils/errorConstructor');
const { badRequest } = require('../utils/statusCode');

function validateclientInfoSchemas(clientInfo) {
  const { error } = clientInfoSchema.validate(clientInfo);
  if (error) throw errorConstructor(badRequest, error.message);
}

const validateConsumptionClass = (classeDeConsumo) => ['comercial', 'residencial', 'industrial'].includes(classeDeConsumo);

const validateTariffModality = (modalidadeTarifaria) => ['convencional', 'branca'].includes(modalidadeTarifaria);

function calculateAverageConsumption(historicoDeConsumo) {
  const totalConsume = historicoDeConsumo.reduce((acc, curr) => acc + curr, 0);

  return totalConsume / historicoDeConsumo.length;
}

const typeOfConnections = {
  monofasico: (averageEnergyConsumption) => averageEnergyConsumption > 400,
  bifasico: (averageEnergyConsumption) => averageEnergyConsumption > 500,
  trifasico: (averageEnergyConsumption) => averageEnergyConsumption > 750,
};

function validateConnectionAverage(tipoDeConexao, averageEnergyConsumption) {
  return typeOfConnections[tipoDeConexao](averageEnergyConsumption);
}

function ineligibility(consumptionClass, tariffModality, connectionAverage) {
  const razoesInelegibilidade = [];

  if (!consumptionClass) razoesInelegibilidade.push('Classe de consumo não aceita');
  if (!tariffModality) razoesInelegibilidade.push('Modalidade tarifária não aceita');
  if (!connectionAverage) razoesInelegibilidade.push('Consumo muito baixo para tipo de conexão');

  return razoesInelegibilidade;
}

function annualCO2Savings(averageEnergyConsumption) {
  return parseFloat((((averageEnergyConsumption * 12) / 1000) * 84).toFixed(2));
}

module.exports = (clientInfo) => {
  validateclientInfoSchemas(clientInfo);

  const {
    tipoDeConexao,
    classeDeConsumo,
    modalidadeTarifaria,
    historicoDeConsumo,
  } = clientInfo;

  const consumptionClass = validateConsumptionClass(classeDeConsumo);
  const tariffModality = validateTariffModality(modalidadeTarifaria);
  const averageEnergyConsumption = calculateAverageConsumption(historicoDeConsumo);
  const connectionAverage = validateConnectionAverage(tipoDeConexao, averageEnergyConsumption);

  if (!consumptionClass || !tariffModality || !connectionAverage) {
    return {
      elegivel: false,
      razoesInelegibilidade: ineligibility(consumptionClass, tariffModality, connectionAverage),
    };
  }

  const economiaAnualDeCO2 = annualCO2Savings(averageEnergyConsumption);

  return {
    elegivel: true,
    economiaAnualDeCO2,
  };
};
