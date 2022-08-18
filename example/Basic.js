// @ts-check

import { createElement } from "react"

import { Text, View } from "../dist/index.js"

export default function Test({ width }) {
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
    createElement(
      View,
      {
        style: {
          backgroundColor: "blue",
          padding: 20,
        },
      },
      createElement(
        Text,
        {
          style: {
            color: "white",
          },
          font: { size: 32 },
        },
        "Hello World",
      ),
    ),
    createElement(
      View,
      {
        style: {
          backgroundColor: "red",
          padding: 20,
        },
      },
      createElement(
        Text,
        {
          style: {
            color: "white",
          },
        },
        "Hello World from the land of Canvas. It is a beautiful day today.",
      ),
    ),
  )
}
