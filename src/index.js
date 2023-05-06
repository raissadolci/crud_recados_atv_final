import express, { response } from "express";

const servidor = express();

servidor.use(express.json());

//Inicializando o projeto

//Criação dos usuários;
const usuarios = [];

servidor.post('/usuarios', (request, response)=>{
    const usuario = request.body;

    usuarios.push({
        id:Math.floor(Math.random()*234), nome:usuario.nome, email:usuario.email, senha:usuario.senha
    });
    response.status(201).json("Usuário criado com sucesso");
})

//Leitura dos usuários
servidor.get('/usuarios', (request, response)=>{
    response.status(200).json(usuarios)
})

servidor.listen(3030, ()=>console.log("Servidor rodando"))


