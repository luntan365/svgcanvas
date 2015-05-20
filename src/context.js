var C2S = require('./canvas2svg');

var Context = function(width, height) {
    C2S.call(this);
    this.__width = width;
    this.__height = height;
    this.generations = [[]]; // used to collect element references for different generations
};

Context.prototype = Object.create(C2S.prototype);

Context.prototype.__createElement = function(elementName, properties, resetFill) {
    var element = C2S.prototype.__createElement.call(this, elementName, properties, resetFill);
    var currentGeneration = this.generations[this.generations.length - 1];
    currentGeneration.push(element);
    return element;
};

Context.prototype.gc = function() {
    this.generations.push([]);
    var ctx = this;
    // make sure it happens after current job done
    // for example: in p5.js's redraw use setTimeout will make gc called after both save() and restore() called
    setTimeout(function() {
        if (ctx.__groupStack.length > 0) {
            // we are between ctx.save() and ctx.restore(), skip gc
            return;
        }
        if (ctx.__currentElement.nodeName === 'path') {
            // we are still in path, skip gc
            return;
        }
        // keep only latest generation
        while (ctx.generations.length > 1) {
            var elements = ctx.generations.shift();
            var lastCount = 0;
            var count = elements.length;
            while (count > 0) {
                lastCount = count;
                elements = elements.filter(function(elem) {
                    // in case children may from live generation, gc from bottom to top
                    if (elem.children.length === 0) {
                        elem.remove();
                        return false;
                    } else {
                        return true;
                    }
                });
                count = elements.length;
                if (count === lastCount) {
                    // could not gc more, exit now
                    // save this elements to live generation
                    var liveGeneration = ctx.generations[ctx.generations.length - 1];
                    elements.forEach(function(elem) {
                        liveGeneration.push(elem);
                    });
                    // exit
                    break;
                }
            }
        }
    }, 0);
};

Context.prototype.clearRect = function(x, y, w, h) {
    if (x === 0 && y === 0 && w === this.__width && h === this.__height) {
        // remove all
        this.generations.forEach(function(elems) {
            elems.forEach(function(elem) {
                if (elem) {
                    elem.remove();
                }
            });
        });
        this.generations = [[]];
        var g = this.__createElement('g');
        this.__root.appendChild(g);
        this.__currentElement = g;
    } else {
        C2S.prototype.clearRect.call(this, x, y, w, h);
    }
};

Context.prototype.fillRect = function(x, y, w, h) {
    if (x === 0 && y === 0 && w === this.__width && h === this.__height) {
        this.gc();
    }
    C2S.prototype.fillRect.call(this, x, y, w, h);
};

module.exports = Context;
