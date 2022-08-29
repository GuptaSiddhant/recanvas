// import renderNodeToCanvas from "./canvas"
// import renderDom from "./dom"
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useRef,
} from "react"
import { render } from "./renderer"

// Components
export * from "./components"
// hooks
export * from "./hooks"

// Enums and Types
export {
  type LayoutStyle,
  type RecanvasFont,
  type ThemeStyle,
  RecanvasFontFamily,
  RecanvasFontStyle,
  RecanvasFontVariant,
  RecanvasFontWeight,
} from "./types"

export interface CanvasOptions {
  width: number
  height: number
}

export interface CanvasContext extends CanvasOptions {
  canvasElement: HTMLCanvasElement
}

const canvasContext = createContext<CanvasContext | undefined>(undefined)

export function useCanvas(element: React.ReactElement, options: CanvasOptions) {
  const ref = useRef<HTMLCanvasElement>(null)
  const renderRef = useRef(false)
  const { height, width } = options

  useEffect(() => {
    if (ref.current && !renderRef.current) {
      render(
        createElement(
          canvasContext.Provider,
          { value: { ...options, canvasElement: ref.current } },
          element,
        ),
        ref.current,
      )
      renderRef.current = true
    }
  }, [ref])

  return (props: React.HTMLAttributes<HTMLCanvasElement>) =>
    createElement("canvas", { ...props, ref, height, width, tabIndex: 0 })
}

export function useCanvasOptions() {
  const context = useContext(canvasContext)
  if (!context) throw new Error("The hook can only be used inside a Canvas.")

  return context
}
