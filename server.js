let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const utf8 = require("utf8");
const base64 = require("base-64");
const mysql = require('mysql');
const CRUD = require("./CRUD");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const server = express();
// Connection URL
const DBurl = "mongodb://127.0.0.1:27017/evaluations";//process.env.MONGODB_URI;

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'frontend/build')));
server.use('/videos', express.static(path.join(__dirname, 'Coursera')));
server.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let vids_to_check = {ids: [1, 2, 3]};

server.get("/API/login/:userData", (req, res) => {
    let encoded = req.params.userData;
    let decoded = base64.decode(encoded);
    let params = utf8.decode(decoded).split(";;;");

    let connection = mysql.createConnection({
        insecureAuth: true,
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "dajee"
    });
    connection.connect();
    connection.query('SELECT * FROM USERS WHERE EMAIL=\'' + params[0] + '\';', (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw new Error("Something went wrong with DB");
        }
        let user = null;
        if (rows[0] && rows[0].PASSWORD === params[1]) {
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

    let connection = mysql.createConnection({
        insecureAuth: true,
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "dajee"
    });
    connection.connect();
    try {
        connection.query('INSERT INTO USERS (NAME, LASTNAME, EMAIL, PASSWORD) ' +
            'VALUES (\'' + params[0] + '\',\'' + params[1] + '\',\'' + params[2] + '\',\'' + params[3] + '\');', (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        connection.query('SELECT ID, NAME FROM USERS WHERE EMAIL=\'' + params[2] + '\';', (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rows[0]);
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

server.get("/API/concepts", (req, res) => {
    let connection = mysql.createConnection({
        insecureAuth: true,
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "dajee"
    });
    CRUD.getConcepts(connection, (rows) => {
        res.send(rows);
    });
});

server.get("/API/concepts/:videoId", (req, res) => {
    let connection = mysql.createConnection({
        insecureAuth: true,
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "dajee"
    });
CRUD.getConceptsForVideo(connection, req.params.videoId,(rows) => {
    res.send(rows);
});
});

server.get("/API/learning_resources", (req, res) => {
    res.send(vids_to_check)
});

server.get("/API/learning_resources/:resourceId", (req, res) => {
    let resourceId = req.params.resourceId;
    let connection = mysql.createConnection({
        insecureAuth: true,
        host: "localhost",
        user: "root",
        password: process.env.DB_PW,
        database: "dajee"
    });
    CRUD.getLearningResource(connection, resourceId, (rows) => {
        if (rows) {
            rows.path = rows.path.replace("C:/Tesis ISIS/videosLu/Coursera/","Coursera/");
            rows.transcript = rows.path.replace(".mp4",".srt");
        }
        res.send(rows);
    });
});

//Get all evaluations from a specific user
server.get("/API/evaluations/:userId", function (req, res) {
    // search db if user already has a document of challenge add value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.getEvaluations(db, function (result) {
            db.close();
            res.send(result);
        }, Number(req.params.userId));
    });
});

//add an evaluation for an user
server.post("/API/evaluation/:userId", function (req, res) {
    // search db if user already has a document of challenge add value

    console.log(req.body);
    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.insertEvaluation(db, function (result) {
            db.close();
            res.send(result);
        }, Number(req.params.userId), req.body);
    });
});

server.listen(process.env.PORT || 3001, () => {
    console.log("Listening...");
});
