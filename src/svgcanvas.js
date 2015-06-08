var Context = require('./context');

function SVGCanvas(options) {

    var debug = options && options.debug;

    this.ctx = new Context(100, 100, {debug: debug});
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
                    _this.ctx['__'+prop] = val;
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

// you should always use URL.revokeObjectURL after your work done
SVGCanvas.prototype.toObjectURL = function() {
    var data = this.getContext('2d').getSerializedSvg();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    return URL.createObjectURL(svg);
};

SVGCanvas.prototype.toDataURL = function(type, options, callback) {
    if (typeof type === "function") {
        callback = type;
        type = null;
    }
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    var svgCanvas = this;
    var serializedSVG = svgCanvas.getContext('2d').getSerializedSvg();
    var dataURL = "data:image/svg+xml;charset=utf-8," + serializedSVG;
    if (type === "image/jpeg" || type === "image/png") {
        var canvas = document.createElement('canvas');
        canvas.width = svgCanvas.width;
        canvas.height = svgCanvas.height;
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            callback(null, canvas.toDataURL(type, options));
        };
        img.src = dataURL;
    } else {
        callback(null, dataURL);
    }
};

module.exports = SVGCanvas;
