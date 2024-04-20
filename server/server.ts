import express from "express";
import Server from "./src/index";
import swaggerDocs from "./src/swagger";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import https from "https";
import path from "path";

const prismadb = new PrismaClient();
const app = express();
const server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

// TODO: I would live to actually make this more usable.
swaggerDocs(app);

const privateKey = fs.readFileSync(
  path.join(__dirname, "certificates", "localhost-key.pem")
);

const certificate = fs.readFileSync(
  path.join(__dirname, "certificates", "localhost.pem")
);

const httpsServer = https.createServer(
  {
    key: privateKey,
    cert: certificate,
  },
  app
);

httpsServer
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
