const express = require('express');

const { TemperatureController } = require('../controllers/temperature-controller');

class TemperatureRouter {

  constructor(controller = new TemperatureController()) {
    this.controller = controller;
    this.router = express.Router();
  }

  getRouter() {
    this.controller.listenMessages();

    this.router
      .get('/name', this.controller.getTemperatureName)
      .get('/stream', this.controller.getStream);

    return this.router;
  }
}

module.exports = { TemperatureRouter };
