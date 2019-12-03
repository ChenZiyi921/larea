
const server = require('express').Router();

const mysql = require('mysql');
const http = require('http');

server.get('/getlist', (req, res) => {
    res.send({ 'status': 'success', 'data': 'interface' })
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

server.get('/getImglist', (req, result) => {
    let url = 'http://img.mall.juzifenqi.com/191128/00036e9c-673a-40b5-96dc-c22333d16324.png';
    http.get(url, function (res) {
        let chunks = [];
        let size = 0;
        res.on('data', function (chunk) {
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end', function (err) {
            let data = Buffer.concat(chunks, size);
            let base64Img = data.toString('base64');
            result.send({ 'status': 'success', 'data': `data:image/png;base64,${base64Img}` })
        });
    });
})

module.exports = server;