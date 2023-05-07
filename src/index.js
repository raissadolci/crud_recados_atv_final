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
                senha:hash
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

    return response.json(usuario);
});

//Atualizar usuário por ID
servidor.put('/usuarios/:id', (request, response)=>{
    const usuario = request.body;
    const id = Number(request.params.id);
    const indexUsuario = usuarios.findIndex(usuario => usuario.id === id);
    usuarios[indexUsuario] = {
        id: id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.hash
    };
    
    return response.status(200).json(usuarios[indexUsuario]);
});

//Deletar usuário por ID
servidor.delete('/usuarios/:id', (request, response)=>{
    const id = Number(request.params.id);
    const indexUsuario = usuarios.findIndex(usuario => usuario.id === id);
    usuarios.splice(indexUsuario, 1);
    return response.status(200).json('Usuário deletado');
});


//Inicio do CRUD de recados
let recados = [];

//Criação dos recados
servidor.post('/recados', (request, response)=>{
    const recado = request.body;

    recados.push({
        id:Math.floor(Math.random()*365), 
        titulo:recado.titulo,
        descricao:recado.descricao
    });
    return response.status(201).json('Recado criado com sucesso!');
});

//Ler todos os recados
servidor.get('/recados', (request, response)=>{
    return response.status(200).json(recados);
});

//Ler todos os recados por ID
servidor.get('/recados/:id', (request, response)=>{
    const id = Number(request.params.id);
    const recado = recados.find(recados => recados.id === id);

    return response.status(200).json(recado);
});

//Atualizar recado por ID
servidor.put('/recados/:id', (request, response)=>{
    const recado = request.body;
    const id = Number(request.params.id);
    const indexRecado = recados.findIndex(recado => recado.id === id);
    recados[indexRecado] = {
        id: id,
        titulo: recado.titulo,
        descricao: recado.descricao
    };
    return response.status(200).json(recados[indexRecado]);
})

//Deletar recado por ID
servidor.delete('/recados/:id', (request, response)=>{
    const id = request.params.id;
    const indexRecado = recado.findIndex(recado => recado.id === id);
    recados.splice(indexRecado, 1);
    return response.status(200).json('Recado deletado');
})

servidor.listen(3030, ()=>console.log("Servidor rodando"));
