# NLW5

## 📄 Projeto

Feito em conjunto com a [Rocketseat](https://rocketseat.com.br/), durante Next Level Week 5 e modificado por [Luan Zacarias](https://github.com/Luanzacarias).
"Plant Manager", aplicativo para informar sobre plantas e ajudar com lembretes para cuidar delas.

![Plant Manager](https://github.com/rodrigorgtic/plantmanager/blob/main/capa.png?style=flat)

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- React Native
- Typescript
- Expo
- Expo Local Notifications
- Async Storage
- Vector Icons
- Axios
- Date Fns
- Lottie
- Expo Google Fonts
- React Navigation Stack e Bottom Tabs
- React Native Gesture Handler
- Json Server

## Features

- Salva a identificação do usuário no próprio dispositivo o usuário;
- Consome de API os dados e características de cada planta;
- Salva localmente a planta que o usuário possue;
- Lembra o usuário quando regar e cuidar da plantinha de acordo com a frequência ideial das plantas que o usuário possui;

## Layout 

Acesse o layout do aplicativo [aqui](https://www.figma.com/file/kdibN6T9EeDRw6qR5IunRS/PlantManager-(Copy)?node-id=0%3A1).

## Execusão

Utilize o yarn ou o npm install para instalar as depedências do projeto. Em seguida, inicie o projeto e a API fake com o Json Server.

```
  expo start
  json-server ./src/services/server.json --host 192.168.1.4 --port 3333 --delay 700
```

Substitua o host pelo seu endereço IP local. Faça o mesmo no arquivo API dentro de services.

```js
import axios from 'axios';

const api = axios.create({
   baseURL: 'http://192.168.1.4:3333',
});

export default api;
```

## Créditos

Créditos ao [Rodrigo Gonçalves](https://github.com/rodrigorgtic) pela maioria das informações desse arquivo.
