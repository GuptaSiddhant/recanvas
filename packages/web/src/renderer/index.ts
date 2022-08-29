import createReconciler, { type Fiber } from "react-reconciler"
import { hostConfig } from "./host-config"
import store from "../store"

let container: Fiber
const reconciler = createReconciler(hostConfig)

export function render(
  element: React.ReactElement,
  canvas: HTMLCanvasElement,
  callback?: () => void,
) {
  container = reconciler.createContainer(
    canvas.getContext("2d")!,
    0,
    null,
    false,
    false,
    "Recanvas",
    () => {},
    null,
  )

  reconciler.updateContainer(element, container, null, callback)
}
