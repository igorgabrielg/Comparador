'use strict';
var crypto = require('crypto');

/**
 * Gera RANDOMICAMENTE A STRING SALT
 * @function
 * @param {number} length - comprimento da string aleatória.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** converter para o formato hexadecimal */
            .slice(0,length);   /** retornar número necessário de caracteres */
};

/**
 * senha de hash com sha512.
 * @function
 * @param {string} password - Lista de campos obrigatórios.
 * @param {string} salt - Dados a serem validados.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Algoritmo de hash sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

/**
 * retornar o objeto hash da senha
 * @param {String} userpassword 
 */
var saltHashPassword = function(userpassword) {
    var salt = genRandomString(16); 
    return sha512(userpassword, salt);
}

/**
 * compare a senha com o hash da senha
 * @param {Object} passwordHashObj 
 * @param {String} password 
 */
var comparePassword = function(passwordHashObj, password){
    try {
        let {
            salt,
            passwordHash
        } = passwordHashObj;
    
        let passwordObj = sha512(password,salt);
        if (passwordObj.passwordHash == passwordHash) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

module.exports = {
    saltHashPassword,
    comparePassword
};