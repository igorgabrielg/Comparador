// Configura a sessão do usuario autenticado

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var connection = require('../db/connection');
var config = require('../config.json');

let sessionStoreOptions = {

    // Com que frequência as sessões expiradas serão limpas; milissegundos.
    // expiração: 86400000, // A idade máxima de uma sessão válida; milissegundos.
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    port: config.db_port,
    connectionLimit: 1, // mais de uma conexão inclui condições de corrida
    createDatabaseTable: true,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'tbl_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}
var sessionStore = new MySQLStore(sessionStoreOptions/*opções de armazenamento de sessão */);

module.exports = { session, sessionStore};