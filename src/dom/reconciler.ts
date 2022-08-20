import createReconciler, { type Fiber, type HostConfig } from "react-reconciler"

import Yoga from "yoga-layout-prebuilt"
import type { RecanvasStyle } from "../types"
import store from "../store"
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
import type {
  DOMElement,
  DOMNode,
  DOMNodeAttribute,
  ElementProps,
  TextNode,
} from "./dom-types"

interface HostContext {
  isInsideText: boolean
  isInsideStage: boolean
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
    return { isInsideText: false, isInsideStage: false }
  },

  getChildHostContext(parentHostContext, type) {
    const previousIsInsideText = parentHostContext.isInsideText
    const previousIsInsideStage = parentHostContext.isInsideStage
    const isInsideText = type === ElementName.Text
    const isInsideStage = type === ElementName.Stage

    return {
      isInsideText:
        previousIsInsideText === isInsideText
          ? previousIsInsideText
          : isInsideText,
      isInsideStage: previousIsInsideStage || isInsideStage,
    }
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

    if (
      originalType !== ElementName.Stage &&
      originalType !== ElementName.Root &&
      !hostContext.isInsideStage
    ) {
      throw new Error(
        `All components should be nested inside <Stage> component`,
      )
    }

    if (originalType === ElementName.Stage) {
      const font = (props as any).font
      if (font) store.font = font
    }

    const type =
      originalType === ElementName.Text && hostContext.isInsideText
        ? ElementName.VirtualText
        : originalType

    return createNode(type, props)
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
        const newStyle = newProps.style as RecanvasStyle
        const oldStyle = oldProps.style as RecanvasStyle
        const styleKeys = Object.keys(newStyle) as Array<keyof RecanvasStyle>

        for (const styleKey of styleKeys) {
          if (newStyle[styleKey] !== oldStyle[styleKey]) {
            if (typeof updatePayload.style !== "object") {
              // Linter didn't like `= {} as Style`
              const style: RecanvasStyle = {}
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
