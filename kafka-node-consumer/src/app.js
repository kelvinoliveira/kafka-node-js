const express = require('express');

const { TemperatureRouter } = require('./routers/temperature-router');

const app = express();
app.use(express.static('src/public'));
app.use('/temperature', new TemperatureRouter().getRouter());

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
});
