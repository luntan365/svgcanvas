(function(global) {

    var countNonTransparentPixels = function(canvas) {
        var ctx = canvas.getContext('2d');
        var imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        var count = 0;
        for (var i = 3; i < imgdata.length; i += 4) {
            if (imgdata[i] > 0) {
                count++;
            }
        }
        return count;
    };

    global.testRender = function(describe, render) {
        var title = document.createElement('h3');
        title.innerHTML = describe;

        var canvas = document.createElement('canvas');
        var svgCanvas = new SVGCanvas();
        var diffCanvas = document.createElement('canvas');

        var fn = document.createElement('pre');
        fn.className = 'function';
        fn.innerHTML = render.toString().replace(/function(.*).*\{/g, '').replace(/}/g, '').replace(/^\s*|(\n)\s*/g, '$1');

        [title, fn, svgCanvas.svg, canvas, diffCanvas].forEach(function(elt) {
            document.body.appendChild(elt);
        });

        it(describe, function(done) {
            [canvas, svgCanvas].forEach(function(canvas) {
                canvas.width = 100;
                canvas.height = 100;
                render(canvas.getContext('2d'), canvas);
            });

            diffCanvas.width = 100;
            diffCanvas.height = 100;

            var ctx = diffCanvas.getContext('2d');
            ctx.globalCompositeOperation = 'xor';
            svgCanvas.toDataURL(function(err, svg) {
                var img = new Image();
                img.onload = function() {
                    ctx.drawImage(img, 0, 0);
                    ctx.drawImage(canvas, 0, 0);
                    var pixels = countNonTransparentPixels(canvas);
                    var xor = countNonTransparentPixels(diffCanvas);
                    var rate = xor / pixels;
                    if (rate > 0.1) {
                        var err = new Error("xorRate > 0.1, " + JSON.stringify({xor: xor, pixels: pixels, rate: rate}));
                        done(err);
                    } else {
                        done();
                    }
                };
                img.src = svg;
            });
        });
    };

})(this);
