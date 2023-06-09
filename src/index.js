import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { MongoClient } from "mongodb";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();
const port = 3000;

const url = "mongodb+srv://ifardjoume:trazabilidad360@dev.sp24oom.mongodb.net";
const database = "dev";

const startServer = async () => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  console.log("Conexión exitosa a MongoDB");
  const db = client.db(database);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db }, // Pasa el objeto de conexión de MongoDB como contexto
  });

  await server.start();

  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
});
