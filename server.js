const express = require('express');
const bodyPaster = require('body-parser');
const cors = require('cors');
const config = require('config');

const app = express();
const ip = config.express.ip;
const port = process.env.PORT || config.express.port;

app.use(cors());
app.use(bodyPaster.json());
app.use(bodyPaster.urlencoded({ extended: false}));


app.listen(port, (err) =>{
    if (err) return console.log(err);
    console.log('Server [http://'+ip+':'+port+'] was running!'); 
 }); 