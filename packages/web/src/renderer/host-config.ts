import type { HostConfig } from "react-reconciler"
import { DefaultEventPriority } from "react-reconciler/constants"

import { NodeName } from "./types"
import type { DOMNode, DOMNodeProps, HostContext, Payload } from "./types"

import { clearCanvas } from "../canvas/helpers"
import { insertChildToCanvas } from "../canvas"

const NOOP = (..._args: any[]): any => {}
const NIF = (...args: any[]): never => {
  console.log(args)
  throw new Error("Function not implemented.")
}

let canvas: HTMLCanvasElement
const activeEvents: any = {}
let nextId = 0

type Container = CanvasRenderingContext2D

const hostConfig: HostConfig<
  NodeName,
  DOMNodeProps,
  Container,
  DOMNode,
  never,
  never,
  never,
  DOMNode,
  HostContext,
  Payload,
  Container,
  unknown,
  unknown
> = {
  isPrimaryRenderer: false, // React-DOM is primary renderer on page.

  getPublicInstance: (instance) => instance,
  getInstanceFromScope: (...args) => NIF(...args),
  getInstanceFromNode: (...args) => NIF(...args),
  getCurrentEventPriority: () => DefaultEventPriority,

  // Context
  getRootHostContext: (ctx) => {
    canvas ||= ctx.canvas
    clearCanvas(ctx)
    return null
  },
  getChildHostContext: () => ({}),

  // Create
  shouldSetTextContent: () => false,
  createInstance,
  createTextInstance: (...args) => NIF(...args),

  // Insert
  appendInitialChild: NIF,

  // Commit
  prepareForCommit: NOOP,
  resetAfterCommit: NOOP,
  prepareUpdate,
  finalizeInitialChildren: () => false,

  preparePortalMount: NOOP,
  prepareScopeUpdate: (...args) => NIF(...args),
  beforeActiveInstanceBlur: (...args) => NIF(...args),
  afterActiveInstanceBlur: (...args) => NIF(...args),
  detachDeletedInstance,

  noTimeout: -1,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,

  // Mutation
  supportsMutation: false,

  // Hydration
  supportsHydration: false,

  // Persistance
  supportsPersistence: true,

  createContainerChildSet: (container) => container,
  appendChildToContainerChildSet: insertChildToCanvas,
  finalizeContainerChildren: NOOP,
  replaceContainerChildren: NOOP,

  cloneInstance,
  cloneHiddenInstance: (...args) => NIF(...args),
  cloneHiddenTextInstance: (...args) => NIF(...args),
}

export { hostConfig }

//

function createInstance(type: NodeName, props: DOMNodeProps): DOMNode {
  const eventHandlers: Record<string, Function> = {}

  const id = (nextId++).toString()
  activeEvents[id] = {}

  Object.entries(props).forEach(([key, value]) => {
    if (key.slice(0, 2) === "on") {
      eventHandlers[key.slice(2).toLowerCase()] = value
    }
  })

  const instance: DOMNode = {
    id,
    nodeName: type,
    props,
    childNodes: [],
    eventHandlers,
  }

  handleEvents(instance, props)

  return instance
}

function prepareUpdate(
  instance: DOMNode,
  _type: NodeName,
  oldProps: DOMNodeProps,
  newProps: DOMNodeProps,
  rootContainer: CanvasRenderingContext2D,
): Payload | null {
  clearCanvas(rootContainer)

  Object.entries(newProps || oldProps).forEach(([key, value]) => {
    if (key.slice(0, 2) === "on") {
      instance.eventHandlers[key.slice(2).toLowerCase()] = value
    }
  })

  return {
    ctx: rootContainer,
    props: newProps,
  }
}

function cloneInstance(instance: DOMNode, updatePayload: Payload): DOMNode {
  handleEvents(instance, updatePayload.props)

  return {
    ...instance,
    ...updatePayload,
  }
}

function detachDeletedInstance(node: DOMNode): void {
  const { eventHandlers, id } = node

  Object.entries(eventHandlers).forEach(([type]) => {
    if (activeEvents?.[id]?.[type])
      canvas.removeEventListener(type, activeEvents[id][type])
  })

  delete activeEvents[id]
}

//

function handleEvents(instance: DOMNode, props: DOMNodeProps) {
  const { eventHandlers, id } = instance

  Object.entries(eventHandlers).forEach(([type, fn]) => {
    const listener = (e: any) => {
      if (isBounded(e, props) || type.includes("key")) fn(e)
    }

    if (activeEvents?.[id]?.[type])
      canvas.removeEventListener(type, activeEvents[id][type])

    activeEvents[id][type] = listener
    canvas.addEventListener(type, listener)
  })
}

function isBounded(e: MouseEvent, props: DOMNodeProps) {
  const posX = e.offsetX
  const posY = e.offsetY
  const { x = 0, y = 0, width = 0, height = 0 } = props

  return posX > x && posX <= x + width && posY > y && posY <= y + height
}
