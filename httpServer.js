import http from "node:http";
import fs from "node:fs";

http
  .createServer(function (request, response) {
    const petRegEx = /^\/pets\/(\d+)$/;
    if (request.method === "GET" && request.url === "/pets") {
      fs.readFile("pets.json", "utf-8", (error, string) => {
        response.setHeader("Content-Type", "application/json");
        response.write(string);
        response.end();
      });
    } else if (request.method === "GET" && petRegEx.test(request.url)) {
      // get pet index
      const petIndex = Number(petRegEx.exec(request.url)[1]);
      // read pets.json
      fs.readFile("pets.json", "utf-8", (error, string) => {
        response.setHeader("Content-Type", "application/json");
        if (error) {
          response.statusCode = 500;
          response.end("server failed to read ");
        }
        const pets = JSON.parse(string);
        if (petIndex >= 0 && petIndex < pets.length) {
          // pet index is within bounds
          const pet = pets[petIndex];
          response.end(JSON.stringify(pet));
        } else {
          // pet index is out of bounds
          response.statusCode = 404;
          response.end("Pet not found");
        }
      });
    } else {
      response.statusCode = 404;
      response.end("Not found");
    }
  })
  .listen(3000, function () {
    console.log("listening on port 3000");
  });
