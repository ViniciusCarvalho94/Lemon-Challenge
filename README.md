# Lemon Challenge

### API que realisa analise

## Estrutura de diretórios
- insomniaFile: Contém o arquivo de backup de coleção de requequisição  do Insomnia
- server: Source da API
- - controller: Controladores de acesso a API
- - middleware: Middlewares de requisições
- - schemas: Regras de validações de objetos
- - service: Código de domínio
- - utils: Funções com repetição de código
- test: Source do teste de integração
- - mock: Contém respostas mocadas
- - - correctBody: Contém respostas corretas 


## Dependências
- Node v16

## Bibliotecas
- express: Framework web
- joi: Biblioteca pra auxiliar em validações

## Bibliotecas de desenvolvimento
- chai: Ferramenta para asserções de testes unitários
- chai-http: Ferramenta para asserções de testes integrados
- eslint: Ferramenta para validação de padrões de escrita do código
- eslint-config-airbnb-base: Plugin do padrão de escrita do airbnb
- esling-plugin-import: Plugin para permitir importação de padrões de escrita
- mocha: Bliblioteca para testes
- nodemon: HTTP Server para desenvolvimento local
- nyc: Ferramenta para verificação de cobertura de testes

## Como rodar a aplicação?
- Instale as dependências: 
```bash
npm install
```
- Inicie o servidor http:
```bash
npm start
```
- O servidor estará disponível em: http://localhost:3000
- Já tem um data do Insomnia com a API mapeada: 
```bash
./insomniaFile/insomniaLemonChallenge.json
```
- Link para download do Insomnia: https://insomnia.rest/download

- Link da documentação de como dar import no data: https://docs.insomnia.rest/insomnia/import-export-data/

## Como rodar os testes?
- Inicie o servidor http:
```bash
npm start
```
- Rodar os testes:
```bash
npm test
```
- Rodar os testes com cobertura de cógido:
```bash
npm run test:coverage
```
