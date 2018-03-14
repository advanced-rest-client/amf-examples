const amf = require('amf-client-js');

class AmfParser {
  parseFile(from, url) {
    const parser = this.getParser(from);
    parser.parseFile(url);
  }

  getParser(from) {
    if (from === 'raml10') {
      return amf.Core.parser('RAML 1.0', 'application/yaml');
    }
    if (from === 'raml08') {
      return amf.Core.parser('RAML 0.8', 'application/yaml');
    }
    if (from === 'oas') {
      return amf.Core.parser('OAS 2.0', 'application/json');
    }
    return amf.Core.parser('AMF Graph', 'application/ld+json');
  }
}

module.exports.AmfParser = AmfParser;
