import type Yoga from "yoga-layout-prebuilt"

import type { ElementName, TextName } from "./constants"
import type { Styles } from "./style"
import type { RecanvasFont } from "./text"

export type OutputTransformer = (s: string) => string

export type NodeNames = ElementName | TextName

export type DOMElement = {
  nodeName: ElementName
  childNodes: DOMNode[]
  font?: RecanvasFont
  attributes: {
    [key: string]: DOMNodeAttribute
  }
} & Node

interface Node {
  parentNode: DOMElement | null
  yogaNode: Yoga.YogaNode
  style: Styles
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
  style?: Styles
  font?: RecanvasFont
}
