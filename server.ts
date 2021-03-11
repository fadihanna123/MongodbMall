import "./api/AuthRoutes";
import "./config/database";
import "./config/settings";

import UserRoutes from "./api/UserRoutes";
import { server } from "./config/GlobalSettings";

server.use(UserRoutes);

const port: number = 5000;
server.listen(port, () => console.log(`Servern startar på port ${port} \n `));
