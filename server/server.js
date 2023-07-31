const path = require("path");

// MongoDB
const db = require("./config/connection");

// REST API
const express = require("express");
const routes = require("./routes");

// GraphQL API
const { ApolloServer } = require("@apollo/server");
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `🌍 Use GraphQL at http://localhost${PORT}${server.graphqlPath}`
      );
    });
  });
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.use(routes);

startApolloServer();
