# REST API

The REST API backend can be found [here](https://github.com/Mahamurahti/FullStack-Project/blob/main/fullstack_project/src/server.js)

## app.get("/backend/getList")
````
sql = SELECT media_id, media_type FROM list WHERE user_id LIKE ?;
````

Hakee tietokannasta käyttäjän id:n perusteella kaikki tämän listan sisältämät media_id:t ja tyypit. Media ja ID ovat eroteltuina,
jotta saman id:n omaavat elokuvat ja sarjat eivät sekoitu.

Esimerkkihaku: 
````
sql = SELECT media_id, media_type FROM list WHERE user_id LIKE 13;
````
Esimerkkitulos: 
````
[
  { media_id: '577922', media_type: 'movie' },
  { media_id: '524047', media_type: 'movie' },
  { media_id: '340102', media_type: 'movie' },
  { media_id: '614560', media_type: 'movie' }
]
````
Esimerkkivirhe: Tietokanta ei koskaan anna virheilmoitusta, sillä kutsua käytetään vain profiiliin siirtyessä, joka on avoin vain
kirjautuneille käyttäjille, jonka id haetaan sovelluksen välimuistista. Mikäli lista on tyhjä, kysely palauttaa tyhjän taulukon.


------------------------------------------------------------------------------------------------------------------------------------


## app.get("/backend/login")
````
sql = SELECT id, username FROM users WHERE username LIKE ? AND password LIKE ?;
````

Hakee ensin tietokannasta käyttäjän syötettyjen parametrien "username" ja "password" avulla. Mikäli käyttäjä on olemassa tietokannassa,
kutsu hakee vielä id:n lähettääkseen sen vastaukseksi ja tallentaakseen nämä sovelluksen välimuistiin.

Esimerkkihaku: 
````
sql = SELECT id, username FROM users WHERE username LIKE "Admin" AND password LIKE "AdminPassword1";
````
Esimerkkitulos:
````
[ { id: 13, username: 'Admin' } ]
````
Esimerkkivirhe: 
````
'Error'
````
Virheen näkymä käyttöliittymässä: Login unsuccessful, please check your username or password...


------------------------------------------------------------------------------------------------------------------------------------


## app.post("/backend/register")
````
sql = SELECT username FROM users WHERE username LIKE ?;
sql = INSERT INTO users (username, password, registered) VALUES (?, ?, ?);
````

Hakee ensin käyttäjän nimen parametrin mukaisesti, tarkistaakseen ettei käyttäjänimi ole varattu. Mikäli käyttäjänimi on vapaa,
uudelle käyttäjälle asetetaan nimi, salasana ja rekisteröitymispäivä parametrien mukaisesti.

Esimerkkihaku: 
````
sql = INSERT INTO users (username, password, registered) VALUES ("TestiMies", "TestiMies123", 12-08-2020);
````
Esimerkkitulos: 
````
{"username":"TestiMies","userpassword":"TestiMies123","registered":"12-08-2020"}
````
Esimerkkivirhe: 
````
'Error'
````
Virheen näkymä käyttöliittymässä: Username has been taken, please use a different username.


------------------------------------------------------------------------------------------------------------------------------------


## app.post("/backend/changeusername")
````
sql = SELECT username FROM users WHERE username LIKE ? AND password LIKE ?;
sql = UPDATE users SET username = ? WHERE username LIKE ? AND password LIKE ?;
````

Hakee tietokannasta käyttäjänimen annetulla parametrilla tarkistaakseen sen saatavuuden. Mikäli kyseistä käyttäjänimeä ei löydy tietokannasta,
päivitetään nykyisen käyttäjän nimi uuteen.

Esimerkkihaku: 
````
sql = SELECT username FROM users WHERE username LIKE "Admin" AND password LIKE "AdminPassword1";
sql = UPDATE users SET username = "Admin2" WHERE username LIKE "Admin" AND password LIKE "AdminPassword1";
````

Esimerkkitulos: 
````
{"headers":{},"username":"Admin","newUsername":"Admin2","password":"AdminPassword1"}
````
Esimerkkivirhe: 
````
'Error'
````
Esimerkkivirhe käyttöliittymässä: 'Username not available!'


------------------------------------------------------------------------------------------------------------------------------------


## app.post("/backend/changepassword")
````
sql = SELECT password FROM users WHERE username LIKE ? AND password LIKE ?;
sql = UPDATE users SET password = ? WHERE username LIKE ? AND password LIKE ?;
````

Hakee ensin tietokannasta salasanan käyttäjänimen ja salasanan perusteella parametrien mukaisesti, mikäli tulos löytyy,
seuraavalla käskyllä päivitämme salasanan uudeksi annetun parametrin mukaisesti.

Esimerkkihaku: 
````
sql = SELECT password FROM users WHERE username LIKE "Admin" AND password LIKE "AdminPassword1";
sql = UPDATE users SET password = "AdminPassword2" WHERE username LIKE "Admin" AND password LIKE "AdminPassword1";
````
Esimerkkitulos: 
````
{"headers":{},"username":"Admin","userpassword":"AdminPassword1","newPassword":"AdminPassword2"}
````
Esimerkkivirhe: 
````
'Error'
````
Virheen näkymä käyttöliittymässä: Something went wrong. Check your current password.


------------------------------------------------------------------------------------------------------------------------------------


## app.post("/backend/savetodb")
````
sql = INSERT INTO list (media_id, media_type, user_id) VALUES (?, ?, ?);
````
Tallentaa uuden elokuvan taikka sarjan sen tietojen perusteella tietokantaan. Kutsutaan painaessa "Add to list" -nappia, joka tarjoaa
tarvittavat parametrit kutsulle.

Esimerkkihaku: 
````
sql = INSERT INTO list (media_id, media_type, user_id) VALUES (577922, "movie", "13");
````
Esimerkkitulos: 
````
{"headers":{},"media_id":577922,"media_type":"movie","user_id":"13"}
````
Esimerkkivirhe: Virhettä ei ikinä tule, sillä "Add to list" -nappi on painettavissa vain jos kyseistä elokuvaa taikka sarjaa ei ole listassa.


------------------------------------------------------------------------------------------------------------------------------------


## app.delete("/backend/deletefromdb")
````
sql = "DELETE FROM list WHERE media_id LIKE ?";
````
Poistaa elokuvan/sarjan tiedot tietokannasta parametrilla saadun media_id:n perusteella. Kutsutaan "Delete from list" -napista, joka
tarjoaa media_id:n kyselylle.

Esimerkkihaku: 
````
sql = DELETE FROM list WHERE media_id LIKE 82856;
````
Esimerkkitulos: 
````
{"media_id":82856}
````
Esimerkkivirhe: Virhettä ei ikinä tule, sillä "Delete from list" -nappi on painettavissa vain jos kyseinen sarja taikka elokuva on listassa.


------------------------------------------------------------------------------------------------------------------------------------


## app.delete("/backend/deleteuser")
````
sql = DELETE FROM list WHERE user_id LIKE ?;
sql = DELETE FROM users WHERE id LIKE ?;
````

Poistaa käyttäjän käyttäjälistasta sekä kaikki käyttäjän listat tämän user_id:n avulla. Parametri id:lle saadaan sovelluksen välimuistista,
joka on saatavilla vain kirjautuneille käyttäjille.

Esimerkkihaku:
````
sql = DELETE FROM list WHERE user_id LIKE 13;
sql = DELETE FROM users WHERE id LIKE 13;
````
Esimerkkitulos:
````
Deleting user and list from db result: 
true
true
````
Esimerkkivirhe: Virhettä ei ikinä tule, sillä ominaisuus on käytettävissä vain kirjautuneille käyttäjille, joka on saatavilla vain
tietokannasta löytyville käyttäjille.


------------------------------------------------------------------------------------------------------------------------------------


# NPM commands

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
