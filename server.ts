import express, {
  NextFunction,
  Request as ExpressRequest,
  Response,
} from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import { Users } from "./models/model";

const server = express();

mongoose.connect(
  "mongodb://localhost:27017/users",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Connected... \n ")
);

interface IUsers {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  mobnr: string;
  psw: string;
}

interface Request extends ExpressRequest {
  user?: IUsers;
}

// Settings
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const Header = req.headers.authorization;
  const token = Header && Header.split(" ")?.[1];
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, "X");
    req.user = user as IUsers;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

server.get("/users", async (req: Request, res: Response) => {
  const getlist = await Users.find({});
  res.send(getlist);
});

server.post("/users", async (req: Request, res: Response) => {
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

server.put("/users/:id", async (req: Request, res: Response) => {
  if (req.body) {
    const id: string = req.params.id;
    try {
      Users.findOneAndUpdate({ _id: id }, req.body);
      // Skicka bekräftelsesmeddelande till servern.
      res.send({ message: "Dina data har ändrats." });
    } catch (err) {
      console.log(err.message);
    }
  }
});

server.delete("/users/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    Users.findOneAndDelete({ _id: id });
    res.send({ message: "Dina data har raderats." });
  } catch (err) {
    console.log(err.message);
  }
});

// Inloggningskontroll.
server.post("/login", async (req: Request, res: Response) => {
  const { uname, psw } = req.body;
  const userObject: {} = {
    uname: uname,
  };

  if (req.body) {
    res.json({ message: "Du måste fylla in alla rutorna!" });
  } else {
    // Om formdata är fel eller saknas i databasen..
    try {
      const result = await Users.findOne({ uname, psw });
      if (!result) {
        // Skicka false.
        res.json({ message: "Felaktig användarinfo." });
      }

      // Om formdata är sanna eller de finns i databasen..
      if (result) {
        // Returnera accesToken.
        const accessToken = jwt.sign(userObject, "X");
        res.json({ accessToken: accessToken, author: uname });
      }
    } catch (err) {
      // Om det finns fel..
      return res.status(500).send();
    }
  }
});

const port: number = 5000;
server.listen(port, () => console.log(`Servern startar på port ${port} \n `));
