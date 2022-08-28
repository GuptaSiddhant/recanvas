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

// import { ElementName } from "../constants"
// // import type { DOMNode } from "../dom"
// import Yoga from "yoga-layout-prebuilt"
// import { clearCanvas } from "./helpers"
// import { insertTextToCanvas } from "./text"
// import { insertImageToCanvas } from "./image"
// import { insertViewToCanvas } from "./view"

// export default async function render(node: DOMNode): Promise<Canvas> {
//   if (!node.yogaNode)
//     throw new Error("Root element must have a attached YogaNode.")

//   node.yogaNode.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR)

//   const canvas = new Canvas(
//     node.yogaNode.getComputedWidth(),
//     node.yogaNode.getComputedHeight(),
//     "image",
//   )

//   const ctx = canvas.getContext("2d")
//   await renderDOMNodeToCanvas(ctx, node)

//   return canvas
// }

// async function renderDOMNodeToCanvas(
//   ctx: CanvasRenderingContext2D,
//   node: DOMNode,
//   options: { offsetX?: number; offsetY?: number } = {},
// ): Promise<void> {
//   const { yogaNode, nodeName } = node
//   const { offsetX = 0, offsetY = 0 } = options

//   if (!yogaNode) return
//   if (nodeName === ElementName.Root) clearCanvas(ctx)
//   if (nodeName === ElementName.VirtualText) return
//   if (yogaNode.getDisplay() === Yoga.DISPLAY_NONE) return

//   const x = offsetX + yogaNode.getComputedLeft()
//   const y = offsetY + yogaNode.getComputedTop()

//   if (nodeName === ElementName.Text) {
//     return insertTextToCanvas(ctx, node, x, y)
//   }

//   if (nodeName !== ElementName.Root) {
//     insertViewToCanvas(ctx, node, x, y)
//     // if (nodeName === ElementName.Image) {
//     await insertImageToCanvas(ctx, node, x, y)
//     // }
//   }

//   // For Root and View
//   for (const childNode of node.childNodes) {
//     renderDOMNodeToCanvas(ctx, childNode, {
//       offsetX: x,
//       offsetY: y,
//     })
//   }

//   return
// }
