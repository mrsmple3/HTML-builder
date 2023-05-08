const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Hello! Please enter some text.");

rl.on("line", (input) => {
  if (input === "exit") {
    console.log("Goodbye!");
    rl.close();
  } else {
    fs.appendFile("output.txt", input + "\n", (err) => {
      if (err) throw err;
      console.log("Text has been saved to output.txt");
    });
  }
});
