#!/bin/bash

browserify src/svgcanvas.js -s SVGCanvas > dist/umd/svgcanvas.js

content=$(cat src/canvas2svg.js src/context.js src/svgcanvas.js | sed 's/.*module.exports = ctx/    C2S = ctx/' | sed 's/.*\(module\|require\).*//' | sed 's/^/    /' | sed '/^ *$/d')

cat > dist/amd/svgcanvas.js <<EOF
define(function() {
    var C2S;
$content
    return SVGCanvas;
});
EOF
