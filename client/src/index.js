import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}
