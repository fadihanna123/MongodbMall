"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("./models/model");
const server = express_1.default();
mongoose_1.default.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, () => console.log("Connected... \n "));
// Settings
server.use(express_1.default.json());
server.use(cors_1.default());
server.use(morgan_1.default("dev"));
const auth = async (req, res, next) => {
    const Header = req.headers.authorization;
    const token = Header && Header.split(" ")?.[1];
    if (!token)
        return res.sendStatus(401);
    try {
        const user = jsonwebtoken_1.default.verify(token, "X");
        req.user = user;
        next();
    }
    catch (err) {
        return res.sendStatus(403);
    }
};
server.get("/users", async (req, res) => {
    const getlist = await model_1.Users.find({});
    res.send(getlist);
});
server.post("/users", async (req, res) => {
    try {
        if (req.body) {
            const Usrs = new model_1.Users(req.body);
            await Usrs.save();
            res.send(Usrs);
        }
    }
    catch (err) {
        console.log(err);
    }
});
server.put("/users/:id", async (req, res) => {
    if (req.body) {
        const id = req.params.id;
        try {
            model_1.Users.findOneAndUpdate({ _id: id }, req.body);
            // Skicka bekräftelsesmeddelande till servern.
            res.send({ message: "Dina data har ändrats." });
        }
        catch (err) {
            console.log(err.message);
        }
    }
});
server.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        model_1.Users.findOneAndDelete({ _id: id });
        res.send({ message: "Dina data har raderats." });
    }
    catch (err) {
        console.log(err.message);
    }
});
// Inloggningskontroll.
server.post("/login", async (req, res) => {
    const { uname, psw } = req.body;
    const userObject = {
        uname: uname,
    };
    if (req.body) {
        res.json({ message: "Du måste fylla in alla rutorna!" });
    }
    else {
        // Om formdata är fel eller saknas i databasen..
        try {
            const result = await model_1.Users.findOne({ uname, psw });
            if (!result) {
                // Skicka false.
                res.json({ message: "Felaktig användarinfo." });
            }
            // Om formdata är sanna eller de finns i databasen..
            if (result) {
                // Returnera accesToken.
                const accessToken = jsonwebtoken_1.default.sign(userObject, "X");
                res.json({ accessToken: accessToken, author: uname });
            }
        }
        catch (err) {
            // Om det finns fel..
            return res.status(500).send();
        }
    }
});
const port = 5000;
server.listen(port, () => console.log(`Servern startar på port ${port} \n `));
