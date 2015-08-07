var Context = require('./context');

function SVGCanvas(options) {

    var debug = options && options.debug;

    this.ctx = new Context(100, 100, {debug: debug});
    this.svg = this.ctx.__root;

    // sync attributes to svg
    var svg = this.svg;
    var _this = this;

    var wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    this.wrapper = wrapper;

    Object.defineProperty(this, 'className', {
        get: function() {
            return wrapper.getAttribute('class') || '';
        },
        set: function(val) {
            return wrapper.setAttribute('class', val);
        }
    });

    ["width", "height"].forEach(function(prop) {
        Object.defineProperty(_this, prop, {
            get: function() {
                return svg.getAttribute(prop) | 0;
            },
            set: function(val) {
                if (isNaN(val) || (typeof val === "undefined")) {
                    return;
                }
                _this.ctx['__'+prop] = val;
                svg.setAttribute(prop, val);
                return wrapper[prop] = val;
            }
        });
    });

    ["style", "id"].forEach(function(prop) {
        Object.defineProperty(_this, prop, {
            get: function() {
                return wrapper[prop];
            },
            set: function(val) {
                if (typeof val !== "undefined") {
                    return wrapper[prop] = val;
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

SVGCanvas.prototype.toDataURL = function(type, options) {
    var SVGDataURL = "data:image/svg+xml;charset=utf-8," + encodeURI(this.getContext('2d').getSerializedSvg());
    if (type === "image/svg+xml" || !type) {
        return SVGDataURL;
    }
    if (type === "image/jpeg" || type === "image/png") {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = SVGDataURL;
        if (img.complete && img.width > 0 && img.height > 0) {
            // for chrome, it's ready immediately
            ctx.drawImage(img, 0, 0);
            return canvas.toDataURL(type, options);
        } else {
            // for firefox, it's not possible to provide sync api in current thread
            // and web worker doesn't provide canvas API, so
            throw new Error('svgcanvas.toDataURL() for jpeg/png is only available in Chrome.');
        }
    }
    throw new Error('Unknown type for SVGCanvas.prototype.toDataURL, please use image/jpeg | image/png | image/svg+xml.');
};

// will return wrapper element: <div><svg></svg></div>
SVGCanvas.prototype.getElement = function() {
    return this.wrapper;
};

module.exports = SVGCanvas;
