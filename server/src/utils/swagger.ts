import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import swaggerUI from "swagger-ui-express";
import { Response, Request } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event IO API",
      version: "1.0.0",
      description: "Event IO API",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get("swagger.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/swagger`);
}

export default swaggerDocs;
