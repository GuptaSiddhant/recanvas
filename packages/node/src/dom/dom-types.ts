import type Yoga from "yoga-layout-prebuilt"

import type { RecanvasStyle } from "../types"
import type { ElementName, TextName } from "../constants"

export type OutputTransformer = (s: string) => string

export type NodeNames = ElementName | TextName

export type DOMElement = {
  nodeName: ElementName
  childNodes: DOMNode[]
  attributes: {
    [key: string]: DOMNodeAttribute
  }
} & Node

interface Node {
  parentNode: DOMElement | null
  yogaNode: Yoga.YogaNode
  style: RecanvasStyle
  dpr: number
}

export type TextNode = Omit<Node, "yogaNode"> & {
  nodeName: TextName
  nodeValue: string
  yogaNode: undefined
}

export type DOMNode<T = { nodeName: NodeNames }> = T extends {
  nodeName: infer U
}
  ? U extends TextName
    ? TextNode
    : DOMElement
  : never

export type DOMNodeAttribute = boolean | string | number

export interface ElementProps {
  children?: React.ReactNode
  style?: RecanvasStyle
}
