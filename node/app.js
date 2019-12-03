const express = require('express');
const server = express();
const bodyParser = require("body-parser");
// const mysql = require('mysql');
// const cors = require("cors");
// const mime = require("mime");
// const http = require('http');

const interface = require('./interface');

server.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, accept, origin, content-type')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    // res.header('Content-Type', 'application/json;charset=utf-8')
    res.header('Content-Type', 'text/html;charset=utf-8')
    next()
})

server.use(express.static('./'))
// server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.use('/interface', interface)

const app = server.listen(3000, () => {
    const host = app.address().address;
    const port = app.address().port;
    console.log('Example app listening at http://', port)
});
