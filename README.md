## 1. MongoDbMall
Den här är Mongodb uppstart för att bygga stora Mongodb projekt. Du kan använda den som mall.
### 1.1 Installation
Kör <br />
`yarn --emoji && yarn upgrade -latest --emoji && yarn start --emoji` <br>
för att installera alla paket och starta projektet. 
<br />
Projektet finns i <br />
http://localhost:5000/ <br />
### 1.2 Mappstruktur
models/<br />
models/model.js<br />
README.md<br />
package.json<br />
server.js<br />
yarn.lock<br />
### 1.3 Installation:
Du behöver skapa Mongodb databas som kallas "users" och collection "users". <br />
**Modellen:**<br />
   `fullname` String <br />
  `username` String <br />
  `email` String <br />
  `mobnr` String<br />
  `psw` String <br />  

### 1.4 Exempel för att visa data:
http://localhost:5000/users <br />
Den visar alla data som lagras i databasen.<br />
**Exempel för att lägga till data:**<br />
http://localhost:5000/users <br />
Observera att du måste lägga i body vissa data för att de ska läggas till. <br />
**Exempel för att uppdatera data:**<br />
http://localhost:5000/users/[id] <br />
Du behöver skicka en id och bodyuppgifter för att resultatet ska lyckas.<br />
**Exempel för att radera data:**<br />
http://localhost:5000/users/[id]  <br />
Här skriver du id som ska raderas från databasen. <br />

### 1.3 Programmeringsspråk som används i projektet:
Javascript<br />
### 1.4 Ramverk/bibliotek:
JSON<br />
