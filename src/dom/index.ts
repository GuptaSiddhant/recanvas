/**
 * The code for creating DOM nodes with Yoga-layout is
 * copied and adapted from "react-ink" library created by vdemedes.
 * @license MIT © vdemedes <vdemedes@gmail.com>
 * @see https://github.com/vadimdemedes/ink/blob/v3.2.0/license
 */

import { Component, createElement, Fragment } from "react"
import { ElementName } from "./constants"
import { createNode } from "./helpers"
import reconciler from "./reconciler"

export default function renderDom(element: React.ReactNode) {
  const containerInfo = createNode(ElementName.Root)

  const container = reconciler.createContainer(
    containerInfo,
    0,
    null,
    false,
    false,
    "Recanvas",
    () => {},
    null,
  )

  reconciler.updateContainer(
    createElement(ErrorBoundary, null, element),
    container,
  )

  return containerInfo
}

export * from "./dom-types"

class ErrorBoundary extends Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.log("---- ---- ----")
    console.log(error.message)
    console.log("---- ---- ----")
  }

  render() {
    if (this.state.hasError) {
      return Fragment
    }

    return this.props.children
  }
}
