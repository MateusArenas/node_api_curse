#Iniciando projeto

-> yarn init -y

#Instalação do typescript como dependência de desenvolvimento

-> yarn add typescript -D

#Iniciar as configurações do Typescript

-> npx tsc --init

#Trocar o target para es2020

- devido ao node suportar features mais recentes do javascript.
- assim não precisa converter o código para uma versão mais antiga.

+ "target": "es2020", 


#Instalação da dependência de desenvolvimento tsx

-> yarn add tsx -D


#Criar um arquivo src/server.ts

```
interface Props {
  init: boolean;
}

function main(props: Props) {
  console.log(props);
}

main({ init: true });
```

#Ir em package.json e criar um srcipt executavel

"scripts": {
  + "dev": "tsx src/server.ts"
},


#para executar basta executar 

-> yarn dev

#para executarmos com um wacther, basta fazer isso:

  "scripts": {
    + "dev": "tsx watch src/server.ts",
    "build": "tsup src",
    "start": "node dist/server.js"
  },

#para executar com watcher basta executar 

-> yarn dev


#Agora para rodar o nosso código em produção precisamos gerar um build

#iremos usar a lib tsup como dependência de desenvolvimento
- somente assim o node executa a nossa aplicação em produção.
- evita processamento desnecessario

-> yarn add tsup -D

# Agora adicionar no package.json build

  "scripts": {
    "dev": "tsx src/server.ts",
    + "build": "tsup src"
  },

# após fazer isso, basta executar

-> yarn build

# Agora adicione no package.json um executavel chamado start

  "scripts": {
    "dev": "tsx src/server.ts",
    "build": "tsup src",
    + "start": "node dist/server.js"
  },


############################



#Para criarmos a nossa API iremos usar a biblioteca expres.js, então vamos adiciona-la em nosso projeto com

-> yarn add express

#Em seguida iremos adicionar como dependencia de desenvolvedor os types do express para um melhor uso com typescript

-> yarn add @types/express -D

#após vá em src/server.ts e coloque esse código abaixo em nosso arquivo

import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(80, () => {
  console.log('Server running in http://localhost:80/');
});

#e após execute esse comando

-> yarn dev

#vá para o seu navegador e escreva na barra superior

-> http://localhost/

#irá retornar em seu navegador o seguinte texto

'hello world'

#em seguida iremos configurar o cors
- ele serve para dizer quem tem acesso a nossa api

#adicione em seu projeto

-> yarn add cors

#e após vamos adicionar os types do cors

-> yarn add @types/cors -D

#em seguida mude seu código para

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(80, () => {
  console.log('Server running in http://localhost:80/');
});



#Roteamento com Express.js: Mapeando Endpoints

#para uma melhor compreenção accesse o link abaixa do documentação do express.js

-> https://expressjs.com/pt-br/guide/routing.html

#crie um arquivo src/routes/tasks.ts e adicione o seguinte código

import express from 'express';

export const router = express.Router();

router.get('/tasks', function (req, res) {
  res.send('Get tasks');
});

router.get('/tasks/:id', function (req, res) {
  res.send('Get task: ' + req.params.id);
});

router.post('/tasks', function (req, res) {
  res.send('Create task: ' + JSON.stringify(req.body));
});

router.put('/tasks', function (req, res) {
  res.send('Update task: ' + JSON.stringify(req.body));
});

router.delete('/tasks/:id', function (req, res) {
  res.send('Delete task: ' + req.params.id);
});


#em src/server.ts adicionar o senguinte código

import express from 'express';
import cors from 'cors';

import { router as tasks } from './routes/tasks';

const app = express();

app.use(cors());

app.use(tasks);

app.listen(80, () => {
  console.log('Server running in http://localhost:80/');
});

#após instale o postman e teste as rotas

GET http://localhost/tasks
GET http://localhost/tasks/1
POST http://localhost/tasks
- body
PUT http://localhost/tasks/1
- body
