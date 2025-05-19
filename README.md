![Logo](/undraw_graduation_u7uc.png)

# 🎓 I Learning

API REST para uma plataforma de cursos por assinatura, desenvolvida com Node.js, Fastify, Zod e Prisma. A aplicação está organizada em módulos, seguindo boas práticas de Clean Code.

<div align="center">
  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mariaseverino/learning?color=6C63FF&logoColor=6C63FF&style=for-the-badge">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mariaseverino/learning?color=6C63FF&logoColor=6C63FF&style=for-the-badge">
  </p>
</div>

## ✨ Funcionalidades

-   Cadastro e autenticação de usuários
-   Criação, listagem, atualização e exclusão de:
    -   Categorias
    -   Cursos
    -   Aulas
    -   Instrutores
-   Matrícula e progresso de estudantes em cursos
-   Validações robustas com Zod
-   Autenticação com JWT + refresh token
-   Middleware de autorização
-   Documentação com Swagger

## 🧰 Stack utilizada

-   **Node.js**
-   **Fastify**
-   **Prisma (ORM)**
-   **Zod** (validação de dados)
-   **JWT** (autenticação)
-   **Swagger** (documentação da API)
-   **TypeScript**

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`JWT_SECRET`

## 💻 Instalação

Instale my-project com npm

```bash
# Clone o repositório
git clone https://github.com/mariaseverino/learning.git
cd learning

# Instale as dependências
npm install

# Rode as migrations do Prisma
npx prisma migrate dev

# Inicie o servidor
npm run dev
```
