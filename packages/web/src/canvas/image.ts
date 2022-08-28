export type ImageOptions = {
  x: number
  y: number
  height?: number
  width?: number
} & (
  | { resize?: "crop" | "fill" | "fit"; origin?: string }
  | {
      source: {
        x: number
        y: number
        width: number
        height: number
      }
    }
)

export async function insertImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  options: ImageOptions,
) {
  if (!src) return

  try {
    const image = await loadImage(src)
    const { width: imageWidth, height: imageHeight } = image

    const dx: number = options.x,
      dy: number = options.y,
      dw: number = options.width || imageWidth,
      dh: number = options.height || dw * (imageHeight / imageWidth)

    if ("source" in options) {
      const sx = options.source.x
      const sy = options.source.y
      const sw = options.source.width
      const sh = options.source.height

      return ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    }

    const { resize } = options
    let sx: number = 0,
      sy: number = 0,
      sw: number = imageWidth,
      sh: number = imageHeight

    if (resize === "crop") {
      sw = dw
      sh = dh

      return ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    }

    if (resize === "fill") {
      return drawImageFill(ctx, image, dx, dy, dw, dh)
    }

    return ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  } catch (e) {
    console.error("Image error:", e)
  }
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise(async (resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
 */
function drawImageFill(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  offsetX: number = 0.5,
  offsetY: number = 0.5,
) {
  if (arguments.length === 2) {
    x = y = 0
    w = ctx.canvas.width
    h = ctx.canvas.height
  }

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0
  if (offsetY < 0) offsetY = 0
  if (offsetX > 1) offsetX = 1
  if (offsetY > 1) offsetY = 1

  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r, // new prop. width
    nh = ih * r, // new prop. height
    cx,
    cy,
    cw,
    ch,
    ar = 1

  // decide which gap to fill
  if (nw < w) ar = w / nw
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh // updated
  nw *= ar
  nh *= ar

  // calc source rectangle
  cw = iw / (nw / w)
  ch = ih / (nh / h)

  cx = (iw - cw) * offsetX
  cy = (ih - ch) * offsetY

  // make sure source rectangle is valid
  if (cx < 0) cx = 0
  if (cy < 0) cy = 0
  if (cw > iw) cw = iw
  if (ch > ih) ch = ih

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}
