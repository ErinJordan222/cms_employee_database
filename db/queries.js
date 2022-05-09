const connection = require('../db/connection');

async function showChoices(column, table) {
    

    let results = await connection.promise().query(`Select ${column} FROM ${table}`)
    let choices = [];

    results[0].forEach(element => choices.push(element[`${column}`]))
    return choices;
};


async function findId(table, column, value) {
    let results = await connection.promise().query(`SELECT id from ${table} WHERE ${column} = '${value}'`)
     
    let thisId = results[0][0].id;

    return thisId;
}

module.exports = {showChoices, findId};