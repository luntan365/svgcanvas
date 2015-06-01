#!/bin/bash

echo "building dist/umd/svgcanvas.js"

sed -i 's/window.C2S = ctx/module.exports = ctx/' src/canvas2svg.js
browserify src/svgcanvas.js -s SVGCanvas > dist/umd/svgcanvas.js

echo "building dist/amd/svgcanvas.js"

content=$(cat src/canvas2svg.js src/context.js src/svgcanvas.js | sed 's/.*module.exports = ctx/    C2S = ctx/' | sed 's/.*\(module\|require\).*//' | sed 's/^/    /' | sed '/^ *$/d')

cat > dist/amd/svgcanvas.js <<EOF
define(function() {
    var C2S;
$content
    return SVGCanvas;
});
EOF
