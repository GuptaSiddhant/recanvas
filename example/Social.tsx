import React from "react"
import { RecanvasFontWeight, renderCanvas, Text, View } from "../src"

export default function (props: {
  dpr?: number
  searchParams: URLSearchParams
}) {
  return renderCanvas(<Social />, { dpr: props.dpr })
}

function Social(): JSX.Element {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#000",
        padding: 20,
        // backgroundImage: "./example/image-temp.jpeg",
        // backgroundImage:
        //   "https://images.pexels.com/photos/13248572/pexels-photo-13248572.jpeg?auto=compress&cs=tinysrgb&h=750",
      }}
    >
      <View
        style={{
          backgroundColor: "#171717",
          // padding: 20,
          flexDirection: "column",
          width: "60%",
        }}
      >
        <Text style={{ size: 32, weight: RecanvasFontWeight.Bold }}>
          Title of the blog post.
        </Text>
      </View>

      <View
        style={{ width: "40%", backgroundImage: "./example/image-temp.jpeg" }}
      ></View>
    </View>
  )
}
