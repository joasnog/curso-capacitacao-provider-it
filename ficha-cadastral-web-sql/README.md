# Documentação do Projeto

Esta documentação tem como objetivo detalhar o funcionamento do projeto "Ficha Cadastral com Banco de dados WebSQL", do curso de capacitação da Provider It.

Foram usados as tecnologias: HTML, CSS e JavaScript.

## Preview

![screenshot](https://github.com/joasnog/curso-capacitacao-provider-it/blob/master/ficha-cadastral-web-sql/screenshots/screenshot.png)
![screenshot](https://github.com/joasnog/curso-capacitacao-provider-it/blob/master/ficha-cadastral-web-sql/screenshots/screenshot_2.png)

## Nomenclatura de Tabela e Colunas

Em todo este projeto foi seguido a convenção de nomenclatura: Inglês, minúsculo e snake case para a nomenclatura do db, da tabela e das colunas.
Então foi usado o nome users_db para o db e users para a tabela. As colunas são: name, rg, cpf, cep, address, sex, birthday, marital_status.

## Modelagem do Banco de Dados

O banco de dados que foi modelado foi do tipo relacional, uma estrutura simples para ser usada com a API WebSQL do JavaScript.

### Tabelas

---

- users: Persiste os dados de um usuário: Nome, CEP, Endereço, CPF, RG, Data de Nascimento, Sexo e Situação Civil.

### Estrutura

---

A tabela **users** possui as seguintes colunas:

| Coluna         | Tipo                              |
| -------------- | --------------------------------- |
| id             | INTEGER PRIMARY KEY AUTOINCREMENT |
| nome           | TEXT NOT NULL                     |
| rg             | TEXT NOT NULL                     |
| cpf            | TEXT NOT NULL                     |
| cep            | TEXT NOT NULL                     |
| address        | TEXT NOT NULL                     |
| sex            | TEXT NOT NULL                     |
| birthday       | TEXT NOT NULL                     |
| marital_status | TEXT NOT NULL                     |

> Os tipos INTEGER e TEXT representam um número inteiro e uma cadeia de caracteres (string) respectivamente. Além disso a palavra chave NOT NULL é uma restrição que o valor não pode ser nulo, já que todos os campos são requeridos. PRIMARY KEY representa uma identificação única para cada registro e o AUTOINCREMENT serve para autoincrementar esta identificação automaticamente.

## Como rodar

Para rodar o projeto basta executar o arquivo _index.html_.

## Autor

Idelfonso Joás de F. Nogueira.
