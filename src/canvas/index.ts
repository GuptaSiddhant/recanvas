import { type Canvas, createCanvas } from "canvas"
import { ElementName } from "src/dom/constants"

import type { DOMNode } from "../dom"
import Yoga from "yoga-layout-prebuilt"
import { clearCanvas, insertTextNode, insertViewNode } from "./helpers"

export default function render(node: DOMNode): Canvas {
  if (!node.yogaNode)
    throw new Error("Root element must have a attached YogaNode.")

  node.yogaNode.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR)

  const canvas = createCanvas(
    node.yogaNode.getComputedWidth(),
    node.yogaNode.getComputedHeight(),
  )

  renderDOMNodeToCanvas(canvas, node)

  return canvas
}

function renderDOMNodeToCanvas(
  canvas: Canvas,
  node: DOMNode,
  options: { offsetX?: number; offsetY?: number } = {},
): void {
  const { yogaNode, nodeName } = node
  const { offsetX = 0, offsetY = 0 } = options

  if (nodeName === ElementName.Root) clearCanvas(canvas)
  if (nodeName === ElementName.VirtualText) return
  if (!yogaNode) return
  if (yogaNode.getDisplay() === Yoga.DISPLAY_NONE) return

  const x = offsetX + yogaNode.getComputedLeft()
  const y = offsetY + yogaNode.getComputedTop()

  if (nodeName === ElementName.Text) {
    insertTextNode(canvas, node, x, y)
    return
  }

  if (nodeName === ElementName.View) {
    insertViewNode(canvas, node, x, y)
  }

  // For Root and View
  for (const childNode of node.childNodes) {
    renderDOMNodeToCanvas(canvas, childNode, {
      offsetX: x,
      offsetY: y,
    })
  }

  return
}
