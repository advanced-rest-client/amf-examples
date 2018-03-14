const express = require('express');
const {BaseRoute} = require('./base-route');
const {AmfParser} = require('./amf-parser');
const router = express.Router();
const amf = require('amf-client-js');

amf.plugins.document.WebApi.register();
amf.plugins.document.Vocabularies.register();
amf.plugins.features.AMFValidation.register();

let ready = false;
amf.Core.init().then(() => {
  ready = true;
  console.log('AMF core ready');
});

class UserRoute extends BaseRoute {
  constructor() {
    super();
    this.initRoute();
  }

  initRoute() {
    router.get('/raml-example-api', this._onRamlExampleApi.bind(this));
  }

  _onRamlExampleApi(req, res) {
    if (!ready) {
      return this.sendError(res, 500, 'E_NOT_READY', {
        message: 'AMF not ready'
      });
    }
    const parser = new AmfParser();
    parser.parseFile('./raml-example-api')
    .then((doc) => {
      this.sendObject(res, doc);
    });
  }
}
new UserRoute();
module.exports = router;
