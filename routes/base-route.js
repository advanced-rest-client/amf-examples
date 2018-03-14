'use strict';
class BaseRoute {

  constructor() {
    this._onGetOptions = this._onGetOptions.bind(this);
  }

  /**
   * Sends an error response to the client.
   *
   * @param {Object} resp Express response object.
   * @param {Number} code Error status code. Default 400.
   * @param {String} errorCode Error code.
   * @param {Object} message Error object
   */
  sendError(resp, code, errorCode, message) {
    message.code = errorCode;
    const body = JSON.stringify(message, null, 2);
    resp.set('Content-Type', 'application/json');
    resp.status(code || 400).send(body);
  }
  /**
   * Send an API success response.
   * @param {Object} resp Express response object.
   * @param {Object} obj An object to stringnify and send.
   * @param {Number} statusCode Response status code. Default 200.
   */
  sendObject(resp, obj, statusCode) {
    statusCode = statusCode || 200;
    obj = obj || {};
    const body = JSON.stringify(obj, null, 2);
    resp.set('Content-Type', 'application/json');
    resp.status(statusCode).send(body);
  }

  _onGetOptions(req, res) {
    this.appendCors(req, res);
    res.set('Content-Type', 'plain/text');
    res.status(200).send('GET,HEAD,POST');
  }

  appendCors(req, res) {
    var origin = req.get('origin');
    var allowed = false;
    if (origin) {
      if (origin.indexOf('http://127.0.0.1') === 0 || origin.indexOf('http://localhost') === 0) {
        res.set('access-control-allow-origin', origin);
        allowed = true;
      } else if (origin.indexOf('https://install.advancedrestclient.com') === 0) {
        res.set('access-control-allow-origin', origin);
        allowed = true;
      } else if (origin.indexOf('https://advancedrestclient.com') === 0) {
        res.set('access-control-allow-origin', origin);
        allowed = true;
      }
    }
    if (allowed) {
      res.set('allow', 'GET,HEAD');
      res.set('access-control-allow-headers', 'authorization');
    }
  }
}

module.exports.BaseRoute = BaseRoute;
