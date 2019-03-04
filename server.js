const express = require("express");
const app = express();
const port = 8000;

const fs = require("fs");

const exec = require("child_process").exec;

app.get("/", (req, res) => {
  res.send("Hello world");
});


//executes the shell sript clean_model.sh that executes the two scripts
// Reinizializza-modello.bat
// generazione-simulatore.bat
app.get("/reset", (req, res) => {
  let yourscript = exec("sh clean_model.sh", (error, stdout, stderr) => {
    console.log("library was initialized");
  });
  res.send("library was reinitialized");
});

// reads the file result.txt and sends it to the front end
app.get("/read_result", (req, res) => {
  try {
    let data = fs.readFileSync("./qnap_code/result.txt", "utf8");

    fs.writeFile("results.txt", data, err => {
      if (err) return console.log(err);
      console.log("Wrote the file successfully to result txt");
      res.send(data)
    });
  } catch (e) {
    console.log("Error", e.stack);
  }
});




// starts the app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
