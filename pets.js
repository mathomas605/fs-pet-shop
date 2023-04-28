import process from "node:process";
import fs from "node:fs";
import { type } from "node:os";

const subcommand = process.argv[2];

if (subcommand === "read") {
  const petIndexStr = process.argv[3];
  const petIndex = Number(petIndexStr);
  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      throw error;
    }
    const pets = JSON.parse(string);

    if (petIndexStr === undefined) {
      console.log(pets);
    } else if (
      petIndex >= pets.length ||
      petIndex < 0 ||
      Number.isNaN(petIndex)
    ) {
      console.error("usage: node Pets.js read INDEX");
      process.exit(1);
    } else {
      console.log(pets[petIndex]);
    }
  });
} else if (subcommand === "create") {
  // get additonal aguments
  const age = process.argv[3];
  const kind = process.argv[4];
  const name = process.argv[5];
  //handle errors
  if (
    Number.isNaN(age) ||
    typeof kind !== "string" ||
    typeof name !== "string"
  ) {
    console.error("usage: node Pets.js create AGE KIND NAME");
  }

  //create new pet
  const newPet = { age, kind, name };

  //reade pets.json
  fs.readFile("pets.json", "uft8", (error, string) => {
    if (error) {
      throw error;
    }
  });
  //parse content
  const pets = JSON.parse(string);
  //push to existing pets
  pets.push(newPet);
  //add reccords to pets.json
  //write it back to pets.json json.stringify
  fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
    if (error) {
      throw error;
    }
  });
} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}
