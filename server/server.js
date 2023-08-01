const path = require("path");
const db = require("./config/connection");
const express = require("express");

// Apollo Server 4
const http = require("http");
const cors = require("cors");
const { json } = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startApolloServer = async () => {
  await server.start();

  app.use("/graphql", cors(), json(), expressMiddleware(server));

  db.once("open", async () => {
    // app.listen(PORT, () => {
    //   console.log(`🌍 Now listening on http://localhost:${PORT}`);
    // });
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

startApolloServer();
