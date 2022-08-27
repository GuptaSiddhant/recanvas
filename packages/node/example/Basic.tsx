import React from "react"
import {
  RecanvasFontFamily,
  Text,
  View,
  Stage,
  renderCanvas,
  Image,
} from "../src"

export default function (props: {
  width: number
  height: number
  dpr?: number
  searchParams: URLSearchParams
}) {
  return renderCanvas(<Basic {...props} />, { dpr: props.dpr })
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
      <Image style={{ padding: 40 }} src={"./example/image.jpeg"}>
        <Text>Image art</Text>
      </Image>
      <View
        style={{
          flexGrow: 0,
          backgroundColor: "red",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text>
          Hello World from the land of Canvas. It is a beautiful day today.
        </Text>
      </View>
    </Stage>
  )
}
