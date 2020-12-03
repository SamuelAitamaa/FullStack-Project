let mysql = require('mysql');
let express = require('express');
let util = require('util');
let cors = require('cors');
let app = express();

let whitelist = ['http://localhost:8080', 'http://localhost:8082', 'http://localhost:8083', 'http://localhost:8084', 'http://localhost:8085']
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};
app.use(cors(corsOptions));

let bodyParser = require('body-parser');
let urlEncodedParser = bodyParser.urlencoded({extended : false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let con = mysql.createConnection({
    host: "localhost",
    user: "websova",
    password: "websova",
    database: "fullstack"
});

const query = util.promisify(con.query).bind(con);

con.connect(function (err){
    if (err) throw err;
    console.log("Connected to MySQL!")
});

// http://localhost:8081/backend/getList
app.get("/backend/getList", function (req, res){
    console.log('Get request on /backend/getList');
    console.log('params: %j', req.query);
    let json = req.query;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = `SELECT media_id, media_type FROM list WHERE user_id LIKE "${json.user_id}"`;
            let resultList = await query(sql);

            resultList = JSON.parse(JSON.stringify(resultList));
            if(resultList.length === 0){
                res.send('Error')
            }else{
                console.log('Result below')
                console.log(resultList)

                let medias = []
                resultList.forEach(element => {
                    medias.push(element.media_id + element.media_type);
                })

                res.send(`${medias}`);
            }
        }catch(err){
            console.log("Database error: " + err);
            res.send('Error');
        }finally {
            console.log('Ending async');
        }
    })()
})

// http://localhost:8081/backend/login
app.post("/backend/login", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/login');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = `SELECT username FROM users WHERE username LIKE "${json.username}"`;
            let resultUser = await query(sql);

            sql = `SELECT password FROM users WHERE password LIKE "${json.userpassword}"`;
            let resultPassword = await query(sql);

            if(resultUser.length === 1 && resultPassword.length >= 1){
                sql = `SELECT id, username FROM users WHERE password LIKE "${json.userpassword}"`;
                let result = await query(sql);
                result = JSON.parse(JSON.stringify(result));
                console.log('Result below')
                console.log(result)

                res.send(`${result[0].id} ${result[0].username}`);
            }else{
                res.send('Error');
            }
        }catch(err){
            console.log("Database error: " + err);
        }finally {
            console.log('Ending async');
        }
    })()
})

// http://localhost:8081/backend/register
app.post("/backend/register", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/register');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            // Check if username has been taken
            sql = `SELECT username FROM users WHERE username LIKE "${json.username}"`;
            let result = await query(sql);

            if(result.length === 0){
                sql = "INSERT INTO users (username, password, registered) VALUES (?, ?, ?)";
                await query(sql, [json.username, json.userpassword, json.date]);

                // If username was available
                res.send('Success');
            }else{
                // If username was not available
                res.send('Error');
            }
        }catch(err){
            console.log("Database error: " + err);
        }finally {
            console.log('Ending async');
        }
    })()
});

// http://localhost:8081/backend/savetodb
app.post("/backend/savetodb", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/savetodb');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = "INSERT INTO list (media_id, media_type, user_id) VALUES (?, ?, ?)";
            let result = await query(sql, [json.media_id, json.media_type, json.user_id]);
            console.log(result)
            res.send('Success');
        }catch(err){
            console.log("Database error: " + err);
            res.send('Error');
        }finally {
            console.log('Ending async');
        }
    })()
});

// http://localhost:8081/backend/deletefromdb
app.delete("/backend/deletefromdb", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/deletefromdb');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = "DELETE FROM list WHERE media_id LIKE (?)";
            let result = await query(sql, [json.media_id]);
            console.log(result)
            res.send('Success');
        }catch(err){
            console.log("Database error: " + err);
            res.send('Error');
        }finally {
            console.log('Ending async');
        }
    })()
});

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});