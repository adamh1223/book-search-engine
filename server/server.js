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

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

  // Start the Express server with the port from environment variables or fallback to 3001
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

// Call the async function to start the server
startServer();
