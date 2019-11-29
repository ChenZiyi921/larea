const express = require('express')
const server = express()
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require("cors");

// server.all('*', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, accept, origin, content-type')
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     res.header('X-Powered-By', ' 3.2.1')
//     res.header('Content-Type', 'application/json;charset=utf-8')
//     next()
// })

server.use(express.static('./'))
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

const app = server.listen(3000, () => {
    const host = app.address().address
    const port = app.address().port
    console.log('Example app listening at http://', port)
});

// ================================================================

server.get('/getlist', (req, res) => {
    res.send({ 'status': 'success', 'data': '11' })
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
};

server.post('/getBookList', (req, res) => {
    let sql = "SELECT * FROM `customer` LIMIT 0 , 30";
    mysqlOperation(sql, (err, rows) => {
        res.status(200)
        res.json({ 'status': 'success', 'data': { list: rows } })
    })
})