// axios = biblioteca para fazer as requisições
import axios from 'axios';

const  api = axios.create({
    // a base da url que nunca vai mudar
    /* 
    como estamos usando uma api já requerida que não vai mudar
    então estamos usando o IPv4 da minha máquinha (onde o arquivo está)
    [a requisição JSON está em /servises/server.json]
    */
    baseURL: 'http://192.168.25.8:3333',
});

// exportar como padrão a api 
export default api;

/* 
    precisa baixar o json-server na máquina(de forma global) pra fazer isso local
        "npm install -g json-server"
    e dps na pasta do projeto rodar:
        "json-server {seu local de arquivo, nesse caso: ./src/services/server.json} --host {seu ip} --port {sua porta, normalmente 3333}"
*/