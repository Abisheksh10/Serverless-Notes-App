import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE = process.env.TABLE_NAME;

const CORS = {
  "Access-Control-Allow-Origin": "*", 
  "Vary": "Origin",
  "Access-Control-Allow-Headers": "authorization,content-type,Authorization,Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Content-Type": "application/json",
};

export const handler = async (event) => {
  console.log("HTTP", event.requestContext?.http?.method, event.rawPath);

  // Preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  try {
    const routeKey = event.requestContext?.routeKey; // e.g., "GET /notes"

    // user from JWT authorizer
    const claims = event.requestContext?.authorizer?.jwt?.claims || {};
    const userId = claims.sub;
    if (!userId) return res(401, { error: "Unauthorized" });

    if (routeKey === "GET /notes") {
      const out = await ddb.send(
        new QueryCommand({
          TableName: TABLE,
          KeyConditionExpression: "userId = :u",
          ExpressionAttributeValues: { ":u": userId },
        })
      );
      const items =
        (out.Items || []).map((i) => ({
          noteId: i.noteId,
          text: i.text || "",
          createdAt: i.createdAt,
        })) || [];
      return res(200, { items });
    }

    if (routeKey === "POST /notes") {
      const body = parse(event.body);
      const text = (body?.text || "").toString();
      const noteId = crypto.randomUUID();
      const createdAt = new Date().toISOString();

      await ddb.send(
        new PutCommand({
          TableName: TABLE,
          Item: { userId, noteId, text, createdAt },
        })
      );
      return res(200, { ok: true, noteId, createdAt });
    }

    if (routeKey === "DELETE /notes/{id}") {
      const id = event.pathParameters?.id;
      if (!id) return res(400, { error: "Missing note id" });

      await ddb.send(
        new DeleteCommand({
          TableName: TABLE,
          Key: { userId, noteId: id },
        })
      );
      return res(200, { ok: true });
    }

    return res(404, { error: "Not found" });
  } catch (e) {
    console.error(e);
    return res(500, { error: "Server error" });
  }
};

function res(statusCode, body) {
  return { statusCode, headers: CORS, body: JSON.stringify(body) };
}
function parse(b) {
  try {
    return b ? JSON.parse(b) : null;
  } catch {
    return null;
  }
}
