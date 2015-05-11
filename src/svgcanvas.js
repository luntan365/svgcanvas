var C2S = require('./canvas2svg');

function SVGCanvas() {
    this.ctx = new C2S();
    this.svg = this.ctx.__root;

    // sync attributes to svg
    var svg = this.svg;
    var _this = this;

    Object.defineProperty(this, 'className', {
        get: function() {
            return svg.getAttribute('class') || '';
        },
        set: function(val) {
            return svg.setAttribute('class', val);
        }
    });

    ["width", "height"].forEach(function(prop) {
        Object.defineProperty(_this, prop, {
            get: function() {
                return svg.getAttribute(prop) | 0;
            },
            set: function(val) {
                if (typeof val !== "undefined") {
                    return svg.setAttribute(prop, val);
                }
            }
        });
    });

    ["style", "id"].forEach(function(prop) {
        Object.defineProperty(_this, prop, {
            get: function() {
                return svg[prop];
            },
            set: function(val) {
                if (typeof val !== "undefined") {
                    return svg.setAttribute(prop, val);
                }
            }
        });
    });

    ["getBoundingClientRect"].forEach(function(fn) {
        _this[fn] = function() {
            return svg[fn]();
        };
    });
}

SVGCanvas.prototype.getContext = function(type) {
    if (type !== '2d') {
        throw new Error('Unsupported type of context for SVGCanvas');
    }

    return this.ctx;
};

module.exports = SVGCanvas;
