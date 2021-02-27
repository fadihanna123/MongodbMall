import { NextFunction, Request as ExpressRequest, Response } from "express";
import jwt from "jsonwebtoken";

import { IUsers, Request } from "./typings/List";
import { server } from "./config/GlobalSettings";
import "./config/database";
import "./config/settings";
import routes from "./api/routes";

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

server.use(routes);

const port: number = 5000;
server.listen(port, () => console.log(`Servern startar på port ${port} \n `));
