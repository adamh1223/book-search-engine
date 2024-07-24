import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
