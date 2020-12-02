let mysql = require('mysql');
let express = require('express');
let util = require('util');
let cors = require('cors');
let app = express();

let corsOptions = {
    origin: "http://localhost:8080"
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

            if(resultUser.length === 1 && resultPassword.length === 1){
                sql = `SELECT id, username FROM users WHERE password LIKE "${json.userpassword}"`;
                let result = await query(sql);
                result = JSON.parse(JSON.stringify(result));
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

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});