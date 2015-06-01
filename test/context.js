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
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(10,10);
            ctx.lineTo(30, 30);
            ctx.lineTo(60, 10);
            ctx.stroke(); // currentDefaultPath not including the final Z
            ctx.closePath();
        });
        // See also: https://github.com/gliffy/canvas2svg/pull/20
        testRender('ctx.stroke and ctx.closePath: excluding Z', function(ctx) {
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(10,10);
            ctx.lineTo(30, 30);
            ctx.lineTo(60, 10);
            ctx.closePath();
            ctx.stroke(); // currentDefaultPath including the final Z
        });
    });

    describe('arcTo', function() {
        // Example from https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo
        testRender('arcTo', function(ctx) {
            ctx.beginPath();
            ctx.moveTo(75, 10);
            ctx.arcTo(75, 50, 25, 10, 15);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.fillStyle = 'blue';
            ctx.fillRect(75, 10, 5, 5);
            ctx.fillStyle = 'red';
            ctx.fillRect(75, 50, 5, 5);
            ctx.fillRect(25, 10, 5, 5);
        });
    });
});
