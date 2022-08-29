export enum NodeName {
  View = "canvas-view",
  Image = "canvas-image",
  Text = "canvas-text",
}

export type DOMNode = {
  id: string
  nodeName: NodeName
  props: DOMNodeProps
  childNodes: DOMNode[]
  eventHandlers: Record<string, Function>
}

export interface HostContext {}

export interface Payload {
  props: DOMNodeProps
  ctx: CanvasRenderingContext2D
}

export interface DOMNodeProps {
  x: number
  y: number
  width: number
  height: number
  style?: {
    color?: string
  }
}
