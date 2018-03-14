const express = require('express');
const app = express();

app.use('/amf', require('./routes/amf'));

app.listen(8123, () => console.log('Example app listening on port 8123!'));
