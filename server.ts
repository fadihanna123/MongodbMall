import "./api";
import "./config";

import UserRoutes from "./api/UserRoutes";
import { server } from "./config";

server.use(UserRoutes);

const port: number = 5000;
server.listen(port, () => console.log(`Servern startar på port ${port} \n `));
