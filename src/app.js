const express = require('express');
const app = express();
const server = app.listen(5000, console.log('Proxy server is running on port 5000'))
const got = require('got')
const cors = require('cors');

// Tulind Functions
const { sma_inc } = require('./indicators');


app.use(cors());

app.get('/', (_, res) => res.status(200).send('Proxy server works!'));
app.get('/:symbol/:interval', async (req, res) => {
    try {
        const { symbol, interval } = req.params;
        const url = 'https://api.binance.com/api/v3/klines?symbol=' + symbol + '&interval=' + interval
        const response = await got(url);
        const data = JSON.parse(response.body);
        let klinesdata = data.map(d => ({
            time: d[0] / 1000,
            open: +d[1],
            high: +d[2],
            low: +d[3],
            close: +d[4],
        }));
        klinesdata = await sma_inc(klinesdata);
        res.status(200).json(klinesdata);
    } catch (err) {
        res.status(500).send(err);
    }
})