// @ts-check
import React from "react"
import {
  RecanvasFontFamily,
  RecanvasFontWeight,
  renderCanvas,
  Text,
  View,
} from "../dist/index.js"

export default function (props: {
  width: number
  height: number
  quality?: number
  searchParams: URLSearchParams
}) {
  return renderCanvas(<Basic />, {
    ...props,
    font: {
      size: 20,
      color: "yellow",
      family: RecanvasFontFamily.Verdana,
    },
  })
}

function Basic(): JSX.Element {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "green",
        justifyContent: "space-around",
        padding: 20,
      }}
    >
      <View
        style={{ backgroundColor: "blue", padding: 20, alignItems: "center" }}
      >
        <Text
          style={{ size: 32, color: "white", weight: RecanvasFontWeight.Bold }}
        >
          Hello World
        </Text>
      </View>
      <View
        style={{ backgroundColor: "red", padding: 20, alignItems: "center" }}
      >
        <Text>
          Hello World from the land of Canvas. It is a beautiful day today.
        </Text>
      </View>
    </View>
  )
}
