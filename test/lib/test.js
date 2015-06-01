(function(global) {

    global.testRender = function(describe, render) {
        it(describe, function() {
            var title = document.createElement('h3');
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
        });
    };

})(this);
