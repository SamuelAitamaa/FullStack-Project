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
                 'http://localhost:8085',
                 'https://mahamurahti.github.io'];
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

/**
 * GET request for getting information of a users list of media. This get request requires the
 * users ID to get the correct list of media. Gets the medias id and type from the list.
 *
 * @param{number} user_id of the user
 * @return{array} if successful, return media array which contains the every media id and type of the elements found
 *                in the users list
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
// http://localhost:8081/backend/getList
app.get("/backend/getList", function (req, res){
    console.log('Get request on /backend/getList');
    console.log('params: %j', req.query);
    let json = req.query;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            // Check if there is any media on the users list
            sql = `SELECT media_id, media_type FROM list WHERE user_id LIKE ?`;
            let resultList = await query(sql, [json.user_id]);

            resultList = JSON.parse(JSON.stringify(resultList));
            if(resultList.length === 0){
                // If there is no media
                res.send('Error')
            }else{
                console.log('Result below')
                console.log(resultList)

                let medias = []
                resultList.forEach(element => {
                    medias.push(element.media_id + element.media_type);
                })
                // Return the media
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

/**
 * GET request for logging in. Sends the users username and password to check if the database
 * contains a corresponding username and password combination.
 *
 * @param{string} username of the user
 * @param{string} password of the user
 * @return{string} if successful, return string that contains the id and type of the media (ex. 977635movie)
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
// http://localhost:8081/backend/login
app.get("/backend/login", function (req, res){
    console.log('Get request on /backend/login');
    console.log('params: %j', req.query);
    let json = req.query;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            // Check if there is a user with the users given credentials
            sql = `SELECT username, password FROM users WHERE username LIKE ? AND password LIKE ?`;
            let resultUser = await query(sql, [json.username, json.userpassword]);

            if(resultUser.length === 1){
                sql = `SELECT id, username FROM users WHERE username LIKE ? AND password LIKE ?`;
                let result = await query(sql, [json.username, json.userpassword]);
                result = JSON.parse(JSON.stringify(result));
                console.log('Result below')
                console.log(result)

                // Return the id and username of the user
                res.send(`${result[0].id} ${result[0].username}`);
            }else{
                // If there is no user that corresponds the given credentials
                res.send('Error');
            }
        }catch(err){
            console.log("Database error: " + err);
        }finally {
            console.log('Ending async');
        }
    })()
})

/**
 * POST request for registering a new account. The website checks validation (which is of course not enough)
 * and our database also has a UNIQUE attribute linked to the username, so two identical usernames are not possible.
 * Needs a username and a user password in correct forms to register.
 *
 * @param{string} username of the user
 * @param{string} password of the user
 * @param{date} date of the current day
 * @return{string} if successful, return string that contains the word "Success"
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
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

/**
 * POST request for changing the users password. The request checks if the users (old) password is correct
 * and if it is, changing to the new password will commence.
 *
 * @param{string} username of the user
 * @param{string} (old) password of the user
 * @param{string} new password of the user
 * @return{string} if successful, return string that contains the word "Success"
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
// http://localhost:8081/backend/changepassword
app.post("/backend/changepassword", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/changepassword');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            // Check if the username and password combination has a password
            sql = `SELECT password FROM users WHERE username LIKE ? AND password LIKE ?`;
            let result = await query(sql, [json.username, json.userpassword]);

            if (result.length > 0) {
                // Update password
                sql = `UPDATE users SET password = ? WHERE username LIKE ? AND password LIKE ?`;
                await query(sql, [json.newPassword, json.username, json.userpassword]);
                res.send('Success');
            } else {
                // Don't update password if (old) credentials dont match
                res.send('Error');
            }
        }catch(err){
            console.log("Database error: " + err);
        }finally {
            console.log('Ending async');
        }
    })()
});

/**
 * POST request for changing the users username. The request checks if password is correct and if it is, changing of the
 * username will commence.
 *
 * @param{string} username of the user
 * @param{string} password of the user
 * @param{string} new username of the user
 * @return{string} if successful, return string that contains the word "Success"
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
// http://localhost:8081/backend/changeusername
app.post("/backend/changeusername", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/changeusername');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql
    (async () => {
        console.log('Starting async');
        try{
            // Check if the username exists
            sql = `SELECT username FROM users WHERE username LIKE ? AND password LIKE ?`;
            let result = await query(sql, [json.username, json.password]);

            if (result.length > 0) {
                // Update username
                sql = `UPDATE users SET username = ? WHERE username LIKE ? AND password LIKE ?`;
                await query(sql, [json.newUsername, json.username, json.password]);
                res.send('Success');
            } else {
                // Don't update username if username has been taken
                res.send('Error');
            }
        }catch(err){
            res.send('Error');
            console.log("Database error: " + err);
        }finally {
            console.log('Ending async');
        }
    })()
});

/**
 * POST request for saving media information into the database. The post needs the id and type ('movie' or 'tv') of the
 * media and the id of the user. To save media the user need to be logged in, that way the users id is always present.
 *
 * @param{number} id of the media
 * @param{string} type of the media
 * @param{number} id of the user
 * @return{string} if successful, return string that contains the word "Success"
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
// http://localhost:8081/backend/savetodb
app.post("/backend/savetodb", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/savetodb');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            // Update the list, parameters cannot be affected by user, so no check is done
            sql = "INSERT INTO list (media_id, media_type, user_id) VALUES (?, ?, ?)";
            let result = await query(sql, [json.media_id, json.media_type, json.user_id]);
            console.log('Saving to db result: ')
            console.log(result.protocol41)
            res.send('Success');
        }catch(err){
            // On error don't update list
            console.log("Database error: " + err);
            res.send('Error');
        }finally {
            console.log('Ending async');
        }
    })()
});

/**
 * DELETE request for deleting media records from the database. The deletion requires the id of the user and the id of
 * the media which needs to be deleted
 *
 * @param{number} id of the media
 * @param{number} id of the user
 * @return{string} if successful, return string that contains the word "Success"
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
// http://localhost:8081/backend/deletefromdb
app.delete("/backend/deletefromdb", urlEncodedParser, function (req, res){
    console.log('Post request on /backend/deletefromdb');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            // Delete media from the list, parameters cannot be affected by the user, so no check is done
            sql = "DELETE FROM list WHERE media_id LIKE ? AND user_id LIKE ?";
            let result = await query(sql, [json.media_id, json.user_id]);
            console.log('Deleting from db result: ')
            console.log(result.protocol41)
            res.send('Success');
        }catch(err){
            // On error dont delete anything
            console.log("Database error: " + err);
            res.send('Error');
        }finally {
            console.log('Ending async');
        }
    })()
});

/**
 * DELETE request for deleting the user and the list that the user had.
 *
 * @param{number} id of the user
 * @return{string} if successful, return string that contains the word "Success"
 * @return{string} if unsuccessful, return string that contains the word "Error"
 */
// http://localhost:8081/backend/deleteuser
app.delete("/backend/deleteuser", urlEncodedParser, function (req, res){
    console.log('Post reguest on /backend/deleteuser');
    console.log('body: %j', req.body);
    let json = req.body;
    let sql;
    (async () => {
        console.log('Starting async');
        try{
            // Parameter cannot be affected by the user, so no check is done
            // Delete the list of the user
            sql = "DELETE FROM list WHERE user_id LIKE ?";
            let resultList= await query(sql, [json.user_id]);
            // Delete the user
            sql = "DELETE FROM users WHERE id LIKE ?";
            let resultUser = await query(sql, [json.user_id]);

            console.log('Deleting user and list from db result: ')
            console.log(resultUser.protocol41)
            console.log(resultList.protocol41)
            res.send('Success');
        }catch(err){
            // On error don't delete anything
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