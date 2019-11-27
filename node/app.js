const express = require('express')
const server = express()
const bodyParser = require("body-parser");
const mysql = require('mysql')

server.use(express.static('./'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.listen(3000, () => {
    console.log('localhost:3000')
});

server.get('/getlist', (req, res) => {
    res.send({ 'status': 'success', 'data': '11' })
})

server.post('/postlist', (req, res) => {
    res.send({ 'status': 'success', 'data': '22' })
})

server.post('/postlistparams', (req, res) => {
    let reqname = req.body;
    res.send({ 'status': '', 'data': reqname })
})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    connectionLimit: 5,
    queueLimit: 10
});
const mysqlOperation = (sql, callback) => {
    pool.query(sql, (err, rows, fields) => {
        if (err) {
            return callback(err)
        } else {
            return callback(err, rows)
        }
    })
}
server.post('/getBookList', (req, res) => {
    let sql = "SELECT * FROM `customer` LIMIT 0 , 30";
    mysqlOperation(sql, (err, rows) => {
        res.send({ 'status': 'success', 'data': { list: rows } })
    })
})