const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

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
  
  res.send(tokenizedData())
  /*
  try {
    let data = fs.readFileSync("./qnap_code/result.txt", "utf8");

    fs.writeFile("results.txt", data, err => {
      if (err) return console.log(err);
      console.log("Wrote the file successfully to result txt");
      res.send(data);
    });
  } catch (e) {
    console.log("Error", e.stack);
  }*/
});

const mockedData = {
  nodes: [
    {
      name: "Node1 one",
      label: "Node1",
      id: 1,
      links: [1, 2]
    },
    {
      name: "Node2",
      label: "Node2",
      id: 2,
      links: [2, 3]
    },
    {
      name: "Node3",
      label: "Node3",
      id: 3,
      links: [2, 3, 4]
    },
    {
      name: "Node4",
      label: "Node4",
      id: 4,
      links: [4]
    }
  ],
  links: [
    {
      id: 1,
      source: 1,
      target: 2,
      type: "Foo",
      since: 2010
    },
    {
      id: 5,
      source: 2,
      target: 1,
      type: "looping boy",
      since: 2010
    },
    {
      id: 2,
      source: 1,
      target: 3,
      type: "Bar"
    },
    {
      id: 3,
      source: 2,
      target: 3,
      type: "Baz"
    }
  ]
};

// reads the file result.txt and sends it to the front end
app.get("/model", (req, res) => {
  function createNode(id, label) {
    return {
      name: "Router " + id,
      label: label,
      id: id,
      links: []
    };
  }

  function createLink(id, source, target, type) {
    return {
      id: id,
      source: source,
      target: target,
      type: type
    };
  }

  // open the model dat file and fetch stuff from it
  let data = fs.readFileSync("./qnap_code/model.dat", "utf8");
  let splitted_data = data.split("\n");

  let even_cleaner_data = [];

  splitted_data.forEach(element => {
    even_cleaner_data.push(element.split(" "));
  });

  let parrots = [];

  even_cleaner_data.forEach(element => {
    element = element.filter(v => v != "");
    parrots.push(element);
  });

  let routers = [];

  for (let i = 8; i < 16; i++) {
    let id = parrots[i][0];
    let label = parrots[i][2];
    routers.push(createNode(id, label));
  }

  let vie = []

  for (let i = 18; i < 35; i++) {
    let via = parrots[i][2];
    vie.push(via.slice(0,1))
  }

  let links = []

  for (let i = 37; i < 45; i++) {
    let router_id = parrots[i][0];
    let destination_via = parrots[i][1]

    if(router_id !== vie[destination_via-1]) {
        links.push(createLink(i, router_id, vie[destination_via-1], destination_via))
    }
    
    if(parrots[i][3] !== undefined){ 
      let destination_via = parrots[i][3]
        links.push(createLink(i, router_id, vie[destination_via-1], destination_via))
    }
    
    if(parrots[i][5] !== undefined){ 
      let destination_via = parrots[i][5]
        links.push(createLink(i, router_id, vie[destination_via-1], destination_via))
    }

    if(parrots[i][7] !== undefined){ 
      let destination_via = parrots[i][7]
        links.push(createLink(i, router_id, vie[destination_via-1], destination_via))
    }

    if(parrots[i][9] !== undefined){ 
      let destination_via = parrots[i][9]
        links.push(createLink(i, router_id, vie[destination_via-1], destination_via))
    }
    
  }


  let finalRouters = {
    nodes: routers,
    links: links

  };

  console.log(links);

  res.send(finalRouters);

  //res.send(mockedData)
});

// split and trim white spaces in order to cherry pick the values we need to see
function tokenizedData() {
  // open the model dat file and fetch stuff from it
  let data = fs.readFileSync("./qnap_code/model.dat", "utf8");
  let splitted_data = data.split("\n");

  let even_cleaner_data = [];

  splitted_data.forEach(element => {
    even_cleaner_data.push(element.split(" "));
  });

  let parrots = [];

  even_cleaner_data.forEach(element => {
    element = element.filter(v => v != "");
    parrots.push(element);
  });

  return parrots
}

// starts the app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
