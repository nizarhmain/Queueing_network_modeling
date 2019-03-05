function fetch_results () {
    let url = `http://localhost:8000/result`;
    return fetch(url, {
      method: "GET" // *GET, POST, PUT, DELETE, etc.
      //body: script // body data type must match "Content-Type" header
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
      });
  };

function reset_simulation () {
    let url = `http://localhost:8000/reset`;
    return fetch(url, {
      method: "GET" // *GET, POST, PUT, DELETE, etc.
      //body: script // body data type must match "Content-Type" header
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
      });
  };
