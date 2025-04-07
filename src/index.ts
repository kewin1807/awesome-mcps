import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import server from "./mcp_server";
import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Readable } from "stream";
import { IncomingMessage } from "http";

async function startStdioServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Server started");
}

async function startHttpServer() {
  const sessions: Record<string, any> = {};

  const app = express();

  app.use(express.json());

  app.get("/sse", async (req: any, res: any) => {
    console.log("Client connected to SSE endpoint");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const transport = new SSEServerTransport(`/messages`, res);

    try {
      await server.connect(transport);
      const sessionId = transport.sessionId;
      if (sessionId) {
        sessions[sessionId] = transport;
      }

      req.on("close", () => {
        delete sessions[sessionId];
        console.log(`Connection ${sessionId} closed`);
      });
    } catch (error) {
      console.error("Error connecting server to transport:", error);
      return;
    }
  });

  app.post("/messages", async (req: any, res: any) => {
    const sessionId = req.query.sessionId as string;
    if (!sessionId) {
      return res.status(400).send("Missing sessionId parameter");
    }

    const session = sessions[sessionId];

    try {
      const body = req.body;
      const rawBody = JSON.stringify(body);
      const newReqStream = Readable.from(rawBody);

      const newReq: IncomingMessage = Object.assign(newReqStream, {
        headers: req.headers,
        method: req.method,
        url: req.url,
        aborted: req.destroyed ?? false,
      }) as IncomingMessage;

      await session.handlePostMessage(newReq, res);
    }
    catch (err) {
      console.error("error", err);
      return res.status(500).json({
        error: (err as Error).message || "Internal server error"
      });
    }
  });

  app.listen(process.env.PORT || 8001, () => {
    console.log(`Server is running on port ${process.env.PORT || 8001}`);
  });
}

(async () => {
  const isStdio = process.argv.includes("--stdio");
  if (isStdio) {
    await startStdioServer();
  } else {
    await startHttpServer();
  }
})();
