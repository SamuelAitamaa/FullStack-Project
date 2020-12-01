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

// http://localhost:8081/register/ok
app.post("/register/ok", urlEncodedParser, function (req, res){
    console.log('Post request');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = "INSERT INTO users (username, password, registered) VALUES (?, ?, ?)";
            await query(sql, [json.username, json.userpassword, json.date]);
            res.send('Post was successful. Added a new user to database!');
        }catch(err){
            console.log("Error in async: " + err);
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