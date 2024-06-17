# Backend Challenge

Desafio da criação de um chat utilizando WebSocket e TypeScript

## Como rodar a aplicação?

```bash
#   Clone este repositório

Antes de iniciar, copie o arquivo env.example para raiz do projeto com nome .env.

Após execute o comando:

    $ docker-compose up

Caso tenha algum problema, utilize o comando:
    $ docker-compose down -v

E execute o primeiro passo novamente

Caso mantenha os dados da env.example
    $ A Api deve se iniciar na porta 3000 do seu localhost
    $ O banco de dados deve se iniciar na porta 5432 do seu localhost
```

## Como utilizar as APIs?

Após a inicialização do projeto, utilize a ferramente de requisições HTTP de sua preferência, chamando alguma das rotas a seguir.

### /register

Essa rota tem como funcionalidade realizar o cadastro de um novo usuário na aplicação, para essa ação ser realizada com sucesso é necessário passar os seguintes dados no seu **body**.

```
    user - O nome que o usário será identificado
    password - A senha necessária para realizar o seu login posterior
    confirmPassword - A confirmação da senha acima, para garantir a securidade da mesma.

    Todos os dados são do tipo String
```

A mesma irá retornar o **user** e a **password** cadastrada

### /login

Essa rota tem a funcionalidade de realizar a criação do token de autenticação do usuário, para isso é necessário passar o **user** e a **password** no **body** da requisição.

Após isso será retornado um token nesse formato:

```
    $ "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg2MzM5NzQsImV4cCI6MTcxODYzNDI3NCwic3ViIjoiY2hyMG51cyJ9.6lETKEmc3sn6J6kPpcSh-UcbbzNGVFuIgg1HHzWSvjM"
```

### **Esse token é necessário para a utilização das proximas rotas**

### /sendMessage

A rota tem como funcionalidade o envio de mensagens ao websocket e precisa dos seguintes dados para isso, no **body** da requisição.

```
    user - usuário previamente cadastrado
    message - o contéudo da mensagem que gostaria que fosse enviado
    room - a sala que gostaria que essa mensagem fosse enviada

    Caso não utilize nenhuma room a mensagem será enviada para todos
```

### /createRoom

Essa rota tem como funcionalidade a criação de salas para conversa, para a utilização dessa rota é necessário passar os seguintes dados no **body** da requisição

```
    user - usuário previamente cadastrado
    room - nome da sala que deseja criar
```

Para a utilização de ambas rotas, é necessário a utilização do token gerado anteriormente, para isso passe o token no **header** da requisição, passando a **key** **Authorization**, da seguinte forma:

```
    Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg2MDIwMDAsImV4cCI6MTcxODYwMjMwMCwic3ViIjoiY2hyMG51cyJ9.IwOXn8Ws2BCEEcFRZ0-Kzu9NOHDaNnKgdOm0jMZjtdI
```

## O banco de dados está estruturado dessa forma

[Database](https://imgur.com/a/g2yuVP1)
