## 1. MongoDbMall

Den här är Mongodb uppstart för att bygga stora Mongodb projekt. Du kan använda den som mall.

### 1.1 Installation

Kör  
`yarn --emoji && yarn upgrade -latest --emoji && yarn start --emoji`  
för att installera alla paket och starta projektet.  
Projektet finns i  
http://localhost:5000/

### 1.2 Mappstruktur

models/  
models/model.ts  
typings/  
typings/List.ts  
README.md  
package.json  
server.ts  
tsconfig.json  
yarn.lock

### 1.3 Installation:

Du behöver skapa Mongodb databas som kallas "users" och collection "users".  
**Modellen:**  
`fullname` String  
`username` String  
`email` String  
`mobnr` String  
`psw` String

### 1.4 Exempel för att visa data:

http://localhost:5000/users  
Den visar alla data som lagras i databasen.  
**Exempel för att lägga till data:**  
http://localhost:5000/users  
Observera att du måste lägga i body vissa data för att de ska läggas till.  
**Exempel för att uppdatera data:**  
http://localhost:5000/users/[id]  
Du behöver skicka en id och bodyuppgifter för att resultatet ska lyckas.  
**Exempel för att radera data:**  
http://localhost:5000/users/[id]  
Här skriver du id som ska raderas från databasen.

### 1.3 Programmeringsspråk som används i projektet:

Typescript och Javascript

### 1.4 Ramverk/bibliotek:

JSON
