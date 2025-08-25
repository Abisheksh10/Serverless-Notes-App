import { Amplify } from "aws-amplify";
import { COGNITO_REGION, USER_POOL_CLIENT_ID, USER_POOL_ID } from "../lib/env";

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        region: COGNITO_REGION,
        userPoolId: USER_POOL_ID,
        userPoolClientId: USER_POOL_CLIENT_ID,
        // What fields users can use to sign in. Adjust if you enabled username/phone in your pool.
        loginWith: {
          username: false,
          email: true,
          phone: false,
        },
      },
    },
  });
}
