#!/bin/bash

browserify src/svgcanvas.js -s SVGCanvas > dist/umd/svgcanvas.js

c2s=$(cat src/canvas2svg.js | sed 's/module.exports = ctx/C2S = ctx/' | sed 's/^/    /' | sed 's/^ *$//')
svgcanvas=$(cat src/svgcanvas.js | sed 's/var C2S = require.*//' | sed 's/module.exports.*//' | sed 's/^/    /' | sed 's/^ *$//')
cat > dist/amd/svgcanvas.js <<EOF
define(function() {
    var C2S;

$c2s
$svgcanvas
    return SVGCanvas;
});
EOF
