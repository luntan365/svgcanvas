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
    if (this.__groupStack.length > 0) {
        // we are between ctx.save() and ctx.restore, skip gc
        return;
    }
    if (this.__currentElement.nodeName !== 'path') {
        // we are still in path, skip gc
        return;
    }
    this.generations.push([]);
    var deadGeneration = this.generations.shift();
    setTimeout(function() {
        deadGeneration.forEach(function(element) {
            element.remove();
        });
    }, 100);
};

Context.prototype.clearRect = function(x, y, w, h) {
    if (x === 0 && y === 0 && w === this.__width && h === this.__height) {
        this.gc();
    }
    C2S.prototype.clearRect.call(this, x, y, w, h);
};

Context.prototype.fillRect = function(x, y, w, h) {
    if (x === 0 && y === 0 && w === this.__width && h === this.__height) {
        this.gc();
    }
    C2S.prototype.fillRect.call(this, x, y, w, h);
};

module.exports = Context;
