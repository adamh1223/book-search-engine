const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schemas/schema");
const resolvers = require("./schemas/resolvers");

const startServer = async () => {
  const app = express();

  // Create an Apollo Server instance
  const server = new ApolloServer({ typeDefs, resolvers });

  // Start the Apollo Server
  await server.start();

  // Apply Apollo GraphQL middleware to the Express app
  server.applyMiddleware({ app, path: "/graphql" });

  // Serve static files from the build directory
  app.use(express.static(path.join(__dirname, "../server/static")));

  // Serve the React app on the root route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../server/static", "index.html"));
  });

  // Start the Express server
  app.listen({ port: process.env.PORT || 3001 }, () =>
    console.log(
      `Server ready at http://localhost:${process.env.PORT || 3001}${
        server.graphqlPath
      }`
    )
  );
};

// Call the async function to start the server
startServer();
