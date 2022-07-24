# Desafio Técnico XP - Back-end

API REST para negociação de ativos financeiros desenvolvida para o desafio técnico XP.

## 🚀 Começando

Para executar o projeto, será necessário instalar os seguintes programas:

    * [Node.js](https://nodejs.org/en/)
    * [Git](https://git-scm.com/)
    * [Insomnia](https://insomnia.rest/)
    * [PostgreSQL](https://www.postgresql.org/)

### Clonando o projeto

Para iniciar o desenvolvimento, é necessário clonar o projeto do GitHub num diretório de sua preferência:

```
git clone https://github.com/fernandodluccas/desafio-xp.git
cd desafio-xp
```   

### 🔧 Instalação


Fazer o download do pacote de instalação:

```bash
npm install
```

Iniciar o servidor:

```bash
npm run dev
```

Rodar as migrations:

```bash
npx primise db migrate
```


### Iniciando a aplicação com Docker

Tambem é possível iniciar o projeto com o Docker:

```bash
docker-compose up
```
esse comando irá iniciar o servidor e o banco de dados dentro de um container chamado `desafio-xp`.



## 📦 Desenvolvimento

A api foi desenvolvida utilizando o framework [Express](https://expressjs.com/).

## 🛠️ Construído com

Alemdo do framework Express, a API foi construída com 

* [TypeScript](https://www.typescriptlang.org/). O TypeScript é um transpiler de código fonte para código JavaScript.
* 
* [Prisma](https://www.prisma.io/). O Prisma é um ORM de banco de dados .
* [PostgreSQL](https://www.postgresql.org/). O PostgreSQL é um banco de dados relacional.
* [Joi](https://www.npmjs.com/package/joi). O Joi é uma bibiblioteca de validação de dados.
* [Bcrypt](https://www.npmjs.com/package/bcrypt). O Bcrypt é uma biblioteca de criptografia.
* [JWT](https://www.npmjs.com/package/jsonwebtoken). O JWT é uma biblioteca de autenticação.
* [Swagger](https://www.npmjs.com/package/swagger-ui). O Swagger é uma biblioteca de documentação.


## 📚 Documentação


 [#/api-docs](https://fathomless-anchorage-76180.herokuapp.com/api-docs)
