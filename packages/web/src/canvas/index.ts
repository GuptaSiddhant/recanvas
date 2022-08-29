import { type DOMNode, NodeName } from "../renderer/types"

export { insertImage } from "./image"

export function createCanvas(
  width?: number,
  height?: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  if (width) canvas.width = width
  if (height) canvas.height = height

  return canvas
}

export function insertChildToCanvas(
  ctx: CanvasRenderingContext2D,
  child: DOMNode,
) {
  if (!child.nodeName) return

  switch (child.nodeName) {
    case NodeName.View: {
      const { x, y, width, height, style } = child.props
      ctx.fillStyle = style?.color || "black"
      ctx.fillRect(x, y, width, height)
      break
    }
    // case TEXT_NAME: {
    //   ctx.font = "40px Arial"
    //   ctx.fillStyle = "white"
    //   ctx.fillText(child.nodeValue, 0, 0)
    //   break
    // }
    // case ElementName.Text: {
    //   ctx.font = "20px Arial"
    //   ctx.fillStyle = "white"
    //   ctx.fillText(child.props.children?.toString() || "", 0, 0)
    //   break
    // }
    default:
      console.log("appendChild - not implemented", child)
  }
}
