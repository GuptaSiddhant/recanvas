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
  return renderCanvas(<Social />, {
    ...props,
    font: {
      size: 16,
      color: "white",
      family: RecanvasFontFamily.Verdana,
    },
  })
}

function Social(): JSX.Element {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#000",
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#171717",
          padding: 20,
          flexDirection: "column",
          width: "60%",
        }}
      >
        <Text style={{ size: 32, weight: RecanvasFontWeight.Bold }}>
          Title of the blog post.
        </Text>
        <Text>Author name</Text>
      </View>
      <View
        style={{
          backgroundColor: "grey",
          padding: 20,
          alignItems: "center",
          width: "40%",
        }}
      >
        <Text>Image Area</Text>
      </View>
    </View>
  )
}
