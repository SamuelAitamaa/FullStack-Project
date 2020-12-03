let mysql = require('mysql');
let express = require('express');
let util = require('util');
let cors = require('cors');
let app = express();

// List of sites that server.js allows to connect
let whitelist = ['http://localhost:8080',
                 'http://localhost:8082',
                 'http://localhost:8083',
                 'http://localhost:8084',
                 'http://localhost:8085'];
// Dynamic CORS
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

// Create connection to database
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

// GET request for getting information of a users list of media. This GET requires the
// users ID to get the correct list of media. Gets the medias id and type from the list.
// http://localhost:8081/backend/getList
app.get("/backend/getList", function (req, res){
    console.log('Get request on /backend/getList');
    console.log('params: %j', req.query);
    let json = req.query;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = `SELECT media_id, media_type FROM list WHERE user_id LIKE ?`;
            let resultList = await query(sql, [json.user_id]);

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

// GET request for logging in. Send the users username and password to check if the database
// contains a corresponding username and at least one corresponding password.
// http://localhost:8081/backend/login
app.get("/backend/login", function (req, res){
    console.log('Get request on /backend/login');
    console.log('params: %j', req.query);
    let json = req.query;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = `SELECT username, password FROM users WHERE username LIKE ? AND password LIKE ?`;
            let resultUser = await query(sql, [json.username, json.userpassword]);

            if(resultUser.length === 1){
                sql = `SELECT id, username FROM users WHERE password LIKE ?`;
                let result = await query(sql, [json.userpassword]);
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

// POST request for registering a new account. The website checks validation (which is of course not enough)
// and our database also has a UNIQUE attribute linked to the username, so two identical usernames are not possible.
// Needs a username and a user password in correct forms to register.
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
            sql = `SELECT username FROM users WHERE username LIKE ?`;
            let result = await query(sql, [json.username]);

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

// POST request for saving media information into database. The post need the id and type ('movie' or 'tv') of the media
// and the id of the user. To save media the user need to be logged in, that way the users id is always present.
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
            console.log('Saving to db result: ')
            console.log(result.protocol41)
            res.send('Success');
        }catch(err){
            console.log("Database error: " + err);
            res.send('Error');
        }finally {
            console.log('Ending async');
        }
    })()
});

// DELETE request for deleting records from the database. The deletion requires the id of the media which needs to be deleted
// http://localhost:8081/backend/deletefromdb
app.delete("/backend/deletefromdb", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/deletefromdb');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            sql = "DELETE FROM list WHERE media_id LIKE ?";
            let result = await query(sql, [json.media_id]);
            console.log('Deleting from db result: ')
            console.log(result.protocol41)
            res.send('Success');
        }catch(err){
            console.log("Database error: " + err);
            res.send('Error');
        }finally {
            console.log('Ending async');
        }
    })()
});

// Open the server to the port 8081
let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});