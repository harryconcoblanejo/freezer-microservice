import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import freezerRouter from "./endpoints/freezer";

const app = express();
const port = 4000;

const URL= process.env.URL;
const DB = process.env.DB;


const url = "mongodb+srv://ifardjoume:trazabilidad360@dev.sp24oom.mongodb.net";
const database = "dev";
let db;

const startServer = async () => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log("Conexión exitosa a MongoDB");
  db = client.db(database);

  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Endpoints
app.use("/freezer", (req, res, next) => {
  req.db = db;
  next();
}, freezerRouter);

startServer().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
});
