// THIS SCRIPT IS NEVER CALLED 


$(function () {
    class MarkovChain {
        constructor(transitionMatrix) {
            this.transitionMatrix = transitionMatrix;
            this.state = 0;
        }


        transition() {
            var rectTransition = d3version4.select("#rectangle").transition();


            var sampledProb = Math.random();
            var nextState = 0;
            var requiredProb;

            //console.log('Sample prob:', sampledProb);

            for (var i = 0; i < this.transitionMatrix.length; i++) {
                requiredProb = this.transitionMatrix[this.state][i];
                nextState = i;

                //console.log(data.nodes[nextState])
                rectTransition.attr("transform", `translate(${data.nodes[nextState].x},${data.nodes[nextState].y})`).duration(500);

                //console.log('Required prob:', requiredProb);

                if (sampledProb < requiredProb) {
                    break;
                } else {
                    sampledProb -= requiredProb;
                }
            }

            //console.log('Next state:', nextState);
            this.state = nextState;
        }
    }

    console.log(salah)

    var data = {
        nodes: [
            { id: 'A', x: 100, y: 100 },
            { id: 'B', x: 200, y: 100 },
            { id: 'C', x: 300, y: 100 },
            { id: 'D', x: 300, y: 100 }
        ],
        edges: [
            { source: 0, target: 0, probability: 0.5 },
            { source: 0, target: 1, probability: 0.5 },
            { source: 1, target: 0, probability: 0.9 },
            { source: 1, target: 1, probability: 0.1 }
        ]
    }

    var svg = d3version4.select('.chart'),
        width = +svg.attr('width'),
        height = +svg.attr('height');

    var edges = svg.selectAll('path')
        .data(data.edges)
        .enter().append('path')
        .attr('class', 'edge');

    // Draw edges before nodes
    //drawEdges();

    /* Define the data for the circles */
    var elem = svg.selectAll("g")
        .data(data.nodes)

    /*Create and place the "blocks" containing the circle and the text */  
    var elemEnter = elem.enter()
        .append("g")
        .attr("transform", function(d){return "translate("+d.x+",80)"})

    /*Create the circle for each block */
    var circle = elemEnter.append("circle")
        .attr("r", function(d){return d.r} )
        .attr("stroke","black")
        .attr("fill", "white")

    /* Create the text for each block */
    elemEnter.append("text")
        .attr("dx", function(d){return -20})
        .text(function(d){return d.label})

    var nodes = svg.selectAll('image')
        .data(data.nodes)
        .enter().append('image')
        .attr('id', function (d, i) { return 'node_' + i })
        .attr('class', 'node')
        .attr('xlink:href', 'https://svgsilh.com/svg/2237420.svg')
        .attr('width', 50)
        .attr('height', 50)
        //.attr('r', 15)
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; })
        .call(d3version4.drag()
            .on('drag', drag));

    function drawEdges() {
        edges.attr('d', function (d) {
            // Initial and final coordinates
            var x1 = data.nodes[d.source].x+43,
                y1 = data.nodes[d.source].y+43,
                x2 = data.nodes[d.target].x+43,
                y2 = data.nodes[d.target].y+43;

            if (x1 == x2 && y1 == y2)
                return drawBezierCurve(x1, y1);
            return drawQuadraticCurve(x1, y1, x2, y2);
        });
    }

    function drawQuadraticCurve(x1, y1, x2, y2) {
        // Angle between initial and final coordinates
        var theta = Math.atan2(y2 - y1, x2 - x1);

        // How far the curve will be from the line connecting the two nodes
        var h = 80;

        // Curve control point
        var xf = (x1 + x2) / 2 + h * Math.cos(theta + Math.PI / 2),
            yf = (y1 + y2) / 2 + h * Math.sin(theta + Math.PI / 2);

        // Creating quadratic curve
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        return ('M' + x1 + ' ' + y1 +
            ' Q ' + xf + ' ' + yf +
            ', ' + x2 + ' ' + y2);
    }

    function drawBezierCurve(x, y) {
        // Creating Bézier curve with fixed size and orientation
        var d = 50;
        return ('M' + x + ' ' + y +
            ' C ' + (x + d) + ' ' + (y + d) +
            ', ' + (x - d) + ' ' + (y + d) +
            ', ' + x + ' ' + y);
    }

    function drag(d) {
        d.x = d3version4.event.x;
        d.y = d3version4.event.y;

        d3version4.select(this)
            .attr('x', d.x)
            .attr('y', d.y);

        // Redraw edges after dragging a node
        drawEdges();
    }

    function simulate() {

        markov = new MarkovChain(
            [[0, 1, 0],
            [0, 0, 1],
            [1, 0, 0]
            ]
        );

        window.setInterval(function () {
            $('#node_' + markov.state).removeClass('current-node');
            markov.transition();
            $('#node_' + markov.state).addClass('current-node');
        }, 1000);
    }

    simulate();
});