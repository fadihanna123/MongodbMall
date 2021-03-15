import { Request, Response } from "express";

import { router } from "../config";
import { Users } from "../models";

router.get("/users", async (req: Request, res: Response) => {
  try {
    const getlist = await Users.find({});
    res.send(getlist);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/users", async (req: Request, res: Response) => {
  try {
    const { uname, psw } = req.body;
    const Usrs = new Users({ uname, psw });
    await Usrs.save();
    res.send(Usrs);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/users/:id", async (req: Request, res: Response) => {
  if (req.body) {
    const id: string = req.params.id;
    try {
      await Users.findOneAndUpdate({ _id: id }, req.body);
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
    await Users.findOneAndDelete({ _id: id });
    res.send({ message: "Dina data har raderats." });
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
