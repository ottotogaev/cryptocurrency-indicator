const { log, error } = console;

const getData = async () => {
    const resp = await fetch('http://127.0.0.1:5000/BTCUSDT/1m');
    const data = await resp.json();
    return data;
};

// getData();

const renderChart = async () => {
    const domElement = document.getElementById('tvchart');
    const chart = LightweightCharts.createChart(domElement, {
        timeScale: {
            timeVisible: true,
            secondsVisible: true,
        }
    });
    const candleseries = chart.addCandlestickSeries();
    const klinedata = await getData();
    candleseries.setData(klinedata);
}
renderChart()