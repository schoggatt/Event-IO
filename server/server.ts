import express from "express";
import Server from "./src/index";
import swaggerDocs from "./src/swagger";
import { PrismaClient } from "@prisma/client";

const prismadb = new PrismaClient(); // Not sure if this is needed...
const app = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

swaggerDocs(app, PORT);

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
