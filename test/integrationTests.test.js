const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = require('chai');

const server = require('../server/api');
const {
  withTypeOfConnectionMonofasico,
  withTypeOfConnectionBifasico,
  withTypeOfConnectionTrifasico,
  withInvalidClassOfConsumption,
  withInvalidTariffModality,
  withLowAverageConsumption,
  withInvalidClassOfConsumptionAndInvalidTariffModality,
  withInvalidClassOfConsumptionAndInvalidTariffModalityAndLowAverageConsumption,
} = require('./mock/correctBody');
const bodyWithInvalidNumberOfDocument = require('./mock/incorrectBody.json');

chai.use(chaiHTTP);

const postResquest = (body) => chai.request(server).post('/').send(body);

describe('Teste de integração da API', () => {
  it('Ao passar as informações com o tipo de conexão "monofásico" para a API retorna o esperado', () => {
    postResquest(withTypeOfConnectionMonofasico)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', true);
        expect(res.body).have.property('economiaAnualDeCO2', 5553.24);
      });
  });

  it('Ao passar as informações com o tipo de conexão "bifásico" para a API retorna o esperado', () => {
    postResquest(withTypeOfConnectionBifasico)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', true);
        expect(res.body).have.property('economiaAnualDeCO2', 5553.24);
      });
  });

  it('Ao passar as informações com o tipo de conexão "trifásico" para a API retorna o esperado', () => {
    postResquest(withTypeOfConnectionTrifasico)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', true);
        expect(res.body).have.property('economiaAnualDeCO2', 5553.24);
      });
  });

  it('Ao passar as informações que não contenha um numero de documento valido retorna o esperado', () => {
    postResquest(bodyWithInvalidNumberOfDocument)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('message', 'Número de documento inválido');
      });
  });

  it('Ao passar as informações que contenha a "classe de consumo" valida porem não aceita pela regra de negócio retorna o esperado', () => {
    postResquest(withInvalidClassOfConsumption)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', false);
        expect(res.body).have.property('razoesInelegibilidade')
          .to.deep.equal(['Classe de consumo não aceita']);
      });
  });

  it('Ao passar as informações que contenha a "modalidade tarifária" valida porem não aceita pela regra de negócio retorna o esperado', () => {
    postResquest(withInvalidTariffModality)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', false);
        expect(res.body).have.property('razoesInelegibilidade')
          .to.deep.equal(['Modalidade tarifária não aceita']);
      });
  });

  it('Ao passar as informações que contenha o a "média de consumo" valida porem não aceita pela regra de negócio retorna o esperado', () => {
    postResquest(withLowAverageConsumption)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', false);
        expect(res.body).have.property('razoesInelegibilidade')
          .to.deep.equal(['Consumo muito baixo para tipo de conexão']);
      });
  });

  it('Ao passar as informações que contenha o a "média de consumo" valida porem não aceita pela regra de negócio retorna o esperado', () => {
    postResquest(withLowAverageConsumption)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', false);
        expect(res.body).have.property('razoesInelegibilidade')
          .to.deep.equal(['Consumo muito baixo para tipo de conexão']);
      });
  });

  it('Ao passar as informações que contenha a "classe de consumo" e "modalidade tarifária" validas porem não são aceitas pelas regras de negócio retorna o esperado', () => {
    postResquest(withInvalidClassOfConsumptionAndInvalidTariffModality)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', false);
        expect(res.body).have.property('razoesInelegibilidade')
          .to.deep.equal([
            'Classe de consumo não aceita',
            'Modalidade tarifária não aceita',
          ]);
      });
  });

  it('Ao passar as informações que contenha a "classe de consumo", "modalidade tarifária" e "média de consumo" validas porem não são aceitas pelas regras de negócio retorna o esperado', () => {
    postResquest(withInvalidClassOfConsumptionAndInvalidTariffModalityAndLowAverageConsumption)
      .end((_err, res) => {
        expect(res.statusCode).have.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).have.property('elegivel', false);
        expect(res.body).have.property('razoesInelegibilidade')
          .to.deep.equal([
            'Classe de consumo não aceita',
            'Modalidade tarifária não aceita',
            'Consumo muito baixo para tipo de conexão',
          ]);
      });
  });
});
