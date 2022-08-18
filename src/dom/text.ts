import type { RecanvasFont } from "../types"
import type { TextMeasure } from "../canvas/text"
import { measureText, wrapText } from "../canvas/text"
import { ElementName, TEXT_NAME } from "./constants"
import type { DOMElement, DOMNode } from "./dom-types"

export function squashTextNodes(element: DOMElement): string {
  let text = ""

  if (element.childNodes.length > 0) {
    for (const childNode of element.childNodes) {
      let nodeText = ""

      if (childNode.nodeName === TEXT_NAME) {
        nodeText = childNode.nodeValue
      } else {
        if (
          childNode.nodeName === ElementName.Text ||
          childNode.nodeName === ElementName.VirtualText
        ) {
          nodeText = squashTextNodes(childNode)
        }
      }

      text += nodeText
    }
  }

  return text
}

export function measureTextNode(
  node: DOMNode,
  font: RecanvasFont | undefined,
  maxWidth: number,
): TextMeasure {
  const text =
    node.nodeName === TEXT_NAME ? node.nodeValue : squashTextNodes(node)

  const dimensions = measureText(text, font, node.quality)

  // Text fits into container, no need to wrap
  if (dimensions.width <= maxWidth) {
    return dimensions
  }

  // This is happening when <Box> is shrinking child nodes and Yoga asks
  // if we can fit this text node in a <1px space, so we just tell Yoga "no"
  if (dimensions.width >= 1 && maxWidth > 0 && maxWidth < 1) {
    return dimensions
  }

  const truncate = font?.truncate
  const quality = node.quality
  const { height, width } = wrapText(text, maxWidth, font, truncate, quality)

  return { height, width }
}

export type { TextMeasure }
