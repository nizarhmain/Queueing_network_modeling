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
  function createNode(id, label, type) {
    return {
      name: type + label,
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
    routers.push(createNode(id, id, "Router "));
  }

  let hosts = []

  for (let i = 47; i < 63; i++) {
    let label = parrots[i][0];
    hosts.push(createNode(i, label, "Host "));
  }


  
  let terminals = []

  for (let i = 67; i < 83; i++) {
    let label = parrots[i][0];
    terminals.push(createNode(i, label, "Terminal "));
  }

  console.log(terminals);

  let vie = []

  for (let i = 18; i < 35; i++) {
    let via = parrots[i][2];
    vie.push(via.slice(0,1))
  }

  let links = []
  // appending the routers in this first partf
  // Loops through the routers
  for (let i = 37; i < 45; i++) {
    let router_id = parrots[i][0];
    let destination_via = parrots[i][1]

    // can make another loop here, but keeping it static to keep it simple

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

  // creating the links between hosts and routers

  for (let i = 47; i < 63; i++) {
    let id = parrots[i][0]
    let host_id = i
    let router_id = parrots[i][11].slice(0,1);

    links.push(createLink(i, host_id, router_id, id))
  }

  // creating the links between the terminals and the hosts
  for (let i = 67; i < 83; i++) {
    let id = parrots[i][0]
    // if real id is 2, then the id will be 48, 47 is 1, 48 is 2
    let terminal_id = i

    let host_id = parseInt(parrots[i][7])+46
    host_id = host_id.toString()

    links.push(createLink(i, terminal_id, host_id, id))
  }



  // ADD HOSTS AND TERMINALS TO GENERATE THE NETWORK


  let finalRouters = {
    nodes: routers.concat(hosts).concat(terminals),
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
