// @ts-check
import React from "react"
import Recanvas, { RecanvasFontFamily, Text, View, Stage } from "../src"

export default function (props: {
  width: number
  height: number
  dpr?: number
  searchParams: URLSearchParams
}) {
  return Recanvas.render(<Basic {...props} />, { dpr: props.dpr })
}

function Basic({
  width,
  height,
}: {
  width: number
  height: number
}): JSX.Element {
  return (
    <Stage
      style={{
        height,
        width,
        backgroundColor: "green",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 20,
      }}
      font={{
        size: 20,
        color: "yellow",
        family: RecanvasFontFamily.Verdana,
      }}
    >
      <View
        style={{ backgroundColor: "blue", padding: 20, alignItems: "center" }}
      >
        <Text>Hello World</Text>
      </View>
      <View
        style={{ backgroundColor: "red", padding: 20, alignItems: "center" }}
      >
        <Text>
          Hello World from the land of Canvas. It is a beautiful day today.
        </Text>
      </View>
    </Stage>
  )
}
