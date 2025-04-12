# 🧾 Green Acesso - Backend

API Node.js desenvolvida com TypeScript, TypeORM e MySQL. Esta aplicação gerencia boletos e permite dividir arquivos PDF por página para associá-los a registros no banco de dados.

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

---

## ⚙️ Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 🐳 Subindo o ambiente com Docker

O banco de dados é iniciado via Docker. Siga os passos abaixo:

```bash
docker-compose up -d
````

##📦 Instalando dependências
Após clonar o repositório, instale as dependências com:

````bash
npm install
````

##🧱 Executando as migrations
````bash
npm run typeorm:run
````

##🏁 Iniciando a aplicação
`````bash
npm run dev
`````


📂 Organização dos Arquivos
.
├── boletos_divididos/       # PDFs gerados individualmente por boleto
├── data/                    # Pasta auxiliar (dados locais, se aplicável)
├── node_modules/            # Dependências do projeto
├── relatorios/              # Relatórios gerados (PDFs)
├── src/                     # Código-fonte principal
│   ├── apis/                # Lógica de negócio e controle da API
│   │   ├── boletos/         # CRUD e serviços relacionados a boletos
│   │   │   ├── boletos-controller.ts
│   │   │   ├── boletos-repository.ts
│   │   │   ├── boletos-service.ts
│   │   │   └── routes.ts    # Rotas relacionadas aos boletos
│   │   ├── lotes/           # Funcionalidades relacionadas a lotes de boletos
│   │   ├── upload-csv/      # Upload e processamento de arquivos CSV
│   │   └── upload-pdf/      # Upload e split de arquivos PDF
│   ├── config/              # Arquivos de configuração da aplicação
│   ├── database/            # Entidades e configurações do banco de dados
│   ├── routes/              # Registro e exportação das rotas da API
│   ├── app.ts               # Instância do Express e middlewares
│   ├── data-source.ts       # Configuração do TypeORM (DataSource)
│   └── server.ts            # Ponto de entrada do servidor
├── uploads/                 # Arquivos enviados temporariamente
├── .env                     # Variáveis de ambiente
├── .gitignore               # Arquivos/pastas ignorados pelo Git
├── docker-compose.yml       # Configuração do container Docker (PostgreSQL)
├── package.json             # Configurações e scripts do projeto
├── package-lock.json        # Lockfile do NPM
└── tsconfig.json            # Configurações do TypeScript



🧪 Testando a aplicação
Após subir o backend, você pode usar o Postman ou Insomnia para testar os endpoints. Se quiser, publiquei a documentação da API aqui:
🔗 [https://www.postman.com/maikolamaro/green-acesso/collection/tt01u27/api-green-acesso?action=share&creator=30347357&active-environment=30347357-0708a98b-6613-453d-afba-b5bfb7dbf0da]


