// Router Bar
let rate_barChart = britecharts.bar();

let rate_barData = [];

for (let i = 8; i < 16; i++) {
  const router_name = "Router " + model_results[i][0];
  const router_rate = model_results[i][2];

  console.log(router_rate);

  router_object = { name: router_name, value: router_rate };

  rate_barData.push(router_object);
}

console.log(model_results);

rate_barChart
  .colorSchema(britecharts.colors.colorSchemas.britecharts)
  .percentageAxisToMaxRatio(1.3)
  .width(600)
  .height(400);
d3version4
  .select(".router_rate_bar")
  .datum(rate_barData)
  .call(rate_barChart);

// Router Error Rate Bar
let error_barChart = britecharts.bar();

let error_barData = [];

for (let i = 8; i < 16; i++) {
  const router_name = "Router " + model_results[i][0];
  const router_rate = model_results[i][3].slice(0, 5);

  console.log(router_rate.slice(0, 5));

  router_object = { name: router_name, value: router_rate };

  error_barData.push(router_object);
}

error_barChart
  .colorSchema(britecharts.colors.colorSchemas.britecharts)
  .percentageAxisToMaxRatio(1.3)
  .width(600)
  .height(400);
d3version4
  .select(".error_rate_bar")
  .datum(error_barData)
  .call(error_barChart);

// Donut
let donutLegend = britecharts.legend();
donutLegend
  .height(200)
  .width(400)
  .numberFormat("s");



// for each via (ID), count how many routers have been mentioned
let counters = [0,0,0,0,0,0,0,0]

for (let i = 18; i < 35; i++) {
  const viaID = model_results[i][0]
  const via_destination = model_results[i][2]
    for (let j = 0; j < 9; j++) {


        if(parseInt(via_destination.slice(0,1)) === j) {
            // increment counter for that position
            counters[j-1] += 1
        }
    }

}


let counters_sum = counters.reduce(function(a, b) { return a + b; }, 0);

let donutData = []

for (let i = 0; i < counters.length; i++) {
    const via = counters[i];
    const via_object_for_donut = {
        name: "Router " + (i+1).toString(),
        id: i,
        quantity: via,
        percentage: Math.trunc(via * 100 / counters_sum)
    }

    donutData.push(via_object_for_donut)

}

let donutChart = britecharts.donut();
// let donutData = [
//   { name: "Shiny", id: 1, quantity: 86, percentage: 5 },
//   { name: "Blazing", id: 2, quantity: 300, percentage: 18 },
//   { name: "Dazzling", id: 3, quantity: 276, percentage: 16 },
//   { name: "Radiant", id: 4, quantity: 195, percentage: 11 },
//   { name: "Sparkling", id: 5, quantity: 36, percentage: 2 },
//   { name: "Other", id: 0, quantity: 814, percentage: 48 }
// ];
donutChart
  .width(500)
  .height(300)
  .on("customMouseOver", function(data) {
    donutLegend.highlight(data.data.id);
  })
  .on("customMouseOut", function() {
    donutLegend.clearHighlight();
  });

d3version4
  .select(".donut")
  .datum(donutData)
  .call(donutChart);
d3version4
  .select(".donut_legend")
  .datum(donutData)
  .call(donutLegend);



// PROPAGATION RATE BAR

let propagation_barChart = britecharts.bar();

let propagation_barData = [];

for (let i = 18; i < 35; i++) {
    const viaID = model_results[i][0]
    const propagation_time = model_results[i][1]

    via_object = { name: viaID, value: propagation_time };
    propagation_barData.push(via_object)

}

propagation_barChart
  .colorSchema(britecharts.colors.colorSchemas.britecharts)
  .percentageAxisToMaxRatio(1.3)
  .width(600)
  .height(400);
d3version4
  .select(".propagation_bar")
  .datum(propagation_barData)
  .call(propagation_barChart);







// Stacked Area
let stackedAreaChart = britecharts.stackedArea();
let stackedAreaData = [
  { date: "2017-02-16T00:00:00", name: "Organizer Driven", value: 5 },
  { date: "2017-02-16T00:00:00", name: "EB Driven", value: 0 },
  { date: "2017-02-17T00:00:00", name: "Organizer Driven", value: 13 },
  { date: "2017-02-17T00:00:00", name: "EB Driven", value: 1 },
  { date: "2017-02-18T00:00:00", name: "Organizer Driven", value: 15 },
  { date: "2017-02-18T00:00:00", name: "EB Driven", value: 1 },
  { date: "2017-02-19T00:00:00", name: "Organizer Driven", value: 15 },
  { date: "2017-02-19T00:00:00", name: "EB Driven", value: 1 },
  { date: "2017-02-20T00:00:00", name: "Organizer Driven", value: 18 },
  { date: "2017-02-20T00:00:00", name: "EB Driven", value: 1 }
];
stackedAreaChart.width(500).height(300);
d3version4
  .select(".stackedArea")
  .datum(stackedAreaData)
  .call(stackedAreaChart);
// Line
let lineChart = britecharts.line();
let tooltip = britecharts.tooltip();
let lineData = {
  dataByTopic: [
    {
      topicName: "Cat data",
      topic: 2,
      dates: [
        {
          value: 1,
          date: "2015-06-27T00:00:00"
        },
        {
          value: 1,
          date: "2015-06-28T00:00:00"
        },
        {
          value: 4,
          date: "2015-06-29T00:00:00"
        },
        {
          value: 2,
          date: "2015-06-30T00:00:00"
        },
        {
          value: 3,
          date: "2015-07-01T00:00:00"
        },
        {
          value: 3,
          date: "2015-07-02T00:00:00"
        }
      ]
    }
  ]
};
lineChart
  .margin({
    top: 60,
    bottom: 50,
    left: 50,
    right: 20
  })
  .width(800)
  .height(300)
  .on("customMouseOver", tooltip.show)
  .on("customMouseMove", tooltip.update)
  .on("customMouseOut", tooltip.hide);
tooltip.title("CDN tooltip");
d3version4
  .select(".line")
  .datum(lineData)
  .call(lineChart);
d3version4
  .select(".line .metadata-group .vertical-marker-container")
  .datum([])
  .call(tooltip);
// Sparkline
let sparklineChart = britecharts.sparkline();
let sparklineData = [
  { value: 1, date: "2011-01-06T00:00:00" },
  { value: 5, date: "2011-01-07T00:00:00" },
  { value: 4, date: "2011-01-08T00:00:00" },
  { value: 7, date: "2011-01-09T00:00:00" },
  { value: 5, date: "2011-01-10T00:00:00" },
  { value: 6, date: "2011-01-11T00:00:00" },
  { value: 7, date: "2011-01-12T00:00:00" },
  { value: 8, date: "2011-01-13T00:00:00" },
  { value: 1, date: "2011-01-14T00:00:00" }
];
sparklineChart.width(300).height(150);
d3version4
  .select(".sparkline")
  .datum(sparklineData)
  .call(sparklineChart);
// Brush
let brushChart = britecharts.brush();
let brushData = [
  { value: 1, date: "2011-01-06T00:00:00" },
  { value: 5, date: "2011-01-07T00:00:00" },
  { value: 4, date: "2011-01-08T00:00:00" },
  { value: 2, date: "2011-01-09T00:00:00" },
  { value: 5, date: "2011-01-10T00:00:00" },
  { value: 6, date: "2011-01-11T00:00:00" },
  { value: 2, date: "2011-01-12T00:00:00" },
  { value: 8, date: "2011-01-13T00:00:00" },
  { value: 9, date: "2011-01-14T00:00:00" }
];
brushChart.width(600).height(100);
d3version4
  .select(".brush")
  .datum(brushData)
  .call(brushChart);
// Step
let stepChart = britecharts.step();
let stepData = [
  { key: "Ryan", value: 10 },
  { key: "Marcos", value: 7 },
  { key: "Sun", value: 4 }
];
stepChart.width(400).height(275);
d3version4
  .select(".step")
  .datum(stepData)
  .call(stepChart);
