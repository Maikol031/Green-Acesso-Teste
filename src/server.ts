import { env } from "@/config/env-config"
import { databaseConnection } from "./database";
import app from "./app";
import "reflect-metadata";


const PORT = env.APPLICATION_PORT;

databaseConnection();

app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`));
