import createReconciler, { type Fiber, type HostConfig } from "react-reconciler"

import Yoga from "../yoga"
import { ElementName } from "./constants"
import {
  appendChildNode,
  cleanupYogaNode,
  createNode,
  createTextNode,
  insertBeforeNode,
  removeChildNode,
  setAttribute,
  setStyle,
  setTextNodeValue,
} from "./helpers"
import type { Styles } from "./style"
import type {
  DOMElement,
  DOMNode,
  DOMNodeAttribute,
  ElementProps,
  TextNode,
} from "./types"

interface HostContext {
  isInsideText: boolean
}

const hostConfig: HostConfig<
  ElementName,
  ElementProps,
  DOMElement,
  DOMElement,
  TextNode,
  never,
  never,
  DOMNode,
  HostContext,
  ElementProps,
  unknown,
  unknown,
  unknown
> = {
  isPrimaryRenderer: true,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  noTimeout: -1,
  prepareForCommit: () => null,
  preparePortalMount: () => null,
  clearContainer: () => false,
  resetAfterCommit: () => null,
  shouldSetTextContent: () => false,
  resetTextContent: () => {},
  getPublicInstance: (instance) => instance,
  finalizeInitialChildren: () => false,

  hideTextInstance: (node) => setTextNodeValue(node, ""),
  unhideTextInstance: (node, text) => setTextNodeValue(node, text),
  hideInstance: (node) => node.yogaNode.setDisplay(Yoga.DISPLAY_NONE),
  unhideInstance: (node) => node.yogaNode.setDisplay(Yoga.DISPLAY_FLEX),

  // context

  getRootHostContext() {
    return { isInsideText: false }
  },

  getChildHostContext(parentHostContext, type, rootContainer) {
    const previousIsInsideText = parentHostContext.isInsideText
    const isInsideText = type === "canvas-text"

    if (previousIsInsideText === isInsideText) return parentHostContext
    return { isInsideText }
  },

  // add

  appendInitialChild: appendChildNode,
  appendChild: appendChildNode,
  insertBefore: insertBeforeNode,
  appendChildToContainer: appendChildNode,
  insertInContainerBefore: insertBeforeNode,

  // remove

  removeChild(parentInstance, child) {
    removeChildNode(parentInstance, child)
    cleanupYogaNode(child.yogaNode)
  },

  removeChildFromContainer(container, child) {
    removeChildNode(container, child)
    cleanupYogaNode(child.yogaNode)
  },

  // create

  createInstance(originalType, props, _rootContainer, hostContext) {
    if (hostContext.isInsideText && originalType === ElementName.View) {
      throw new Error(`<View> can not be nested inside <Text> component`)
    }
    const type =
      originalType === ElementName.Text && hostContext.isInsideText
        ? ElementName.VirtualText
        : originalType

    const node = createNode(type, props)

    return node
  },

  createTextInstance: function (text, _rootContainer, hostContext) {
    if (!hostContext.isInsideText)
      throw new Error(
        `Text string "${text}" must be rendered inside <Text> component`,
      )

    return createTextNode(text)
  },

  // update

  prepareUpdate: (_instance, _type, oldProps, newProps) =>
    createUpdatePayload(oldProps, newProps),

  commitTextUpdate: (node, _oldText, newText) =>
    setTextNodeValue(node, newText),

  commitUpdate(node, updatePayload) {
    if (updatePayload.style) setStyle(node, updatePayload.style)

    for (const [key, value] of Object.entries(updatePayload)) {
      if (key === "children" || key === "style") continue
      setAttribute(node, key, value as DOMNodeAttribute)
    }
  },

  // Other

  scheduleTimeout: function (fn, delay) {
    throw new Error("Function not implemented.")
  },
  cancelTimeout: function (id): void {
    throw new Error("Function not implemented.")
  },
  getCurrentEventPriority: function (): number {
    throw new Error("Function not implemented.")
  },
  getInstanceFromNode: function (node): Fiber | null | undefined {
    throw new Error("Function not implemented.")
  },
  beforeActiveInstanceBlur: function (): void {
    throw new Error("Function not implemented.")
  },
  afterActiveInstanceBlur: function (): void {
    throw new Error("Function not implemented.")
  },
  prepareScopeUpdate: function (scopeInstance, instance): void {
    throw new Error("Function not implemented.")
  },
  getInstanceFromScope: function (scopeInstance) {
    throw new Error("Function not implemented.")
  },
  detachDeletedInstance: function (node): void {
    throw new Error("Function not implemented.")
  },
}

export default createReconciler(hostConfig)

// Helper

function createUpdatePayload(
  oldProps: ElementProps,
  newProps: ElementProps,
): ElementProps {
  const updatePayload: ElementProps = {}
  const keys = Object.keys(newProps) as (keyof ElementProps)[]

  for (const key of keys) {
    if (newProps[key] !== oldProps[key]) {
      const isStyle =
        key === "style" &&
        typeof newProps.style === "object" &&
        typeof oldProps.style === "object"

      if (isStyle) {
        const newStyle = newProps.style as Styles
        const oldStyle = oldProps.style as Styles
        const styleKeys = Object.keys(newStyle) as Array<keyof Styles>

        for (const styleKey of styleKeys) {
          // Always include `borderColor` and `borderStyle` to ensure border is rendered,
          // otherwise resulting `updatePayload` may not contain them
          // if they weren't changed during this update
          if (styleKey === "borderStyle" || styleKey === "borderColor") {
            if (typeof updatePayload.style !== "object") {
              // Linter didn't like `= {} as Style`
              const style: Styles = {}
              updatePayload.style = style
            }

            ;(updatePayload.style as any).borderStyle = newStyle.borderStyle
            ;(updatePayload.style as any).borderColor = newStyle.borderColor
          }

          if (newStyle[styleKey] !== oldStyle[styleKey]) {
            if (typeof updatePayload.style !== "object") {
              // Linter didn't like `= {} as Style`
              const style: Styles = {}
              updatePayload.style = style
            }

            ;(updatePayload.style as any)[styleKey] = newStyle[styleKey]
          }
        }

        continue
      }

      ;(updatePayload as any)[key] = newProps[key]
    }
  }

  return updatePayload
}
