import express, { request, response } from "express";

const servidor = express();

servidor.use(express.json());

//Inicializando o projeto

//Criação dos usuários;
const usuarios = [];

servidor.post('/usuarios', (request, response)=>{
    const usuario = request.body;

    usuarios.push({
        id:Math.floor(Math.random()*234), 
        nome:usuario.nome, 
        email:usuario.email, 
        senha:usuario.senha
    });
    response.status(201).json("Usuário criado com sucesso");
})

//Leitura de todos os usuários
servidor.get('/usuarios', (request, response)=>{
    response.status(200).json(usuarios)
})

servidor.listen(3030, ()=>console.log("Servidor rodando"))

//Leitura de um usuário por ID
servidor.get('/usuarios/:id', (request, response)=>{
    const id = Number(request.params.id);
    const usuario = usuarios.find(usuario => usuario.id===id);
    response.json(usuario);
})

//Atualizar usuário por ID
servidor.put('/usuarios/:id', (request, response)=>{
    const usuario = request.body;
    const id = Number(request.params.id);
    const indexUsuario = usuarios.findIndex(usuario => usuario.id===id);
    usuarios[indexUsuario] = {
        id: id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
    };

    response.status(200).json(usuarios[indexUsuario]);
})

//Deletar usuário por ID
servidor.delete('/usuarios/:id', (request, response)=>{
    const id = Number(request.params.id);
    const indexUsuario = usuarios.findIndex(usuario => usuario.id === id);
    usuarios.splice(indexUsuario, 1);
    return response.status(200).json();
})