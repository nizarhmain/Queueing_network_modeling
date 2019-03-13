function fetch_results() {
  let url = `http://localhost:8000/result`

  // fetch salah 
  get_salah()


  $(document).ready(function() {
      console.log($('#capEmissione').val());
  });

  // create an array of all the input values, generate them and send them to the /writeToModel route to create our Model-X.dat dynamic file

  return fetch(url, {
    method: "GET" // *GET, POST, PUT, DELETE, etc.
    //body: script // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(result => {
      //console.log(result);

      // declaring global variable so charts can call from this one
      window.model_results = result
      
      // lazy load the script that loads the network
      loadScript("./d3_graphs/markov-chain.js")

      //loadScript("./d3_graphs/directed_graph_linan.js")
      // loads orgoschrome
      loadScript("./assets/js/main.js")

      loadScript("./d3_graphs/generic_chart.js")

    });
}


function loadScript(url) {
  //let isLoaded = document.querySelectorAll('.directed_network_linan');
  /*
  if(isLoaded.length > 0) {
    return;
  }
  */

  let myScript = document.createElement("script");
  myScript.src = url;
  //myScript.className = 'directed_network_linan';
  document.body.appendChild(myScript);
}

function reset_simulation() {
  let url = `http://localhost:8000/reset`;
  return fetch(url, {
    method: "GET" // *GET, POST, PUT, DELETE, etc.
    //body: script // body data type must match "Content-Type" header
  })
    .then(response => response.text())
    .then(result => {
      console.log(result);
    });
}


function get_salah() {
  let url = `http://localhost:8000/salah`;
  return fetch(url, {
    method: "GET" // *GET, POST, PUT, DELETE, etc.
    //body: script // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(result => {
      window.salah = result
    });
}


