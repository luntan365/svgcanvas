# svgcanvas

I create this repo because I need a mock &lt;canvas&gt; element for my [p5.js-svg](https://github.com/zenozeng/p5.js-svg).
This lib is mainly based on gliffy's great work: [canvas2svg](https://github.com/gliffy/canvas2svg).

You should use [gliffy's canvas2svg](https://github.com/gliffy/canvas2svg) if what you want is canvas context.

The major difference is that: this lib also adds some mock API for **element** (such as width, height, style, className, getBoundingClientRect, toDataURL).

## Usage

```javascript
var svgcanvas = new SVGCanvas();
svgcanvas.width = 100;
var height = svgcanvas.height;
var ctx = svgcanvas.getContext('2d');
svgcanvas.toDataURL('image/jpeg', function(err, jpeg) {
    console.log(jpeg);
});
```

## Features

- It will gc some invisible elements to save resources

    When fillRect or clearRect called, if its args matches `0, 0, canvas.width, canvas.height`

- svgcanvas.width

- svgcanvas.height

- svgcanvas.style

- svgcanvas.className

- svgcanvas.id

- svgcanvas.getContext('2d')

- svgcanvas.getBoundingClientRect()

- canvas.toDataURL()

    Note: this is implemented in async way (due to image.onload issue)

- ctx.imageSmoothingEnabled

    Note: this is implemented using `properties["shape-rendering"] = "crispEdges"`

## Unit Test

See p5.js-svg's Unit Test:

http://zenozeng.github.io/p5.js-svg/test/

## License

The MIT License (MIT)

Copyright (c) 2015 Zeno Zeng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

This program incorporates work covered by the following copyright and permission notices:

- canvas2svg

    ```
    The MIT License (MIT)
    Copyright (c) 2014 Gliffy Inc.
    ```
