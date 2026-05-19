import dotenv from "dotenv"
import dns from "dns"

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config()

const config = {
    PORT : process.env.PORT ,
    MONGODB_URI : process.env.MONGODB_URI
}
export default config