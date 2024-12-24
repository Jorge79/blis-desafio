# Blis prova back-end

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeSJ](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

This project is an API built using **TypeScript, Express and MySQL as the database.** 

The API was developed for a backend test and to demonstrate my profiency.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository:

```bash
https://github.com/Jorge79/blis-desafio.git
```

2. Install dependencies with npm

## Configuration


### Configuração do Banco de Dados
```
Formato: mysql://usuario:senha@host:porta/nome_do_banco
DATABASE_URL=mysql://user:password@localhost:3306/database_name
```

### Chave secreta para geração de JWT (JSON Web Token)
```
Deve ser uma string longa e aleatória
JWT_SECRET=jwt_secret_key
```

### Salt para criptografia bcrypt
```
Deve ser uma string aleatória
BCRYPT_SALT=bcrypt_salt
```

## API Endpoints
The API provides the following endpoints:

*The URL is hhtp://localhost:3000*

**POST USERS**
```markdown
POST /users - Register a new user into the App.
```
```json
{
    "firstName": "Lucas",
    "lastName": "Silva",
    "password": "senha",
    "document": "123456783",
    "email": "lucas@example.com",
    "userType": "COMMON",
    "balance": 10
}
```
Response
```json
{
    "message": "Usuário criado com sucesso",
    "user": {
        "id": "1b71be10-4847-49ee-b792-0e0d349439e5",
        "name": "user123",
        "email": "user123@gmail.com",
        "birthdate": "1990-05-15T00:00:00.000Z",
        "created_at": "2024-12-23T23:15:26.624Z"
    }
}
```

**POST USER LOGIN**
```markdown
POST /users/login - Login an user.
```
```json
{
  "email": "user123@gmail.com",
  "password": "user123"
}
```
Response
```json
{
    "message": "Login realizado com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYjcxYmUxMC00ODQ3LTQ5ZWUtYjc5Mi0wZTBkMzQ5NDM5ZTUiLCJpYXQiOjE3MzQ5OTYyMTMsImV4cCI6MTczNTA4MjYxM30.U2Mc1xwqBAdu4XH64nxYrY1pzMGHCzIaXWbZ-Vf5i1w",
    "user": {
        "id": "1b71be10-4847-49ee-b792-0e0d349439e5",
        "name": "user123",
        "email": "user123@gmail.com"
    }
}
```

**GET USERS**
```markdown
GET /users - List all registered users.
It's necessary use the Bearer Token (Found in the previously route) to authenticate into this route
```

Response
```json
[
    {
        "id": "1b71be10-4847-49ee-b792-0e0d349439e5",
        "name": "user123",
        "email": "user123@gmail.com",
        "birthdate": "1990-05-15T00:00:00.000Z"
    }
]
```

**POST ABILITIES**
```markdown
POST /abilities - Create an ability.
```
```json
{
    "name": "developer"
}
```
Response
```json
{
    "id": "6cc914ea-bf9d-4848-83f6-74399077c6c1",
    "name": "developer",
    "active": true,
    "created_at": "2024-12-23T23:34:26.708Z",
    "updated_at": "2024-12-23T23:34:26.708Z"
}
```

**GET ABILITIES**
```markdown
GET /abilities - List all abilities.
```
Response
```json
[
    {
        "id": "6cc914ea-bf9d-4848-83f6-74399077c6c1",
        "name": "developer",
        "active": true
    }
]
```

**POST USER ABILITIES**
```markdown
POST /users/abilities - Regiter an ability to an user.
```
```json
{
    "user_id": "1b71be10-4847-49ee-b792-0e0d349439e5",
    "ability_id": "6cc914ea-bf9d-4848-83f6-74399077c6c1",
    "years_experience": 2
}
```
Response
```json
{
    "id": "c94be38f-1079-4972-99dc-0cf1a3aac6e3",
    "years_experience": 2,
    "created_at": "2024-12-23T23:38:34.671Z",
    "user": {
        "id": "1b71be10-4847-49ee-b792-0e0d349439e5",
        "name": "user123"
    },
    "ability": {
        "id": "6cc914ea-bf9d-4848-83f6-74399077c6c1",
        "name": "developer"
    }
}
```

**GET USER ABILITIES**
```markdown
GET /users/abilities - List all users with their abilities.
```

Response
```json
{
    "data": [
        {
            "id": "c94be38f-1079-4972-99dc-0cf1a3aac6e3",
            "years_experience": 2,
            "created_at": "2024-12-23T23:38:34.671Z",
            "updated_at": "2024-12-23T23:38:34.671Z",
            "user": {
                "id": "1b71be10-4847-49ee-b792-0e0d349439e5",
                "name": "user123",
                "email": "user123@gmail.com",
                "birthdate": "1990-05-15T00:00:00.000Z",
                "created_at": "2024-12-23T23:15:26.624Z",
                "updated_at": "2024-12-23T23:15:26.624Z"
            },
            "ability": {
                "id": "6cc914ea-bf9d-4848-83f6-74399077c6c1",
                "name": "developer",
                "active": true,
                "created_at": "2024-12-23T23:34:26.708Z",
                "updated_at": "2024-12-23T23:34:26.708Z"
            }
        }
    ],
    "meta": {
        "total": 7,
        "page": 1,
        "limit": 10,
        "totalPages": 1,
        "hasNextPage": false,
        "hasPreviousPage": false
    }
}
```

**DELETE USER ABILITIES**
```markdown
DELETE /users/abilities - Delete a registered user's ability.
```
```json
{
    "user_id": "1b71be10-4847-49ee-b792-0e0d349439e5",
    "abilities_ids": ["6cc914ea-bf9d-4848-83f6-74399077c6c1"]
}
```
Response
```json
{
    "message": "Uma ou mais habilidades removidas com sucesso"
}
```


## Database
The project utilizes [MySQL](https://www.mysql.com/) as the database. 
