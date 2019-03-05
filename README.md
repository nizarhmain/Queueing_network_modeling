This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

wine <br>
node <br>
They must be installed on your system in order to run the front end and the back end


### `Start a local http-server on index.html`

This can be achieved either with the vscode extension or http-server module or any http service

### `In order to run the qnap api`

node server.js

This will execute qnap through wine, (assuming you are on a unix system).

### `Libraries that are used`

Bulma for css
D3.js for the charts
Britecharts as a framework for d3
jquery for basic user interactions
NodeJS for the server-side api


There are two conflicting graphs that use two different versions of d3
the markov-chains.js uses the d3 version 4
The network_graph.js uses the d3 version 3

During the import we renamed those two versions in order to avoid conflict.


