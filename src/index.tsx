import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme.d";
import { CssBaseline } from "@mui/material";
import { setContext } from "@apollo/client/link/context";
import { ACCESS_TOKEN_KEY } from "./Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export type User = {
  lastName: string;
  FirstName: string;
  role: string;
  email: string;
  id: number;
};

interface DecodedToken {
  exp: number;
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token && isTokenExpired(token)) {
    console.warn("Token invalid or expired. Redirecting to login.");
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = "/login";
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

const httpLink = createUploadLink({
  uri: "http://localhost:8080/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
