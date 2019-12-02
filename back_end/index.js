const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
var path = require('path');

const router = express.Router();

//configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
router.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../front_end/index.htm')));
app.use('/', router);

//Configura o acessa o banco de dados
function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bd_ii'
  });

// Faz a conexão do banco de dados
connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      connection.end();
      console.log('Executou!');
  });
}

// Pesquisa todos produtos
router.get('/produtos', (req, res) =>{
    execSQLQuery('SELECT * FROM produtos', res);
})

// Pesquisa por 1 produto
router.get('/produtos/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM produtos' + filter, res);
})

// Deleta um produto 
router.delete('/produtos/:id', (req, res) =>{
    execSQLQuery('DELETE FROM produtos WHERE ID=' + parseInt(req.params.id), res);
})

// Conta key de json
function count(obj) { return Object.keys(obj).length; }

// Adiciona os produtos
router.post('/produtos', (req, res) =>{
  for (var produto in req.body) {
    execSQLQuery(`INSERT INTO produtos(produto) VALUES('${req.body[produto]}')`, res);
  }
  console.log('Foram cadastrados ' + count(req.body) + ' objetos.')
  res.send(res.send('Foram cadastrados ' + count(req.body) + ' objetos.'))
    
});

// Atualiza o produto do parametro
router.patch('/produto/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const produto = req.body.produto.substring(0,255);
    execSQLQuery(`UPDATE produto SET Nome='${produto}' WHERE ID=${id}`, res);
})

//inicia o servidor
app.listen(port);
console.log('Servidor rodando na porta: ' + port);