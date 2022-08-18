import type Yoga from "yoga-layout-prebuilt"

import type { RecanvasStyle, RecanvasFont } from "../types"
import type { ElementName, TextName } from "./constants"

export type OutputTransformer = (s: string) => string

export type NodeNames = ElementName | TextName

export type DOMElement = {
  nodeName: ElementName
  childNodes: DOMNode[]
  attributes: {
    [key: string]: DOMNodeAttribute
  }
  quality: number
} & Node

interface Node {
  parentNode: DOMElement | null
  yogaNode: Yoga.YogaNode
  style: RecanvasStyle
}

export type TextNode = Omit<Node, "yogaNode"> & {
  nodeName: TextName
  nodeValue: string
  yogaNode: undefined
  quality: number
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
