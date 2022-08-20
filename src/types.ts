export interface RecanvasStyle extends LayoutStyle, ThemeStyle, RecanvasFont {}

export interface ThemeStyle {
  /** Change border color. */
  borderColor?: string
  /** Change background color. */
  backgroundColor?: string
  /** Change background color. */
  backgroundImage?: string

  /** Add a border with a specified style. If `borderStyle` is `undefined` (which it is by default), no border will be added. */
  borderStyle?: "round" | "bevel" | "miter"
}

export interface RecanvasFont {
  size?: number

  family?: RecanvasFontFamily

  weight?: RecanvasFontWeight

  style?: RecanvasFontStyle

  variant?: RecanvasFontVariant

  lineHeight?: number
  /** truncate text or let it wrap */
  truncate?: boolean

  /** Change text color.*/
  color?: string
}

export enum RecanvasFontFamily {
  Monospace = "monospace",
  Serif = "serif",
  SansSerif = "sans-serif",
  // Named
  Arial = "Arial",
  Verdana = "Verdana",
  Times = "Times New Roman",
  Georgia = "Georgia",
  BrushScript = "Brush Script MT",
  Courier = "Courier New",
}

export enum RecanvasFontWeight {
  Normal = "normal",
  Bold = "bold",
  Bolder = "bolder",
  Lighter = "lighter",
}

export enum RecanvasFontStyle {
  Normal = "normal",
  Italic = "italic",
  Oblique = "oblique",
}

export enum RecanvasFontVariant {
  Normal = "normal",
  SmallCaps = "small-caps",
}

export interface LayoutStyle {
  /** Set this property to `none` to hide the element. */
  display?: "flex" | "none"
  /** Position in respect to the parent. */
  position?: "absolute" | "relative"

  /** all margins. */
  margin?: number
  /** Left/right margins. */
  marginHorizontal?: number
  /** Top/bottom margins. */
  marginVertical?: number
  /** Top margin. */
  marginTop?: number
  /** Bottom margin. */
  marginBottom?: number
  /** Left margin. */
  marginLeft?: number
  /** Right margin. */
  marginRight?: number

  /** all paddings. */
  padding?: number
  /** Left/right paddings. */
  paddingHorizontal?: number
  /** Top/bottom paddings. */
  paddingVertical?: number
  /** Top padding. */
  paddingTop?: number
  /** Bottom padding. */
  paddingBottom?: number
  /** Left padding. */
  paddingLeft?: number
  /** Right padding. */
  paddingRight?: number

  /** This property defines the ability for a flex item to grow if necessary. See [flex-grow](https://css-tricks.com/almanac/properties/f/flex-grow/). */
  flexGrow?: number
  /** It specifies the “flex shrink factor”, which determines how much the flex item will shrink relative to the rest of the flex items in the flex container when there isn’t enough space on the row. See [flex-shrink](https://css-tricks.com/almanac/properties/f/flex-shrink/). */
  flexShrink?: number
  /** It establishes the main-axis, thus defining the direction flex items are placed in the flex container. See [flex-direction](https://css-tricks.com/almanac/properties/f/flex-direction/). */
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
  /** It specifies the initial size of the flex item, before any available space is distributed according to the flex factors. See [flex-basis](https://css-tricks.com/almanac/properties/f/flex-basis/). */
  flexBasis?: number | string
  /** The align-items property defines the default behavior for how items are laid out along the cross axis (perpendicular to the main axis). See [align-items](https://css-tricks.com/almanac/properties/a/align-items/). */
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch"
  /** It makes possible to override the align-items value for specific flex items. See [align-self](https://css-tricks.com/almanac/properties/a/align-self/). */
  alignSelf?: "flex-start" | "center" | "flex-end" | "auto"
  /** It defines the alignment along the main axis. See [justify-content](https://css-tricks.com/almanac/properties/j/justify-content/). */
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "center"

  /** Width of the element in spaces. You can also set it in percent, which will calculate the width based on the width of parent element. */
  width?: number | string
  /** Height of the element in lines (rows). You can also set it in percent, which will calculate the height based on the height of parent element. */
  height?: number | string
  /** Sets a minimum width of the element. */
  minWidth?: number | string
  /** Sets a minimum height of the element. */
  minHeight?: number | string
  /** Sets a maximum width of the element. */
  maxWidth?: number | string
  /** Sets a maximum height of the element. */
  maxHeight?: number | string

  /** Border spacing */
  borderWidth?: number
}
