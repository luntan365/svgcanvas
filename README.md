# svgcanvas

I create this repo because I need a mock &lt;canvas&gt; element for my [p5.js-svg](https://github.com/zenozeng/p5.js-svg).
This lib is mainly based on gliffy's great work: [canvas2svg](https://github.com/gliffy/canvas2svg.git).

You should use [gliffy's canvas2svg](https://github.com/gliffy/canvas2svg.git) if what you want is canvas context.

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
