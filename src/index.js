/*
 * LightningChartJS example that showcases visualization of large XY line chart.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Import xydata
const xydata = require('@arction/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, emptyFill, Themes } = lcjs

const { createProgressiveTraceGenerator } = xydata

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

Promise.all(
    new Array(trendsCount).fill(0).map((_) => createProgressiveTraceGenerator().setNumberOfPoints(dataPerTrend).generate().toPromise()),
).then((allData) => {
    for (let i = 0; i < trendsCount; i += 1) {
        chart
            .addPointLineAreaSeries({
                dataPattern: 'ProgressiveX',
            })
            .setStrokeStyle((stroke) => stroke.setThickness(1))
            .setAreaFillStyle(emptyFill)
            .appendJSON(allData[i])
    }
    const legend = chart
        .addLegendBox()
        .add(chart)
        // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
        .setAutoDispose({
            type: 'max-width',
            maxWidth: 0.3,
        })
})
