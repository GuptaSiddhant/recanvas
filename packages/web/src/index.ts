// import renderNodeToCanvas from "./canvas"
// import renderDom from "./dom"
import { createElement, useEffect, useRef } from "react"
import { insertImage } from "./canvas"
import store from "./store"

export interface RenderOptions {
  /**
   * Device Pixel Ratio (dpr) determines the quality.
   * It is 1 by default, increase it for better quality (min: 0.1).
   */
  dpr?: number
}

/**
 * Generate Canvas by rendering the provided React Element.
 *
 * Asynchronous function. Must be awaited to get the Canvas.
 */
export async function renderCanvas(
  element: React.ReactElement,
  canvas: HTMLCanvasElement,
  options: RenderOptions = {},
  callback?: () => void,
) {
  store.dpr = options.dpr || 1

  // const node = renderDom(element, callback)

  // return renderNodeToCanvas(node)
  canvas.width = 800
  canvas.height = 500

  const ctx = canvas.getContext("2d")!
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "white"
  ctx.textBaseline = "top"
  ctx.font = "40px Arial"
  ctx.fillText("Hello", 0, 0)

  insertImage(
    ctx,
    "https://media.istockphoto.com/photos/helsinki-finland-picture-id183996236?k=20&m=183996236&s=612x612&w=0&h=mMGqh_q8Mmc1deERz75fEVsB49buscSnCOweo8xlbUA=",
    {
      x: 0,
      y: 0,
    },
  )

  // ctx.drawImage(image, 180, 30, 250, 180, 150, 100, 500, 300)
  // ctx.drawImage(image, 180, 30, 250, 180, 200, 120, 500, 300)

  return canvas
}

// Components
export * from "./components"

// Enums and Types
export {
  type LayoutStyle,
  type RecanvasFont,
  type ThemeStyle,
  RecanvasFontFamily,
  RecanvasFontStyle,
  RecanvasFontVariant,
  RecanvasFontWeight,
} from "./types"

export function useCanvas(element: React.ReactElement) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      renderCanvas(element, ref.current)
    }
  }, [ref])

  return () => createElement("canvas", { ref })
}
