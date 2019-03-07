function fetch_results() {
  let url = `http://localhost:8000/result`;
  return fetch(url, {
    method: "GET" // *GET, POST, PUT, DELETE, etc.
    //body: script // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      
      // lazy load the script that loads the network
      loadScript("./d3_graphs/markov-chain.js")

      // not using this one anymore
      //loadScript("./d3_graphs/network_graph.js")

      loadScript("./d3_graphs/directed_graph_linan.js")

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
