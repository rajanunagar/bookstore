import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_APP_USERPOOLID,
      userPoolClientId: import.meta.env.VITE_APP_USERPOOL_CLIENTID,
    },
  },
  API: {
    GraphQL: {
      endpoint:
      import.meta.env.VITE_APP_GRAPHQL_ENDPOINT,
      region: import.meta.env.VITE_APP_GRAPHQL_REGION,
      defaultAuthMode: import.meta.env.VITE_APP_GRAPHQL_DEFAULT_AUTHMODE,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
