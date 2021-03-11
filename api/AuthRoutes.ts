import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { router } from "../config/GlobalSettings";
import { Users } from "../models/model";
import { IUsers, Request } from "../typings/List";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const Header = req.headers.authorization;
  const token = Header && Header.split(" ")?.[1];
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, <string>process.env.Token);
    req.user = user as IUsers;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

// Inloggningskontroll.
router.post("/login", async (req: Request, res: Response) => {
  const { uname, psw } = req.body;
  const userObject: {} = {
    uname: uname,
  };

  if (!req.body) {
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
        const accessToken = jwt.sign(userObject, <string>process.env.Token);
        res.json({ accessToken: accessToken, author: uname });
      }
    } catch (err) {
      // Om det finns fel..
      return res.status(500).send();
    }
  }
});
