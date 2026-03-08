> 🚀 **Jitterbit** **Integration** **Challenge**

**API** **de** **Integração** **com** **Mapeamento** **de** **Dados**
**e** **Persistência**

📋**Sobre** **o** **Projeto**

Esta API foi desenvolvida como parte do processo seletivo para
**Analista** **de** **Sistemas** **Júnior**. O objetivo principal é
atuar como uma camada de integração (Middleware), recebendo dados em um
formato legado (JSON em português) e transformando-os em um modelo
moderno, tipado e padronizado em inglês para persistência em base de
dados.

🧠 **Data** **Transformation** **(Mapping)**

O coração deste projeto é a camada de serviço, onde ocorre o mapeamento
de campos. Essa lógica garante que sistemas distintos com nomenclaturas
diferentes se comuniquem perfeitamente.

> **De** **(JSON** **Legado)**
>
> numeroPedido
>
> valorTotal
>
> dataCriacao
>
> items.idItem
>
> items.quantidadeItem
>
> items.valorItem

🛠 **Configuração** **e** **Instalação**

**Para** **(Base** **de** **Dados)**

> orderId
>
> value
>
> creationDate
>
> productId
>
> quantity
>
> price

**Tipo**

String (PK)

Float

DateTime

Int

Int

Float

Siga os passos abaixo para rodar o projeto localmente (Testado em
Windows 11):

**1.** **Clonar** **e** **Instalar**

> git clone
> \[https://github.com/RafaelRapozzo/JitterBitChallenge.git\](https://githu
> cd challenge-api npm install

<<<<<<< HEAD
**2.** **Configurar** **Variáveis** **de** **Ambiente**
=======
git clone [https://github.com/RafaelRapozzo/JitterBitChallenge.git](https://github.com/RafaelRapozzo/JitterBitChallenge.git)

cd challenge-api

npm install
>>>>>>> d9ad4375076e254137c909ce99f5f8330e905285

Crie um arquivo chamado .env na raiz do projeto e adicione a URL do
banco SQLite:

> DATABASE_URL="file:./dev.db"

**3.** **Banco** **de** **Dados** **(Prisma** **&** **SQLite)**

Utilizei o **Prisma** **6** para garantir portabilidade. Execute os
comandos para gerar o cliente e rodar as migrações:

> npx prisma generate
>
> npx prisma migrate dev --name init

**4.** **Execução**

> \# Modo de desenvolvimento npm run start:dev

🧪 **Testes** **Automatizados**

A lógica de mapeamento e os endpoints foram validados com testes para
garantir a integridade da integração.

> \# Executar todos os testes npm run test
>
> \# Executar em modo watch npm run test:watch

📖 **Documentação** **Interativa** **(Swagger)**

Com a aplicação rodando, aceda à documentação completa e teste os
endpoints em tempo real:

> 👉
> [**<u>http://localhost:3000/api</u>**](https://www.google.com/search?q=http://localhost:3000/api)
>
> **Dica:** No Swagger, utilize a opção **"Try** **it** **out"** no
> endpoint POST /orders para observar o mapeamento de dados automático.

🏗 **Arquitetura** **do** **Sistema**

> **NestJS:** Framework base para uma estrutura modular e escalável.
>
> **TypeScript:** Garantia de tipagem estática e redução de bugs em
> tempo de desenvolvimento.
>
> **Controllers:** Gestão de rotas e documentação.
>
> **Services:** Camada onde reside a inteligência do **Mapping** e
> regras de negócio.
>
> **Prisma** **ORM:** Persistência de dados segura e performática.
>
> **DTOs:** Validação rigorosa dos dados de entrada (Payload).

Desenvolvido com ❤ para o processo seletivo **Jitterbit**.
