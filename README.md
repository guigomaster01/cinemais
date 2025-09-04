
# Cinemais API

Esta é uma API RESTful para gerenciar um catálogo de filmes e séries, e a lista de favoritos de usuários para uma nova plataforma de streaming fictícia, a "Cinemais".

---

## Tecnologias Utilizadas

- #### Node.js com NestJS
- #### TypeScript
- #### class-validator e class-transformer (validação de dados)
- #### Jest (testes unitários)
- #### Swagger (documentação automática)

---
#### Optei pelo NestJS porque:

- Fornece uma arquitetura modular e escalável por padrão;
- Tem suporte nativo a TypeScript;
- Facilita integração com validação, testes e documentação;
- É amplamente usado em projetos profissionais de back-end Node.js.
---

## Como Rodar o Projeto
#### Para rodar localmente:
```bash 
# instalar dependências
npm install

# rodar em modo dev
npm run start:dev
```
O servidor vai rodar em:
```bash
http://localhost:3000
```
Documentação Swagger:
```bash
http://localhost:3000/api
```
#### Roda com docker:
```bash
docker-compose up --build
```
---
## Rodar Testes
```bash
# testes unitários
npm run test

# modo watch
npm run test:watch
```
---
## Endpoints
### Mídias (/media)
#### Criar mídia
```bash
POST /media
Content-Type: application/json

{
  "title": "Matrix Genérica",
  "description": "Um dev descobre que o mundo é uma simulação e precisa debugá-lo.",
  "type": "movie",
  "releaseYear": 2025,
  "genre": "Ficção Científica"
}
```
✔️ 201 Created → Retorna a mídia criada

#### Listar mídias
```bash
GET /media
```
✔️ 200 OK → Retorna todas as mídias

#### Buscar mídia por ID
```bash
GET /media/{id}
```
✔️ 200 OK → Retorna a mídia

❌ 404 Not Found → Se não existir

### Favoritos (/users/{userId}/favorites)
#### Adicionar favorito
```bash
POST /users/1/favorites
Content-Type: application/json

{
  "mediaId": "uuid-da-midia"
}
```
✔️ 204 No Content → Operação bem-sucedida

❌ 404 Not Found → Se a mídia não existir

#### Listar favoritos
```bash
GET /users/1/favorites
``` 
✔️ 200 OK → Retorna mídias favoritas do usuário

#### Remover favorito
```bash
DELETE /users/1/favorites/{mediaId}
```
✔️ 204 No Content

### Próximos Passos (possíveis melhorias)

- Persistência em banco de dados (Postgres/Mongo) via TypeORM ou Mongoose
- Validações ainda mais robustas (ex: Joi/Zod)
- Middleware de autenticação de usuários
- Testes de integração (e2e)

---

##### Desenvolvido por Rodrigo Ferreira Rodrigues como parte de um Teste Técnico para Back-End Júnior.