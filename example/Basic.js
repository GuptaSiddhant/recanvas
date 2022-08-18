// @ts-check

import { createElement } from "react"

import { Text, View } from "../dist/index.js"

export default function Basic() {
  return createElement(
    View,
    {
      style: {
        flexDirection: "column",
        backgroundColor: "green",
        justifyContent: "space-around",
        padding: 20,
      },
    },
    createElement(View1),
    createElement(View2),
  )
}

function View1() {
  return createElement(
    View,
    {
      style: {
        backgroundColor: "blue",
        padding: 20,
        alignItems: "center",
      },
    },
    createElement(
      Text,
      {
        style: { size: 32, color: "white" },
      },
      "Hello World",
    ),
  )
}

function View2() {
  return createElement(
    View,
    {
      style: {
        backgroundColor: "red",
        padding: 20,
        alignItems: "center",
      },
    },
    createElement(
      Text,
      {},
      "Hello World from the land of Canvas. It is a beautiful day today.",
    ),
  )
}
