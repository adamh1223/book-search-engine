const { ApolloServer } = require("apollo-server-express");
const express = require("express");
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

  // Start the Express server
  app.listen({ port: 3001 }, () =>
    console.log(`Server ready at http://localhost:3001${server.graphqlPath}`)
  );
};

// Call the async function to start the server
startServer();
