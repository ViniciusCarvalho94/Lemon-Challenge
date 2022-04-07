const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = require('chai');

const objectForExample = require('./filesToGet/objectForExample');
const {
  withTypeOfConnectionMonofasico,
  withTypeOfConnectionBifasico,
  withTypeOfConnectionTrifasico,
  withInvalidClassOfConsumption,
  withInvalidTariffModality,
  withLowAverageConsumption,
  withInvalidClassOfConsumptionAndInvalidTariffModality,
  withInvalidClassOfConsumptionAndInvalidTariffModalityAndLowAverageConsumption,
} = require('./filesToPost/correctBody');
const bodyWithInvalidNumberOfDocument = require('./filesToPost/incorrectBody.json');
const api = require('../server/api');

chai.use(chaiHTTP);

describe('Teste de integração da API', () => {
  const getRequest = () => chai.request(api).get('/');
  const postRequest = (body) => chai.request(api).post('/').send(body);

  it('Ao acessar o "/" utilizando o metodo get retorna o esperado', () => {
    const stringForMessage = 'Para fazer qualquer fazer a requisição POST utilize algum software de sua preferencia passando um json no body.';
    getRequest(withInvalidClassOfConsumptionAndInvalidTariffModalityAndLowAverageConsumption)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('message', stringForMessage);
        expect(body).have.property('example')
          .to.deep.equal(objectForExample);
      });
  });

  it('Ao passar as informações com o tipo de conexão "monofásico" para a API retorna o esperado', () => {
    postRequest(withTypeOfConnectionMonofasico)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', true);
        expect(body).have.property('economiaAnualDeCO2', 5553.24);
      });
  });

  it('Ao passar as informações com o tipo de conexão "bifásico" para a API retorna o esperado', () => {
    postRequest(withTypeOfConnectionBifasico)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', true);
        expect(body).have.property('economiaAnualDeCO2', 5553.24);
      });
  });

  it('Ao passar as informações com o tipo de conexão "trifásico" para a API retorna o esperado', () => {
    postRequest(withTypeOfConnectionTrifasico)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', true);
        expect(body).have.property('economiaAnualDeCO2', 5553.24);
      });
  });

  it('Ao passar as informações que não contenha um numero de documento valido retorna o esperado', () => {
    postRequest(bodyWithInvalidNumberOfDocument)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(400);
        expect(body).to.be.a('object');
        expect(body).have.property('message', 'Número de documento inválido');
      });
  });

  it('Ao passar as informações que contenha a "classe de consumo" valida porem não aceita pela regra de negócio retorna o esperado', () => {
    postRequest(withInvalidClassOfConsumption)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', false);
        expect(body).have.property('razoesInelegibilidade')
          .to.deep.equal(['Classe de consumo não aceita']);
      });
  });

  it('Ao passar as informações que contenha a "modalidade tarifária" valida porem não aceita pela regra de negócio retorna o esperado', () => {
    postRequest(withInvalidTariffModality)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', false);
        expect(body).have.property('razoesInelegibilidade')
          .to.deep.equal(['Modalidade tarifária não aceita']);
      });
  });

  it('Ao passar as informações que contenha o a "média de consumo" valida porem não aceita pela regra de negócio retorna o esperado', () => {
    postRequest(withLowAverageConsumption)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', false);
        expect(body).have.property('razoesInelegibilidade')
          .to.deep.equal(['Consumo muito baixo para tipo de conexão']);
      });
  });

  it('Ao passar as informações que contenha a "classe de consumo" e "modalidade tarifária" validas porem não são aceitas pelas regras de negócio retorna o esperado', () => {
    postRequest(withInvalidClassOfConsumptionAndInvalidTariffModality)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', false);
        expect(body).have.property('razoesInelegibilidade')
          .to.deep.equal([
            'Classe de consumo não aceita',
            'Modalidade tarifária não aceita',
          ]);
      });
  });

  it('Ao passar as informações que contenha a "classe de consumo", "modalidade tarifária" e "média de consumo" validas porem não são aceitas pelas regras de negócio retorna o esperado', () => {
    postRequest(withInvalidClassOfConsumptionAndInvalidTariffModalityAndLowAverageConsumption)
      .end((_err, res) => {
        const { status, body } = res;
        expect(status).have.equal(200);
        expect(body).to.be.a('object');
        expect(body).have.property('elegivel', false);
        expect(body).have.property('razoesInelegibilidade')
          .to.deep.equal([
            'Classe de consumo não aceita',
            'Modalidade tarifária não aceita',
            'Consumo muito baixo para tipo de conexão',
          ]);
      });
  });
});
