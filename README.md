A minimal, production-sane notes app:

- **Frontend:** React (Vite) + Tailwind CSS  
- **Auth:** Amazon Cognito (Amplify Auth UI)  
- **API:** API Gateway (HTTP API) with **JWT authorizer**  
- **Compute:** AWS Lambda (Node.js 18)  
- **Data:** DynamoDB (`Notes` table: `userId` PK, `noteId` SK)

---

## Features

- Email sign-up / sign-in via Cognito (prebuilt `<Authenticator />`)
- Authenticated CRUD:
  - `GET /notes`
  - `POST /notes` `{ text }`
  - `DELETE /notes/{id}`
- Responsive UI with polished empty/loading/error states
- **Dev proxy** to avoid browser CORS locally
- Server-side CORS handling for direct (prod) API calls

---

## AWS Setup (Console)

### DynamoDB
- **Table:** `Notes`
- **Partition key:** `userId` (String)
- **Sort key:** `noteId` (String)
- **Billing:** On-demand

### Cognito (User Pool)
- **Sign-in:** Email only
- Create **App client** (Public). Save **Region**, **User Pool ID**, **App Client ID**.

### Lambda (Node 18)
- **Handler:** `index.handler`
- **File:** `index.mjs` (ESM) **or** `index.js` (CJS) — be consistent with `import`/`require`.
- **Env var:** `TABLE_NAME=Notes`
- **Role permissions (minimum):**
  - `dynamodb:Query`
  - `dynamodb:PutItem`
  - `dynamodb:DeleteItem`
  - **Resource:** your table ARN

### API Gateway (HTTP API)
- **Integration:** Lambda
- **Routes:**
  - `GET /notes` → Lambda (**Authorizer: Required**)
  - `POST /notes` → Lambda (**Authorizer: Required**)
  - `DELETE /notes/{id}` → Lambda (**Authorizer: Required**)
  - `OPTIONS /notes` → Lambda (**No authorizer**)
  - `OPTIONS /notes/{id}` → Lambda (**No authorizer**)

### JWT Authorizer
- **Issuer:** `https://cognito-idp.<region>.amazonaws.com/<user_pool_id>`
- **Audience:** `<app_client_id>`
- **Identity source:** `Authorization` header (`Bearer <idToken>`)


