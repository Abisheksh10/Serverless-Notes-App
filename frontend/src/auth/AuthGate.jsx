import React from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function AuthGate({ children }) {
  return (
    <Authenticator>
      <Authed>{children}</Authed>
    </Authenticator>
  );
}

function Authed({ children }) {
  // If you need user details in the header, you can access them via this hook later
  useAuthenticator(() => []);
  return children;
}
