<div align="center">
<h1>🚀 Jitterbit Integration Challenge</h1>
<p><strong>API de Integração com Mapeamento de Dados e Persistência</strong></p>

</div>

📋 Sobre o Projeto

Esta API foi desenvolvida como parte do processo seletivo para Analista de Sistemas Júnior. O objetivo é servir como uma ponte de integração, recebendo dados em um formato legado (JSON em português) e transformando-os em um modelo moderno e tipado (em inglês) para persistência.

🧠 Data Transformation (Mapping)

O coração deste projeto é o mapeamento de campos realizado na camada de serviço. Esta lógica garante que sistemas distintos possam se comunicar perfeitamente.

📥 JSON de Entrada (Legado)

📤 Base de Dados (Moderno)

Tipo

numeroPedido

orderId

String (PK)

valorTotal

value

Float

dataCriacao

creationDate

DateTime

items.idItem

productId

Int

items.quantidadeItem

quantity

Int

items.valorItem

price

Float

🛠️ Configuração e Instalação

Siga os passos abaixo para rodar o projeto localmente no seu Windows 11:

Clonar e Instalar

git clone [https://github.com/RafaelRapozzo/JitterBitChallenge.git](https://github.com/RafaelRapozzo/JitterBitChallenge.git)

cd challenge-api

npm install


Banco de Dados (SQLite)
O projeto utiliza a versão 6 do Prisma para máxima portabilidade.

npx prisma migrate dev --name init


# Execução

npm run start:dev


🧪 Testes Unitários (Opcional Implementado)

A lógica de mapeamento foi validada através de testes automatizados para garantir a integridade da integração.

# Executar todos os testes
npm run test

# Executar em modo watch
npm run test:watch


📖 Documentação Interativa

Uma vez que a aplicação esteja rodando, você pode testar todos os endpoints através do Swagger UI:

👉 http://localhost:3000/api

Dica: No Swagger, utilize a opção "Try it out" no endpoint POST /orders para ver o mapeamento em tempo real.

🏗️ Arquitetura Resumida

Controllers: Gerenciamento de rotas e documentação Swagger.

Services: Onde reside a lógica de negócio e o mapping dos dados.

Prisma: Camada de persistência segura e tipada.

DTOs: Definição rigorosa da estrutura de dados de entrada.

Docker: Containerização para facilitar o deploy e escalabilidade.

<div align="center">
<sub>Desenvolvido com ❤️ para o processo seletivo Jitterbit.</sub>
</div>
