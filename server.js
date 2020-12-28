const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
mongoose.Promise = global.Promise;
const server = express();

mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Settings
server.use(express.json());
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const Users = require("./models/model.js");

server.get("/users", async (req, res) => {
  const getlist = await Users.find({});
  res.send(getlist);
});

server.post("/users", async (req, res) => {
  try {
    if (req.body) {
      const Usrs = new Users(req.body);
      await Usrs.save();
      res.send(Usrs);
    }
  } catch (err) {
    console.log(err);
  }
});

server.put("/users/:id", async (req, res) => {
  try {
    if (req.body) {
      const id = req.params.id;
      Users.findOneAndUpdate({ _id: id }, req.body, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
      // Skicka bekräftelsesmeddelande till servern.
      res.send({ message: "Dina data har ändrats." });
    }
  } catch (err) {
    console.log(err);
  }
});

server.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Users.findOneAndDelete({ _id: id }, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send({ message: "Dina data har raderats." });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Inloggningskontroll.
server.post("/login", async (req, res) => {
  // Definiera formdata.
  let username = req.body.username;
  let psw = req.body.psw;
  // Jämföra formdata med data som finns i databasen.
  await Users.findOne({ username: username, psw: psw }, (err, result) => {
    // Om det finns fel..
    if (err) {
      // Returnera 500 meddelande.
      return res.status(500).send();
    }

    // Om formdata är fel eller saknas i databasen..
    if (!result) {
      // Skicka false.
      res.send(false);
    }

    // Om formdata är sanna eller de finns i databasen..
    if (result) {
      // Returnera true.
      res.send(true);
    }
  });
});

const port = 5000;
server.listen(port, () => console.log(`Servern startar på port ${port}`));
