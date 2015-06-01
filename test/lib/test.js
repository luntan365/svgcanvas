(function(global) {
    global.testRender = function(describe, render) {
        global.describe(describe, function() {

            var title = document.createElement('h2');
            title.innerHTML = describe;

            var canvas = document.createElement('canvas');
            var svgCanvas = new SVGCanvas();

            var fn = document.createElement('p');
            fn.className = 'function';
            fn.innerHTML = render.toString();

            [title, fn, canvas, svgCanvas.svg].forEach(function(elt) {
                document.body.appendChild(elt);
            });

            var ret = [canvas, svgCanvas].map(function(canvas) {
                canvas.width = 100;
                canvas.height = 100;
                return render(canvas.getContext('2d'), canvas);
            });

            it('should have same behavior in SVG and Canvas', function() {
            });
        });
    };
})(this);
