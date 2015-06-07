var assert = chai.assert;

describe('Context API', function() {
    describe('rect', function() {
        testRender('rect', function(ctx) {
            ctx.fillStyle = '#ccc';
            ctx.rect(20, 20, 50, 50);
            ctx.fill();
        });
    });

    describe('stroke', function() {
        // See also: https://github.com/gliffy/canvas2svg/pull/20
        testRender('ctx.stroke and ctx.closePath: including Z', function(ctx) {
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(20, 20);
            ctx.lineTo(50, 50);
            ctx.lineTo(80, 20);
            ctx.stroke(); // currentDefaultPath not including the final Z
            ctx.closePath();
        });
        // See also: https://github.com/gliffy/canvas2svg/pull/20
        testRender('ctx.stroke and ctx.closePath: excluding Z', function(ctx) {
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(20, 20);
            ctx.lineTo(50, 50);
            ctx.lineTo(80, 20);
            ctx.closePath();
            ctx.stroke(); // currentDefaultPath including the final Z
        });
    });

    describe('arc', function() {
        // testRender('arc#1', function(ctx) {
        //     ctx.lineWidth = 3;
        //     ctx.strokeStyle = '#000';
        //     ctx.beginPath();
        //     ctx.moveTo(0, 0);
        //     ctx.arc(0, 0, 100, 0, Math.PI / 2);
        //     ctx.stroke();
        // });
    });

    describe('arcTo', function() {
        // Example from https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo
        testRender('arcTo#1', function(ctx) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(100, 0);
            ctx.arcTo(100, 100, 0, 100, 100);
            ctx.stroke();
        });
        testRender('arcTo#2', function(ctx) {
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.moveTo(75, 10);
            ctx.arcTo(75, 50, 25, 10, 15);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.fillStyle = 'blue';
            ctx.fillRect(75 - 2, 10 - 2, 4, 4);
            ctx.fillStyle = 'red';
            ctx.fillRect(75 - 2, 50 - 2, 4, 4);
            ctx.fillRect(25 - 2, 10 - 2, 4, 4);
            ctx.beginPath();
            ctx.moveTo(75, 50);
            ctx.lineTo(75, 10);
            ctx.moveTo(75, 50);
            ctx.lineTo(25, 10);
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        testRender('The arcTo(x1, y1, x2, y2, radius) method must first ensure there is a subpath for (x1, y1).', function(ctx) {
            // canvas's api just ignore it and do nothing
            ctx.beginPath();
            ctx.arcTo(100, 100, 0, 100, 15);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        });

        testRender('arcTo: must connect the point (x0, y0) to the start tangent point by a straight line', function(ctx) {
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.moveTo(0, 0);
            ctx.arcTo(100, 100, 0, 100, 20);
            ctx.strokeStyle = '#000';
            ctx.stroke();
        });

        // testRender('arcTo: arcTo after arc (test subpath)', function(ctx) {
        //     ctx.beginPath();
        //     ctx.lineWidth = 3;
        //     ctx.moveTo(0, 0);
        //     ctx.arc(50, 50, 30, -Math.PI/2, Math.PI/2);
        //     ctx.arcTo(100, 100, 0, 100, 10);
        //     ctx.strokeStyle = '#000';
        //     ctx.stroke();
        // });
    });
});
