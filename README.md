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



-------

#referencia
https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction#5-evolving-your-application

###adicione o prisma em seu projeto com 
-> yarn add prisma


##logo após execute

-> npx prisma init --datasource-provider postgresql

após executar esse comado será criado prisma/schema.prisma com as configurações para o postgres

#também será criado um arquivo .env na raiz do seu prejeto com a seguinte variavel de ambiente
-> DATABASE_URL: postgresql://username:password@localhost:5432/mydb?schema=public

#deve adicionar no arquivo prisma/schema.prisma o seguinte código
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String?
  passwrod String
  Post     Task[]  @relation("UserOnTask")
}

model Task {
  id        Int     @id @default(autoincrement())
  user_id   Int
  content   String?
  user      User    @relation("UserOnTask", fields: [user_id], references: [id], onDelete: Cascade)
}



#adicione a biblioteca @prisma/client
-> yarn add @prisma/client

#crie um arquivo src/database/prisma.ts e coloque o sequinte código
import { PrismaClient } from '@prisma/client/edge';
export const prisma = new PrismaClient();

#após isso baixe o docker para o seu computador eo configure

#crie um arquivo chamado docker-compose.yml na raiz do seu projeto com o seguinte código nele
version: '3'

services:
  postgresql:
    container_name: postgresql
    image: postgis/postgis:13-3.1-alpine
    restart: always
    volumes:
      - /pg_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${DATABASE_USER}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
      POSTGRES_DB: ${DATABASE_DB}

##e adicione o seguitne codigo no arquivo .env

DATABASE_USER="root"
DATABASE_PASSWORD="root"
DATABASE_DB="root"

#ative o docker em sua maquina e após execute o seguinte código na raiz do seu projeto em um terminal
-> docker-compose up 

-irá estartar o banco de dados postgress já configurado e pronto para ser conectado

#para sincronizar o prisma com o seu banco de dados deve ser executado o seguinte comando
-> npx prisma db push

#caso tenha feito alguma alteração no schema do prisma em prisma/schema.prisma deve executar o comando abaixo para gerar a migration
-> npx prisma generate

##para acessar o banco você pode usar o prisma studio com o seguinte comando
-> npx prisma studio

#proximos passos, deve ser criado o arquivo /src/routes/users.ts
import express from 'express';
import { prisma } from '../database/prisma';

export const router = express.Router();

router.get('/users', async function (req, res) {
  const users = await prisma.user.findMany();

  res.json({ users });
});

router.get<{ id: number }>('/users/:id', async function (req, res) {
  const user = await prisma.user.findUnique({ 
    where: { id: req.params.id },
  });

  res.json({ user });
});

router.post<{}, {}, { email: string, passwrod: string }>('/users', async function (req, res) {
  const user = await prisma.user.create({ 
    data: { ...req.body },
  });

  res.json({ user });
});

router.put<{ id: number }, {}, { name?: string }>('/users/:id', async function (req, res) {
  const user = await prisma.user.update({ 
    where: { id: req.params.id },
    data: { ...req.body },
  });

  res.json({ user });
});

router.delete<{ id: number }>('/users/:id', async function (req, res) {
  const user = await prisma.user.delete({ 
    where: { id: req.params.id },
  });

  res.json({ user });
});

#também deve ser criado um arquivo src/routes/tasks.ts
import express from 'express';
import { prisma } from '../database/prisma';

export const router = express.Router();

router.get('/tasks', async function (req, res) {
  const tasks = await prisma.task.findMany();

  res.json({ tasks });
});

router.get<{ id: number }>('/tasks/:id', async function (req, res) {
  const task = await prisma.task.findUnique({ 
    where: { id: req.params.id },
  });

  res.json({ task });
});

router.post<{}, {}, { user_id: number, content: string }>('/tasks', async function (req, res) {
  const task = await prisma.task.create({ 
    data: { ...req.body },
  });

  res.json({ task });
});

router.put<{ id: number }, {}, { content?: string }>('/tasks/:id', async function (req, res) {
  const task = await prisma.task.update({ 
    where: { id: req.params.id },
    data: { ...req.body },
  });

  res.json({ task });
});

router.delete<{ id: number }>('/tasks/:id', async function (req, res) {
  const task = await prisma.task.delete({ 
    where: { id: req.params.id },
  });

  res.json({ task });
});


#após importe no arquivo src/server.ts
import express from 'express';
import cors from 'cors';

import { router as users } from './routes/users';
import { router as tasks } from './routes/tasks';

const app = express();

app.use(cors());

app.use(express.json());

app.use(users);
app.use(tasks);

app.listen(80, () => {
  console.log('Server running in http://localhost:80/');
});

#execute o servidor com o comando yarn dev

#e use o postman para testar as rotas

#e use o prisma estudio com o comando npx prisma studio
