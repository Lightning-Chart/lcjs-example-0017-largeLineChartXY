/*
 * LightningChartJS example that showcases visualization of large XY line chart.
 */
// Import LightningChartJS
const lcjs = require("@arction/lcjs");

// Extract required parts from LightningChartJS.
const { lightningChart, PointShape, ColorCSS, SolidLine, SolidFill, Themes } =
  lcjs;

const {
  createProgressiveTraceGenerator
} = require('@arction/xydata');

const trendsCount = 10
const dataPerTrend = 500 * 1000

// Create chart and series.
const chart = lightningChart()
  .ChartXY({
    // theme: Themes.darkGold
  })
  .setTitle(`Line Chart with large data set (${((trendsCount * dataPerTrend)/10**6).toFixed(1)} million data points)`);

const seriesArray = new Array(trendsCount).fill().map(_ => chart
  .addLineSeries({ dataPattern: {
    pattern: 'ProgressiveX',
  } })
    .setStrokeStyle(stroke => stroke.setThickness(1))
)

seriesArray.forEach((series) => {
  createProgressiveTraceGenerator()
    .setNumberOfPoints(dataPerTrend)
    .generate()
    .toPromise()
    .then(data => {
      series.add(data)
    })
})

const legend = chart.addLegendBox()
  .add(chart)
  // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
  .setAutoDispose({
      type: 'max-width',
      maxWidth: 0.30,
  })
