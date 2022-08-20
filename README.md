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
so the canvas can be created with same principles of a flex-box.

## Installation

```bash
npm install recanvas
---
yarn add recanvas
```

## Usage

### Generate a canvas

```jsx
import { View, Text, Stage, renderCanvas } from "recanvas"

function generateCanvas() {
  const canvas = renderCanvas(
    <SocialImage />, // Element to be rendered on canvas
    dpr: 2, // quality is 1 by default, increase it for better quality (min: 0.1)
  )

  return canvas //
}

function SocialImage() {
  return (
    <Stage style={{ width: 400, height: 300 }} font={{ color: "white" }}>
      <View style={{ backgroundColor: "red", padding: 20 }}>
        <Text>Hello World</Text>
      </View>
    </Stage>
  )
}
```

### Return the image generated as response

- ExpressJs / Node HTTP

  ```js
  app.get("/image", (req, res) => {
    const canvas = generateCanvas()
    const buffer = canvas.toBuffer() // Node.Buffer (default mimeType: image/png)

    res.writeHead(200, {
      "Content-type": "image/png",
      "Cache-Control": "public, max-age=2592000",
      "Content-Length": Buffer.byteLength(buffer).toString(),
    })

    return res.send(buffer)
  }
  ```

- Remix-run / Native Response

  ```js
  export function loader() {
    const canvas = generateCanvas()
    const buffer = canvas.toBuffer() // Node.Buffer (default mimeType: image/png)

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=2592000",
        "Content-Length": Buffer.byteLength(buffer).toString(),
      },
    })
  }
  ```

## Example

- [Node-HTTP](https://codesandbox.io/s/recanvas-example-nrn9mt?file=/app.js)

## Future

Need to add support for:

- Images
- Multiline URL

## License

MIT © Siddhant Gupta
