(function(global) {
    global.testRender = function(describe, render) {
        global.describe(describe, function() {

            var canvas = document.createElement('canvas');
            var svgCanvas = new SVGCanvas();

            document.body.appendChild(canvas);
            document.body.appendChild(svgCanvas.svg);

            var ret = [canvas, svgCanvas].map(function(canvas) {
                return render(canvas.getContext('2d'), canvas);
            });
        });
    };
})(this);
