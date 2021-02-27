import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { router } from "../config/GlobalSettings";
import { Users } from "../models/model";

router.get("/users", async (req: Request, res: Response) => {
  const getlist = await Users.find({});
  res.send(getlist);
});

router.post("/users", async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const Usrs = new Users(req.body);
      await Usrs.save();
      res.send(Usrs);
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/users/:id", async (req: Request, res: Response) => {
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

router.delete("/users/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    Users.findOneAndDelete({ _id: id });
    res.send({ message: "Dina data har raderats." });
  } catch (err) {
    console.log(err.message);
  }
});

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
        const accessToken = jwt.sign(userObject, "X");
        res.json({ accessToken: accessToken, author: uname });
      }
    } catch (err) {
      // Om det finns fel..
      return res.status(500).send();
    }
  }
});

export default router;
