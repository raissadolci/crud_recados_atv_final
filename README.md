<h2>CRUD de Recados</h2>
 
<br>
  
<p>O projeto CRUD de Recados foi desenvolvido 100% em nodeJS como uma introdução ao BackEnd, utilizando o Postman com método HTTP e rodando no link: 
  https://atividade-final-backend-i.onrender.com no Render.</p>
<br>
<p>A finalidade do sistema é fazer a criação de usuários, validar o login e permitir a criação, leitura, edição e exclusão de recados.</p>

<p>A criação do usuário é preciso ser feita na rota POST (/usuarios) e deve ser fornecida as seguintes informações em formato JSON: </p>

![criar_usuario_projeto_final](https://github.com/raissadolci/crud_recados_atv_final/assets/120437737/c6c0652f-55d8-4a24-9e59-c3bbee284432)

<br> 

<p>Para a criação de recado, deve-se usar a rota POST (/usuarios/:id/recado) e fornecida as seguintes informações:</p>

![criar_recado_projeto_final](https://github.com/raissadolci/crud_recados_atv_final/assets/120437737/c40825a3-a2f9-4188-ae36-62a2571755a7)


<p>Para ler todos os usuários e recados usa-se a rota GET (/usuarios) e para ler por ID usa-se GET (/usuarios/:id). </p>

<p> Para atualizar o recado usa-se a rota PUT (/usuarios/recado/:idRecado) e para deletar usa-se DELETE  (/usuarios/recado/:idRecado).</p>
