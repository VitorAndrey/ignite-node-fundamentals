import http from "node:http";

import { v4 as uuidv4 } from "uuid";
import { json } from "./middlewares/json.js";
import { Database } from "./middlewares/database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = { id: uuidv4(), name, email };

    database.insert("users", user);

    return res.writeHead(201).end("Sucesso!");
  }

  return res.writeHead(404).end("Pagina Não encontrada");
});

// localhost:3333
server.listen(3333);
