/*
 * LightningChartJS example that showcases visualization of large XY line chart.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Import xydata
const xydata = require('@lightningchart/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, emptyFill, emptyLine, DataSetXY, Themes } = lcjs
const { createMultiChannelTraceGenerator } = xydata

const trendsCount = 10
const dataPerTrend = 500 * 1000

// Create chart and series.
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle(`Line Chart with large data set (${((trendsCount * dataPerTrend) / 10 ** 6).toFixed(1)} million data points)`)
    .setCursor((cursor) => cursor.setTickMarkerYVisible(false).setGridStrokeYStyle(emptyLine))

createMultiChannelTraceGenerator()
    .setNumberOfChannels(trendsCount)
    .setNumberOfPoints(dataPerTrend)
    .generate()
    .then((allData) => {
        const dataSet = new DataSetXY().appendSamples(allData)
        for (let i = 0; i < trendsCount; i += 1) {
            chart
                .addLineSeries()
                .setStrokeStyle((stroke) => stroke.setThickness(1))
                .setDataSet(dataSet, { x: 'x', y: `y${i}` })
        }
    })
