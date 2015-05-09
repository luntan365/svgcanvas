var C2S = require('./canvas2svg');

function SVGCanvas() {
    this.ctx = new C2S();
    this.svg = this.ctx.__root;

    // sync updates of this.style, this.width, this.height to svg
    var svg = this.svg;
    ["width", "height", "style"].forEach(function(prop) {
        Object.defineProperty(this, prop, {
            get: function() {
                return svg[prop];
            },
            set: function(val) {
                svg[prop] = val;
            }
        });
    });
}

SVGCanvas.prototype.getContext = function(type) {
    if (type !== '2d') {
        throw new Error('Unsupported type of context for SVGCanvas');
    }

    return this.ctx;
};

module.exports = SVGCanvas;
