import Yoga from "yoga-layout-prebuilt"

import type { LayoutStyle } from "../types"
import type { DOMElement } from "./dom-types"

export default function applyStyles(
  element: DOMElement,
  style: LayoutStyle = {},
): void {
  if (!element.yogaNode) return
  applyPositionStyles(element, style)
  applyMarginStyles(element, style)
  applyPaddingStyles(element, style)
  applyFlexStyles(element, style)
  applyDimensionStyles(element, style)
  applyDisplayStyles(element, style)
  applyBorderStyles(element, style)
}

function applyPositionStyles(
  { yogaNode }: DOMElement,
  style: LayoutStyle,
): void {
  yogaNode.setPositionType(
    style.position === "absolute"
      ? Yoga.POSITION_TYPE_ABSOLUTE
      : Yoga.POSITION_TYPE_RELATIVE,
  )
}

function applyMarginStyles(element: DOMElement, style: LayoutStyle): void {
  const { dpr, yogaNode: node } = element
  const { margin, marginHorizontal, marginVertical } = style
  const marginLeft = margin || marginHorizontal || style.marginLeft
  const marginRight = margin || marginHorizontal || style.marginRight
  const marginTop = margin || marginVertical || style.marginTop
  const marginBottom = margin || marginVertical || style.marginBottom

  if (marginLeft) node.setMargin(Yoga.EDGE_START, marginLeft * dpr)
  if (marginRight) node.setMargin(Yoga.EDGE_END, marginRight * dpr)
  if (marginTop) node.setMargin(Yoga.EDGE_TOP, marginTop * dpr)
  if (marginBottom) node.setMargin(Yoga.EDGE_BOTTOM, marginBottom * dpr)
}

function applyPaddingStyles(element: DOMElement, style: LayoutStyle): void {
  const { dpr, yogaNode: node } = element
  const { padding, paddingHorizontal, paddingVertical } = style
  const paddingLeft = padding || paddingHorizontal || style.paddingLeft
  const paddingRight = padding || paddingHorizontal || style.paddingRight
  const paddingTop = padding || paddingVertical || style.paddingTop
  const paddingBottom = padding || paddingVertical || style.paddingBottom

  if (paddingLeft) node.setPadding(Yoga.EDGE_LEFT, paddingLeft * dpr)
  if (paddingRight) node.setPadding(Yoga.EDGE_RIGHT, paddingRight * dpr)
  if (paddingTop) node.setPadding(Yoga.EDGE_TOP, paddingTop * dpr)
  if (paddingBottom) node.setPadding(Yoga.EDGE_BOTTOM, paddingBottom * dpr)
}

function applyFlexStyles(element: DOMElement, style: LayoutStyle): void {
  const { yogaNode: node } = element
  const { flexGrow, flexDirection, flexShrink, flexBasis } = style

  // Always grow equally
  node.setFlexGrow(flexGrow ?? 1)

  if (flexShrink)
    node.setFlexShrink(typeof flexShrink === "number" ? flexShrink : 1)

  const yogaFlexDirection =
    flexDirection === "column"
      ? Yoga.FLEX_DIRECTION_COLUMN
      : flexDirection === "column-reverse"
      ? Yoga.FLEX_DIRECTION_COLUMN_REVERSE
      : flexDirection === "row-reverse"
      ? Yoga.FLEX_DIRECTION_ROW_REVERSE
      : Yoga.FLEX_DIRECTION_ROW
  node.setFlexDirection(yogaFlexDirection)

  if (flexBasis) {
    if (typeof flexBasis === "number") node.setFlexBasis(flexBasis)
    else if (typeof flexBasis === "string")
      node.setFlexBasisPercent(Number.parseInt(flexBasis, 10))
    // This should be replaced with node.setFlexBasisAuto() when new Yoga release is out
    else node.setFlexBasis(NaN)
  }

  const { alignItems, alignSelf, justifyContent } = style

  const yogaAlignItems =
    alignItems === "flex-start"
      ? Yoga.ALIGN_FLEX_START
      : alignItems === "flex-end"
      ? Yoga.ALIGN_FLEX_END
      : alignItems === "center"
      ? Yoga.ALIGN_CENTER
      : Yoga.ALIGN_STRETCH
  node.setAlignItems(yogaAlignItems)

  const yogaAlignSelf =
    alignSelf === "flex-start"
      ? Yoga.ALIGN_FLEX_START
      : alignSelf === "flex-end"
      ? Yoga.ALIGN_FLEX_END
      : alignSelf === "center"
      ? Yoga.ALIGN_CENTER
      : Yoga.ALIGN_AUTO
  node.setAlignSelf(yogaAlignSelf)

  const yogaJustifyContent =
    justifyContent === "space-between"
      ? Yoga.JUSTIFY_SPACE_BETWEEN
      : justifyContent === "space-around"
      ? Yoga.JUSTIFY_SPACE_AROUND
      : justifyContent === "space-evenly"
      ? Yoga.JUSTIFY_SPACE_EVENLY
      : justifyContent === "center"
      ? Yoga.JUSTIFY_CENTER
      : justifyContent === "flex-end"
      ? Yoga.JUSTIFY_FLEX_END
      : Yoga.JUSTIFY_FLEX_START
  node.setAlignSelf(yogaJustifyContent)
}

function applyDimensionStyles(element: DOMElement, style: LayoutStyle): void {
  const { dpr, yogaNode: node } = element
  const { width, height, minWidth, minHeight, maxHeight, maxWidth } = style

  if (typeof width === "number") node.setWidth(width * dpr)
  else if (typeof width === "string")
    node.setWidthPercent(Number.parseInt(width, 10))
  else node.setWidthAuto()

  if (typeof height === "number") node.setHeight(height * dpr)
  else if (typeof height === "string")
    node.setHeightPercent(Number.parseInt(height, 10))
  else node.setHeightAuto()

  if (minWidth) {
    if (typeof minWidth === "string")
      node.setMinWidthPercent(Number.parseInt(minWidth, 10))
    else node.setMinWidth(minWidth * dpr)
  }

  if (minHeight) {
    if (typeof minHeight === "string")
      node.setMinHeightPercent(Number.parseInt(minHeight, 10))
    else node.setMinHeight(minHeight * dpr)
  }

  if (maxWidth) {
    if (typeof maxWidth === "string")
      node.setMaxWidthPercent(Number.parseInt(maxWidth, 10))
    else node.setMaxWidth(maxWidth * dpr)
  }

  if (maxHeight) {
    if (typeof maxHeight === "string")
      node.setMaxHeightPercent(Number.parseInt(maxHeight, 10))
    else node.setMaxHeight(maxHeight * dpr)
  }
}

function applyDisplayStyles(
  element: DOMElement,
  { display }: LayoutStyle,
): void {
  const { yogaNode: node } = element
  if (display === "none") node.setDisplay(Yoga.DISPLAY_NONE)
  else node.setDisplay(Yoga.DISPLAY_FLEX)
}

function applyBorderStyles(element: DOMElement, style: LayoutStyle): void {
  const { dpr, yogaNode: node } = element
  const { borderWidth = 0 } = style

  node.setBorder(Yoga.EDGE_TOP, borderWidth * dpr)
  node.setBorder(Yoga.EDGE_BOTTOM, borderWidth * dpr)
  node.setBorder(Yoga.EDGE_LEFT, borderWidth * dpr)
  node.setBorder(Yoga.EDGE_RIGHT, borderWidth * dpr)
}
