console.log(britecharts);

// Bar
var barChart = britecharts.bar();
var barData = [
    {name: 'Ryan', value:3},
    {name: 'Marcos', value: 5},
    {name: 'Sun', value: 4}
];
barChart
    .colorSchema(britecharts.colors.colorSchemas.britecharts)
    .percentageAxisToMaxRatio(1.3)
    .width(400)
    .height(300);
d3version4.select('.bar').datum(barData).call(barChart);
// Donut
var donutChart = britecharts.donut();
var donutData = [
    { name: 'Shiny', id: 1, quantity: 86, percentage: 5 },
    { name: 'Blazing', id: 2, quantity: 300, percentage: 18 },
    { name: 'Dazzling', id: 3, quantity: 276, percentage: 16 },
    { name: 'Radiant', id: 4, quantity: 195, percentage: 11 },
    { name: 'Sparkling', id: 5, quantity: 36, percentage: 2 },
    { name: 'Other', id: 0, quantity: 814, percentage: 48 }
];
donutChart
    .width(400)
    .height(300);
d3version4.select('.donut').datum(donutData).call(donutChart);
// Stacked Area
var stackedAreaChart = britecharts.stackedArea();
var stackedAreaData = [
    { date: '2017-02-16T00:00:00', name: 'Organizer Driven', value: 5 },
    { date: '2017-02-16T00:00:00', name: 'EB Driven', value: 0 },
    { date: '2017-02-17T00:00:00', name: 'Organizer Driven', value: 13 },
    { date: '2017-02-17T00:00:00', name: 'EB Driven', value: 1 },
    { date: '2017-02-18T00:00:00', name: 'Organizer Driven', value: 15 },
    { date: '2017-02-18T00:00:00', name: 'EB Driven', value: 1 },
    { date: '2017-02-19T00:00:00', name: 'Organizer Driven', value: 15 },
    { date: '2017-02-19T00:00:00', name: 'EB Driven', value: 1 },
    { date: '2017-02-20T00:00:00', name: 'Organizer Driven', value: 18 },
    { date: '2017-02-20T00:00:00', name: 'EB Driven', value: 1 }
];
stackedAreaChart
    .width(500)
    .height(300);
d3version4.select('.stackedArea').datum(stackedAreaData).call(stackedAreaChart);
// Line
var lineChart = britecharts.line();
var tooltip = britecharts.tooltip();
var lineData =  {
    dataByTopic: [{
        topicName: 'Cat data',
        topic: 2,
        dates: [
            {
                value: 1,
                date: '2015-06-27T00:00:00'
            },
            {
                value: 1,
                date: '2015-06-28T00:00:00'
            },
            {
                value: 4,
                date: '2015-06-29T00:00:00'
            },
            {
                value: 2,
                date: '2015-06-30T00:00:00'
            },
            {
                value: 3,
                date: '2015-07-01T00:00:00'
            },
            {
                value: 3,
                date: '2015-07-02T00:00:00'
            }
        ]
    }]
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
    .on('customMouseOver', tooltip.show)
    .on('customMouseMove', tooltip.update)
    .on('customMouseOut', tooltip.hide);
tooltip
    .title('CDN tooltip');
d3version4.select('.line').datum(lineData).call(lineChart);
d3version4.select('.line .metadata-group .vertical-marker-container').datum([]).call(tooltip)
// Sparkline
var sparklineChart = britecharts.sparkline();
var sparklineData = [
    { value: 1, date: '2011-01-06T00:00:00' },
    { value: 5, date: '2011-01-07T00:00:00' },
    { value: 4, date: '2011-01-08T00:00:00' },
    { value: 7, date: '2011-01-09T00:00:00' },
    { value: 5, date: '2011-01-10T00:00:00' },
    { value: 6, date: '2011-01-11T00:00:00' },
    { value: 7, date: '2011-01-12T00:00:00' },
    { value: 8, date: '2011-01-13T00:00:00' },
    { value: 1, date: '2011-01-14T00:00:00' }
];
sparklineChart
    .width(300)
    .height(150);
d3version4.select('.sparkline').datum(sparklineData).call(sparklineChart);
// Brush
var brushChart = britecharts.brush();
var brushData = [
    { value: 1, date: '2011-01-06T00:00:00' },
    { value: 5, date: '2011-01-07T00:00:00' },
    { value: 4, date: '2011-01-08T00:00:00' },
    { value: 2, date: '2011-01-09T00:00:00' },
    { value: 5, date: '2011-01-10T00:00:00' },
    { value: 6, date: '2011-01-11T00:00:00' },
    { value: 2, date: '2011-01-12T00:00:00' },
    { value: 8, date: '2011-01-13T00:00:00' },
    { value: 9, date: '2011-01-14T00:00:00' }
];
brushChart
    .width(600)
    .height(100);
d3version4.select('.brush').datum(brushData).call(brushChart);
// Step
var stepChart = britecharts.step();
var stepData = [
    {key: 'Ryan', value:10},
    {key: 'Marcos', value: 7},
    {key: 'Sun', value: 4}
];
stepChart
    .width(400)
    .height(275);
d3version4.select('.step').datum(stepData).call(stepChart);