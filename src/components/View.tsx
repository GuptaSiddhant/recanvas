import { createElement } from "react"

import { ElementName } from "../dom/constants"
import type { ElementProps } from "../dom/types"

export interface ViewProps extends ElementProps {}

export default function View({ children, ...props }: ViewProps) {
  return createElement(ElementName.View, props, children)
}
