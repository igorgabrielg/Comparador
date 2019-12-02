const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bd_ii'
});

connection.connect(function(err){
  if(err) return console.log(err);
  console.log('Bando de dados Conectado!');
})

function add_produto(conn){
  const sql = "INSERT INTO Clientes(produtos) VALUES ?";
  const values = [
        ['12345678901'],
        ['09876543210'],
        ['12312312399']
      ];
  conn.query(sql, [values], function (error, results, fields){
          if(error) return console.log(error);
          console.log('adicionou registros!');
          conn.end();//fecha a conexão
      });
}