# Recanvas

**Build and render an image using canvas, yoga-layout and react in node environment.**

## About

This library is built to solve a simple (and maybe common) problem,
that rendering an image on server is hard.

The most common (and most probably straight-forward) solution is to
render an DOM element with the usual suspects (html, css, javascript)
and take a screenshot with testing libs like Puppeteer or Playwright.
That is a great solution if you already have the testing library already setup.

If you do not have the E2E setup or your server does not support running it
during the runtime, then this library is for you.

**Recanvas** uses `node-canvas` under the hood to render the image.
This allows for server-side rendering without using browser environment.
Alone, imperative canvas is very difficult to work with,
so this library provides `React` components to abstract the canvas methods.
Furthermore, it uses `yoga-layout` to layout the components,
so the canvas can be created with same principles of a flexbox.

## Installation

```bash
npm install recanvas
---
yarn add recanvas
```

## Usage

```jsx
import { View, Text, renderCanvas } from "recanvas"

function CanvasImage() {
  return (
    <View style={{ backgroundColor: "red" }}>
      <Text style={{ color: "white" }}>Hello World</Text>
    </View>
  )
}

function getCanvasBuffer() {
  const canvas = renderCanvas(<CanvasImage />, { width: 300, height: 300 })

  return canvas.toBuffer() // Node.Buffer (mimeType: image/png)
}
```

## Future

Need to add support for:

- Images
- Multiline URL

## License

MIT © Siddhant Gupta
