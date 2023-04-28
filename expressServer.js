import fs from "node:fs";
import express from "express";

const server = express();
const port = 3000;
/* */

// declarative
server.get("/", (req, res) => {
  res.send("Blah");
});

Server.get("/pets", (req, res) => {
  fs.readfile("pets.json", "utf-8", (error, string) => {
    if (error){
       
        console.error(error)
        res.sendStatus(500);
       return;
    }
    res.set("content=Type", "application/json");
    const pets = JSON.parse(string);
    res.send(pets);
  });
});
server.get("/pets/:petIndex/:otherThing", (req, res) =>{
    const petIndex = Number(res.params.petIndex);
    //
    fs.readfile("pets.json", "utf-8", (error, string) => {
    if (error){
        //respond with error code
        //log the error
        console.error(error)
        res.sendStatus(500);
       return;
    }
   
    const pets =JSON.parse(string);
    res.send(pets[petIndex])
});
});
server.listen(port, () => {
  console.log(`examle app listening on port ${port}`);
});
