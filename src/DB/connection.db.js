import "dotenv/config"
import dns from "dns"
import { MongoClient } from "mongodb"

dns.setServers(["8.8.8.8", "1.1.1.1"])

const client = new MongoClient(process.env.MONGODB_URI)

export const db = client.db("ass")

export async function testDBconnection() {
    try {
        await client.connect()
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log(error)
        throw error
    }
}
