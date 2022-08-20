import {
  type RecanvasFont,
  RecanvasFontFamily,
  RecanvasFontStyle,
  RecanvasFontVariant,
  RecanvasFontWeight,
} from "./types"

const DEFAULT_FONT: Required<RecanvasFont> = {
  size: 16,
  family: RecanvasFontFamily.SansSerif,
  weight: RecanvasFontWeight.Normal,
  style: RecanvasFontStyle.Normal,
  variant: RecanvasFontVariant.Normal,
  lineHeight: 1.25,
  truncate: false,
  color: "#000000",
}

class Store {
  #dpr = 1
  #font: Required<RecanvasFont> = DEFAULT_FONT

  get dpr() {
    return this.#dpr
  }
  set dpr(value: number) {
    this.#dpr = Math.max(0.1, value)
  }

  get font(): Required<RecanvasFont> {
    return this.#font
  }
  set font(value: RecanvasFont) {
    this.#font = { ...this.#font, ...value }
  }
}

const store = new Store()

export default store
