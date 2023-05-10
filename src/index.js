//Inicializando o projeto
import express, { request, response } from "express";
import bcrypt, { hash } from "bcrypt";
const servidor = express();
servidor.use(express.json());


//Criação dos usuários com validação de email;
const usuarios = [];


servidor.post('/usuarios',  (request, response)=>{
    const usuario = request.body;
    const saltRounds = 10;
    const emailExistente = usuario.email

    const email = usuarios.find(usuarios => usuarios.email === emailExistente);
    if (email) {
        return response.status(400).json('Esse email já existe!')
    };

    bcrypt.hash(usuario.senha, saltRounds, function(err, hash){
        if(hash) {
            usuarios.push({
                id:Math.floor(Math.random()*234), 
                nome:usuario.nome, 
                email:usuario.email, 
                senha:hash,
                recados: []
            });
            return response.status(201).json("Usuário criado com sucesso");
        } else {
            return response.status(400).json("Não foi possível criar o usuário, informe os dados necessários corretamente" + err)
        };
    });
});


//Login do usuário com validção de email e senha
servidor.post('/usuarios/login', (request, response)=>{
    const login = request.body;
    const email = login.email;
    const senha = login.senha;

    const usuario = usuarios.find(usuarios => usuarios.email === email);
    if (!usuario) {
        return response.status(400).json('Informe um email válido')
    }
    bcrypt.compare(senha, usuario.senha, function(err, result) {
        if(result){
            return response.status(200).json("Login efetuado com sucesso");
        } else {
            return response.status(401).json("Verifique os dados informados");
        }
    });
});

//Leitura de todos os usuários 
servidor.get('/usuarios', (request, response)=>{
    return response.status(200).json(usuarios)
});


//Leitura de um usuário por ID
servidor.get('/usuarios/:id', (request, response)=>{
    const id = Number(request.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (!usuario) {
        return response.json('Digite um ID válido')
    } else {
        return response.status(200).json(usuario);
    }

});


//Inicio do CRUD de recados

//Criação dos recados
servidor.post('/usuarios/:id/recado', (request, response)=>{
    const recado = request.body;
    const id = Number(request.params.id);

    const idUsuario = usuarios.findIndex(usuario => usuario.id === id)

    usuarios[idUsuario].recados.push({
        idRecado:Math.floor(Math.random()*365), 
        titulo:recado.titulo,
        descricao:recado.descricao
    });
     
    
    return response.status(201).json('Recado criado com sucesso!');
});


//Atualizar recado por ID
servidor.put('/usuarios/:id/recado/:idRecado', (request, response)=>{
    const recado = request.body;
    const idUsuario = Number(request.params.id);
    const idRecado = Number(request.params.idRecado);

    const indexUsuario = usuarios.find(usuario => usuario.id === idUsuario)
    const indexRecado = usuarios.recados.find(recado => recado.id === idRecado);

    usuarios[indexUsuario].recados[indexRecado] = {
        idRecado: id,
        titulo: recado.titulo,
        descricao: recado.descricao
    };
    return response.status(200).json(usuarios[indexUsuario]);
})

//Deletar recado por ID
servidor.delete('/recados/:id', (request, response)=>{
    const id = request.params.id;
    const indexRecado = recado.findIndex(recado => recado.id === id);
    recados.splice(indexRecado, 1);
    return response.status(200).json('Recado deletado');
})

servidor.listen(8080, ()=>console.log("Servidor rodando"));
