/**
 * The code for creating DOM nodes with Yoga-layout is
 * copied and adapted from "react-ink" library created by vdemedes.
 * @license MIT © vdemedes <vdemedes@gmail.com>
 * @see https://github.com/vadimdemedes/ink/blob/v3.2.0/license
 */

import { ElementName } from "./constants"
import { createNode } from "./helpers"
import reconciler from "./reconciler"
import type { Styles } from "./style"
import type { RecanvasFont } from "./text"

export default function renderDom(
  element: React.ReactNode,
  style: Styles & { width: number; height: number },
  font?: RecanvasFont,
  callback?: () => void,
) {
  const root = createNode(ElementName.Root, { style, font })

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

  reconciler.updateContainer(element, container, null, callback)

  return root
}

export * from "./types"
