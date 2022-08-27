import Yoga from "yoga-layout-prebuilt"

import { ElementName, TEXT_NAME } from "../constants"
import applyStyles from "./style"
import { measureTextNode } from "./text"
import type {
  DOMElement,
  DOMNode,
  DOMNodeAttribute,
  ElementProps,
  TextNode,
} from "./dom-types"
import type { RecanvasStyle } from "../types"
import store from "../store"

export function createNode(
  nodeName: ElementName,
  props: ElementProps = {},
): DOMElement {
  const node: DOMElement = {
    nodeName,
    style: {},
    attributes: {},
    childNodes: [],
    parentNode: null,
    yogaNode: Yoga.Node.create(),
    dpr: store.dpr,
  }

  if (nodeName === ElementName.Text) {
    const measureFunc = measureTextNode.bind(null, node, props.style)
    node.yogaNode.setMeasureFunc(measureFunc)
  }

  if (props.style) setStyle(node, props.style)

  for (const [key, value] of Object.entries(props)) {
    if (["style", "children"].includes(key)) continue

    setAttribute(node, key, value as DOMNodeAttribute)
  }

  return node
}

export function createTextNode(text: string): TextNode {
  const node: TextNode = {
    nodeName: TEXT_NAME,
    nodeValue: text,
    yogaNode: undefined,
    parentNode: null,
    style: {},
    dpr: store.dpr,
  }

  setTextNodeValue(node, text)

  return node
}

// update

export function setStyle(node: DOMNode, style: RecanvasStyle): void {
  const enrichedStyle = { ...style, dpr: store.dpr }
  node.style = enrichedStyle
  if (node.yogaNode) applyStyles(node, enrichedStyle)
}

export function setTextNodeValue(node: TextNode, text: string): void {
  if (typeof text !== "string") {
    text = String(text)
  }

  node.nodeValue = text
  markTextNodeAsDirty(node)
}

export function setAttribute(
  node: DOMElement,
  key: string,
  value: DOMNodeAttribute,
): void {
  node.attributes[key] = value
}

// insert

export function appendChildNode(node: DOMElement, childNode: DOMElement): void {
  if (childNode.parentNode) {
    removeChildNode(childNode.parentNode, childNode)
  }

  childNode.parentNode = node
  node.childNodes.push(childNode)

  if (childNode.yogaNode) {
    node.yogaNode?.insertChild(
      childNode.yogaNode,
      node.yogaNode.getChildCount(),
    )
  }

  markTextNodeAsDirty(node)
}

export const insertBeforeNode = (
  node: DOMElement,
  newChildNode: DOMNode,
  beforeChildNode: DOMNode,
): void => {
  if (newChildNode.parentNode) {
    removeChildNode(newChildNode.parentNode, newChildNode)
  }

  newChildNode.parentNode = node

  const index = node.childNodes.indexOf(beforeChildNode)
  if (index >= 0) {
    node.childNodes.splice(index, 0, newChildNode)
    if (newChildNode.yogaNode) {
      node.yogaNode?.insertChild(newChildNode.yogaNode, index)
    }

    return
  }

  node.childNodes.push(newChildNode)

  if (newChildNode.yogaNode) {
    node.yogaNode?.insertChild(
      newChildNode.yogaNode,
      node.yogaNode.getChildCount(),
    )
  }

  markTextNodeAsDirty(node)
}

// remove

export function removeChildNode(node: DOMElement, removeNode: DOMNode): void {
  if (removeNode.yogaNode) {
    removeNode.parentNode?.yogaNode?.removeChild(removeNode.yogaNode)
  }

  removeNode.parentNode = null

  const index = node.childNodes.indexOf(removeNode)
  if (index >= 0) {
    node.childNodes.splice(index, 1)
  }

  markTextNodeAsDirty(node)
}

export function cleanupYogaNode(node?: Yoga.YogaNode): void {
  node?.unsetMeasureFunc()
  node?.freeRecursive()
}

// Helper

function findClosestYogaNode(node?: DOMNode): Yoga.YogaNode | undefined {
  if (!node || !node.parentNode) {
    return undefined
  }

  return node.yogaNode ?? findClosestYogaNode(node.parentNode)
}

function markTextNodeAsDirty(node?: DOMNode): void {
  if (!node) return

  if (
    node.nodeName !== ElementName.Text &&
    node.nodeName !== ElementName.VirtualText
  ) {
    return
  }
  // Mark closest Yoga node as dirty to measure text dimensions again
  const yogaNode = findClosestYogaNode(node)
  yogaNode?.markDirty()
}
