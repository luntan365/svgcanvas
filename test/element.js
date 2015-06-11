var assert = chai.assert;

describe('Element API', function() {

    describe('toDataURL', function() {

        var svgCanvas = new SVGCanvas();
        var ctx = svgCanvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(10, 10, 100, 100);
        ctx.closePath();
        ctx.strokeStyle = '#000';
        ctx.stroke();

        it('should export svg', function() {
            var dataurl = svgCanvas.toDataURL();
            assert.notEqual(dataurl.indexOf('M 10 10 L 110 10 L 110 110 L 10 110 L 10 10'),
                            -1);
        });

        it('should export png', function() {
            var dataurl = svgCanvas.toDataURL('image/png');
            assert.notEqual(dataurl.indexOf('data:image/png'), -1);
            console.log(dataurl);
        });

        // it('should export jpeg', function() {
        //     var dataurl = svgCanvas.toDataURL('image/jpeg');
        //     assert.notEqual(dataurl.indexOf('data:image/jpeg'), -1);
        //     console.log(dataurl);
        // });

        it('should throw error when exporting unknown type', function() {
            assert.throws(function() {
                svgCanvas.toDataURL('unknown-type');
            });
        });

    });

});
