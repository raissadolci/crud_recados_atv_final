//Inicializando o projeto
import express from "express";
import bcrypt, { hash } from "bcrypt";
const servidor = express();
servidor.use(express.json());


//Criação dos usuários;
const usuarios = [];

servidor.post('/usuarios', (request, response)=>{
    const usuario = request.body;
    const saltRounds = 10;

    bcrypt.hash(usuario.senha, saltRounds, function(err, hash){
        if(hash) {
            usuarios.push({
                id:Math.floor(Math.random()*234), 
                nome:usuario.nome, 
                email:usuario.email, 
                senha:hash
            });
            return response.status(201).json("Usuário criado com sucesso");
        } else {
            return response.status(400).json("Não foi possível criar o usuário, informe os dados necessários corretamente" + err)
        }
    })

});


//Login do usuário


//Leitura de todos os usuários
servidor.get('/usuarios', (request, response)=>{
    return response.status(200).json(usuarios)
})


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
        senha: usuario.hash
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

servidor.listen(3030, ()=>console.log("Servidor rodando"));
