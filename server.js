var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const utf8 = require("utf8");
const base64 = require("base-64");
const mysql = require('mysql');

const server = express();

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'frontend/build')));


server.get("/API/login/:userData", (req, res) => {
    let encoded = req.params.userData;
    let decoded = base64.decode(encoded);
    let params = utf8.decode(decoded).split(";;;");

    let connection = mysql.createConnection(process.env.DB_URL);
    connection.connect();
    connection.query('SELECT * FROM USERS WHERE EMAIL=\'' + params[0] + '\';', (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw new Error("User not found");
        }
        let user = null;
        if (rows[0].PASSWORD === params[1]) {
            user = {
                id: rows[0].ID,
                name: rows[0].NAME,
                email: params[0]
            };
            console.log("login success");
        }
        res.send(user);
    });
    connection.end();
});

server.get("/API/signup/:userData", (req, res) => {
    let encoded = req.params.userData;
    let decoded = base64.decode(encoded);
    let params = utf8.decode(decoded).split(";;;");

    let connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    try {
        connection.query('INSERT INTO USERS (NAME, LASTNAME, EMAIL, PASSWORD) ' +
            'VALUES (\'' + params[0] + '\',\'' + params[1] + '\',\'' + params[2] + '\',\''+params[3]+'\');', (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        connection.query('SELECT ID, NAME FROM USERS WHERE EMAIL=\'' + params[1] + '\';', (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }

            let user = {
                id: rows[0].ID,
                name: rows[0].NAME,
                email: params[1]
            };

            res.send(user);
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        connection.end();
    }

});

server.listen(process.env.PORT || 3001, () => {
    console.log("Listening...");
});
