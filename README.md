API de Integração - Desafio Jitterbit

Esta API foi desenvolvida para o processo seletivo de Analista de Sistemas Júnior. O foco principal é a integração de dados entre um sistema legado (JSON de entrada) e uma base de dados moderna (SQLite via Prisma).

🧠 Lógica de Integração (Mapping)

A API recebe dados num formato específico e transforma-os antes da persistência. Abaixo está a tabela de tradução de campos implementada no OrdersService:

JSON Original (Entrada)

Campo no Banco de Dados

numeroPedido

orderId (PK)

valorTotal

value

dataCriacao

creationDate

items.idItem

productId

items.quantidadeItem

quantity

items.valorItem

price

🛠️ Tecnologias

Framework: NestJS

ORM: Prisma (v7+)

Base de Dados: SQLite

Documentação: Swagger (disponível em /api)

🚀 Como testar

Clone o repositório.

Instale as dependências: npm install.

Configure a URL no .env: DATABASE_URL="file:./dev.db".

Execute as migrações: npx prisma migrate dev.

Inicie a API: npm run start:dev.

Use o Swagger em http://localhost:3000/api para enviar o JSON de teste.
