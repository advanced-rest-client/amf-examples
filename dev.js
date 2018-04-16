const amf = require('amf-client-js');
const fs = require('fs');

amf.plugins.document.WebApi.register();
amf.plugins.document.Vocabularies.register();
amf.plugins.features.AMFValidation.register();

// const dataPath = 'raml-examples/raml-query-params';
// const dataPath = 'raml-examples/raml-headers';
// const dataPath = 'raml-examples/raml-body-params';
// const dataPath = 'raml-examples/raml-auth';
// const dataPath = 'raml-examples/url-params';
const dataPath = 'raml-examples/raml-example-api';
// const dataPath = 'raml-examples/exchange-experience-api';
amf.Core.init().then(() => {
  const ramlParser = amf.Core.parser('RAML 1.0', 'application/yaml');
  const jsonLdParser = amf.Core.generator('AMF Graph', 'application/ld+json');
  ramlParser.parseFileAsync(`file://${dataPath}/api.raml`)
  .then((doc) => {
    const r = amf.Core.resolver('RAML 1.0');
    doc = r.resolve(doc, 'editing');
    return jsonLdParser.generateString(doc);
  })
  .then((data) => {
    fs.writeFileSync(`${dataPath}/dev-out.json`, data, 'utf8');
  })
  .catch((cause) => {
    console.error(cause);
  });
});
