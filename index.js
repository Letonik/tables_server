require('dotenv').config();
const express = require('express');
const cors = require("cors");
const tableRouter = require('./routes/tableRoutes');
const path = require('path');

const PORT = process.env.PORT || 5000;
const IP = process.env.IP;
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', tableRouter);

app.get('/', (req, res) =>{
    res.sendfile(path.resolve(__dirname + "/static/index.html"));
});

const start = () => {
    try {
        app.listen(PORT, IP, () => {
            console.log(`node express work on ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }
}

start()