const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');

const fs = require("fs");

const exec = require("child_process").exec;

app.use(cors());


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
app.get("/result", (req, res) => {
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

const mockedData = {
  "nodes": [
    {
      "name": "Node1 one",
      "label": "Node1",
      "id": 1,
      "links": [1, 2]
    },
    {
      "name": "Node2",
      "label": "Node2",
      "id": 2,
      "links": [2, 3]
    },
    {
      "name": "Node3",
      "label": "Node3",
      "id": 3,
      "links": [2, 3, 4]
    },
    {
      "name": "Node4",
      "label": "Node4",
      "id": 4,
      "links": [4]
    }
  ],
  "links": [
    {
      "id": 1,
      "source": 1,
      "target": 2,
      "type": "Foo",
      "since": 2010
    },
    {
      "id": 2,
      "source": 1,
      "target": 3,
      "type": "Bar"
    },
    {
      "id": 3,
      "source": 2,
      "target": 3,
      "type": "Baz"
    },
    {
      "id": 4,
      "source": 3,
      "target": 4,
      "type": "Foo2"
    }
  ]
}


// reads the file result.txt and sends it to the front end
app.get("/model", (req, res) => {
  res.send(mockedData)
});


// starts the app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
