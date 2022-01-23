#!/usr/bin/env node

const fs = require("fs");
const server = require("fastify")({
  https: {
    key: fs.readFileSync(__dirname + "/tls/basic-private-key.key"),
    cert: fs.readFileSync(__dirname + "/../shared/tls/basic-certificate.cert"),
  },
});

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;
// create route for /recipes/:id
server.get("/recipes/:id", (request, response) => {
  const id = Number(request.params.id);

  if (id !== 42) {
    response.statusCode = 404;
    return { error: "not found" };
  }
  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: "Chicken Tikka Masala",
      steps: "Throw it in a pot...",
      ingredients: [
        { id: 1, name: "Chicken", quantity: "1 kg" },
        { id: 2, name: "Sauce", quantity: "2 cups" },
      ],
    },
  };
});

server.listen(PORT, HOST, () => {
  console.log(`producer running at https://${HOST}:${PORT}`);
});
