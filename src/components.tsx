import { createElement } from "react"

import type { LayoutStyle, ThemeStyle, RecanvasFont } from "./types"
import { ElementName } from "./dom/constants"

// Stage

export interface StageProps {
  children: React.ReactNode
  style: LayoutStyle &
    ThemeStyle & {
      width: number
      height: number
    }
  font?: RecanvasFont
}

export function Stage({ children, ...props }: StageProps) {
  return createElement(ElementName.Stage, props, children)
}

// View

export interface ViewProps {
  children?: React.ReactNode
  style?: LayoutStyle & ThemeStyle
}

export function View({ children, ...props }: ViewProps) {
  return createElement(ElementName.View, props, children)
}

// Text

export interface TextProps {
  children?: React.ReactNode
  style?: RecanvasFont
}

export function Text({ children, ...props }: TextProps) {
  return createElement(ElementName.Text, props, children)
}
