import { useCanvasOptions, View, useAnimationFrame } from "@recanvas/web"
import { useCallback, useRef, useState } from "react"

const colors = ["red", "green", "blue", "yellow", "orange", "purple"]
// const colors = ["red"] // "blue", "yellow", "orange", "purple"]

export default function BoxGame() {
  const { height: canvasHeight, width: canvasWidth } = useCanvasOptions()
  const [state, setState] = useState(
    colors.map((color) => ({
      color,
      x: Math.floor(Math.random() * (canvasWidth - 100)),
      y: Math.floor(Math.random() * (canvasHeight - 100)),
      paused: false,
    })),
  )
  const isWon = state.every((box) => box.paused)
  const handleClick = useCallback(() => {
    setState(state.map((box) => ({ ...box, paused: false })))
  }, [])

  return isWon ? (
    <View
      x={100}
      y={100}
      width={canvasWidth - 200}
      height={canvasHeight - 200}
      style={{ color: "black" }}
      onClick={handleClick}
      onKeyDown={handleClick}
    />
  ) : (
    <>
      {state.map(({ color, x, y, paused }, i) => {
        return (
          <FloatingBox
            x={x}
            y={y}
            color={color}
            key={color + i}
            speed={10}
            paused={paused}
            togglePaused={() =>
              setState((s) => {
                const ns = [...s]
                ns[i].paused = !ns[i].paused
                return ns
              })
            }
          />
        )
      })}
    </>
  )
}

interface BoxProps {
  x?: number
  y?: number
  width?: number
  height?: number
  color?: string
  speed?: number
  paused: boolean
  togglePaused: () => void
}

function FloatingBox(props: BoxProps) {
  const {
    width = 100,
    height = 100,
    color,
    speed = 2,
    paused,
    togglePaused,
  } = props
  const { height: canvasHeight, width: canvasWidth } = useCanvasOptions()

  const x = usePos(0, canvasWidth - width, { speed, init: props.x, paused })
  const y = usePos(0, canvasHeight - height, { speed, init: props.y, paused })

  const handleClick = useCallback(togglePaused, [])

  return (
    <View
      x={x}
      y={y}
      width={width}
      height={height}
      style={{ color }}
      onClick={handleClick}
    />
  )
}

function usePos(
  min: number,
  max: number,
  options: {
    speed?: number
    init?: number
    paused?: boolean
  },
) {
  const { speed = 1, init = min, paused = false } = options
  const [pos, setPos] = useState(init)
  const direction = useRef(1)

  const callback = useCallback(() => {
    setPos((p) => {
      if (p > max) direction.current = -1
      if (p < min) direction.current = 1

      return p + speed * direction.current
    })
  }, [max, min, speed])

  useAnimationFrame(callback, 0, paused)

  return pos
}
