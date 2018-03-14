export PATH=./node_modules/.bin:$PATH
mkdir -p build
rm -rf build/*

function ugly() {
  echo  `uglifyjs -c --screw-ie8 $1`
}
function compileAmf() {
  browserify --standalone AMF node_modules/amf-client-js/amf.js -o build/browserified.js
  # babel build/browserified.js > build/babeled.js
  # ugly "build/babeled.js"
}
# content=$(compileAmf)
compileAmf
# cat build/babeled.js > build/amf.js
