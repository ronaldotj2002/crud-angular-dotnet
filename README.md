# 🚀 CRUD de Pessoas — Angular + .NET

Aplicação **Full Stack** para gerenciamento de pessoas, desenvolvida com **Angular** no front-end e **.NET Web API** no back-end.

---

# 🧰 Tecnologias

### Front-end

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss)
![Signals](https://img.shields.io/badge/Angular-Signals-red)

* Angular 20
* TypeScript
* Angular Signals
* Reactive Forms
* TailwindCSS
* Component Architecture
* Paginação com `computed()`

---

### Back-end

![.NET](https://img.shields.io/badge/.NET-WebAPI-512BD4?logo=dotnet)
![CSharp](https://img.shields.io/badge/C%23-239120?logo=csharp)
![SQLServer](https://img.shields.io/badge/SQLServer-CC2927?logo=microsoftsqlserver)

* .NET Web API
* Entity Framework
* SQL Server
* REST API
* CORS

---

# 📌 Funcionalidades

✔ Cadastro de pessoas
✔ Listagem de pessoas
✔ Edição de pessoas
✔ Exclusão com confirmação
✔ Paginação
✔ Filtro de busca
✔ Modal de confirmação
✔ Toast de sucesso
✔ Loading de requisições

---

# 🧠 Conceitos aplicados

* Gerenciamento de estado com **Angular Signals**
* **Computed Signals** para paginação e filtros
* Arquitetura modular baseada em componentes
* Integração com **API REST**

---

# 📂 Estrutura do projeto

```
crud-pessoas
│
├── front-end
│   ├── components
│   │   ├── listar-pessoas
│   │   ├── cadastro-pessoa
│   │   └── paginacao
│   │
│   ├── models
│   ├── services
│   ├── shared
|   |    └── directives
|   |    └── paginacao
|   |    └── pipes
│   └── app.routes.ts
│
└── back-end
    ├── Controllers
    ├── Models
    ├── Data
    ├── Services
    └── Program.cs
```

# ▶ Como executar o projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/ronaldotj2002/crud-angular-dotnet.git
```

---

# 2️⃣ Rodar o Back-end

Entrar na pasta:

```
cd back-end
```

Executar:

```
dotnet run
```

API disponível em:

```
https://localhost:7184 ou http://localhost:5117
```

---

# 3️⃣ Rodar o Front-end

Entrar na pasta:

```
cd front-end
```

Instalar dependências:

```
npm install
```

Executar:

```
ng serve
```

Aplicação disponível em:

```
http://localhost:4200
```

---

# 📈 Melhorias futuras

* Autenticação com **JWT**
* Paginação **server-side**
* Testes unitários

---

# 👨‍💻 Autor

**Ronaldo Teixeira**
