import { server } from "./config/GlobalSettings";
import "./config/database";
import "./config/settings";
import "./api/AuthRoutes";
import UserRoutes from "./api/UserRoutes";

server.use(UserRoutes);

const port: number = 5000;
server.listen(port, () => console.log(`Servern startar på port ${port} \n `));
