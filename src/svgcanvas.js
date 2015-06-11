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

SVGCanvas.prototype.toDataURL = function(type, options) {
    var SVGDataURL = "data:image/svg+xml;charset=utf-8," + this.getContext('2d').getSerializedSvg();
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
        if (false && img.complete && img.width > 0 && img.height > 0) {
            // for chrome, it's ready immediately
            ctx.drawImage(img, 0, 0);
        } else {
            // for firefox, it's not possible to provide sync api in current thread
            // Let's do it in web worker
            var html = [
                "<script>",
                "var img = new Image();",
                "alert('hello');",
                "console.log(123);",
                "console.log('" + SVGDataURL + "');",
                "img.onload = function() { console.log(img) }; ",
                "</script>"
            ].join('');
            var iframe = document.createElement('iframe');
            iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(html);
            console.log(iframe.src);
            document.body.appendChild(iframe);
        }
        return canvas.toDataURL(type, options);
    }
    throw new Error('Unknown type for SVGCanvas.prototype.toDataURL, please use image/jpeg | image/png | image/svg+xml.');
};

module.exports = SVGCanvas;
