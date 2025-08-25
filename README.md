# Serverless-Notes-App

A minimal, production-sane notes app:

Frontend: React (Vite) + Tailwind CSS

Auth: Amazon Cognito (Amplify Auth UI)

API: API Gateway (HTTP API) + JWT Authorizer

Compute: AWS Lambda (Node.js 18)

Data: DynamoDB (Notes table: userId PK, noteId SK)

Features

Email sign-up/sign-in (Cognito) with Amplify’s prebuilt <Authenticator />

Authenticated CRUD:

GET /notes

POST /notes { text }

DELETE /notes/{id}

Responsive UI (Tailwind), polished empty/loading/error states

Local dev proxy to the API → no browser CORS pain in dev

Server-side CORS handling for direct (prod) calls


AWS Setup (Console, minimal)
DynamoDB

Table: Notes

Partition key: userId (String)

Sort key: noteId (String)

Billing: On-demand

Cognito (User Pool)

Sign-in: Email only

Create App client (Public). Copy User Pool ID, App Client ID, Region.

Lambda (Node 18)

Handler: index.handler

File: index.mjs (ESM) or index.js (CJS)

Env var: TABLE_NAME = Notes

Role permissions (minimum):

dynamodb:Query, dynamodb:PutItem, dynamodb:DeleteItem on your table ARN

API Gateway (HTTP API)

Integrations: Lambda

Routes:

GET /notes → Lambda (Authorizer: Required)

POST /notes → Lambda (Authorizer: Required)

DELETE /notes/{id} → Lambda (Authorizer: Required)

OPTIONS /notes → Lambda (No authorizer)

OPTIONS /notes/{id} → Lambda (No authorizer)

JWT Authorizer:

Issuer: https://cognito-idp.<region>.amazonaws.com/<user_pool_id>

Audience: <app_client_id>

Identity source: Authorization header

Dev CORS: use the Vite proxy (VITE_API_URL=/api).
Prod CORS: ensure your Lambda returns CORS headers (or configure API-level CORS), and keep OPTIONS unauthenticated.
