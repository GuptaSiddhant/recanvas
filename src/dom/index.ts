/**
 * The code for creating DOM nodes with Yoga-layout is
 * copied and adapted from "react-ink" library created by vdemedes.
 * @license MIT © vdemedes <vdemedes@gmail.com>
 * @see https://github.com/vadimdemedes/ink/blob/v3.2.0/license
 */

import type { RecanvasStyle } from "../types"
import { ElementName } from "./constants"
import { createNode } from "./helpers"
import reconciler from "./reconciler"

export default function renderDom(
  element: React.ReactNode,
  style: RecanvasStyle,
) {
  const root = createNode(ElementName.Root, { style })

  const container = reconciler.createContainer(
    root,
    0,
    null,
    false,
    false,
    "",
    () => {},
    null,
  )

  reconciler.updateContainer(element, container, null)

  return root
}

export * from "./dom-types"
