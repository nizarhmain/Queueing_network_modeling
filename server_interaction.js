function fetch_results() {
  let url = `http://localhost:8000/result`

  // fetch salah 
  get_salah()
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


function sendFormData() {
  let inputs = $('.content-tab input')
  
  let sanitized_inputs = []


  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i]
    if(element.placeholder !== 'ID') {
      sanitized_inputs.push(element.id + ' ' + element.value)
    }
  }


  postData(`http://localhost:8000/writeToModel`, {sanitized_inputs})
  .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
  .catch(error => console.error(error));

}


function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}



