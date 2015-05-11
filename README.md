# svgcanvas

Mock &lt;canvas> element using &lt;svg> (based on gliffy's canvas2svg).

## Difference from canvas2svg

- canvas2svg mocks only context API while this library also mocks <canvas> element

    You can set canvas.width, canvas.height and canvas.style and this will be synced to the svg element.

## Features

```javascript
var svgcanvas = new SVGCanvas();
svgcanvas.width = 100;
var height = svgcanvas.height;
```

- svgcanvas.width

- svgcanvas.height

- svgcanvas.style

- svgcanvas.className

- svgcanvas.id

- svgcanvas.getContext('2d')

- svgcanvas.getBoundingClientRect()
