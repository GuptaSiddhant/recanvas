// @ts-check

import http from "http"
import { createElement } from "react"

import { renderCanvas } from "../dist/index.js"
import Basic from "./Basic.js"

const args = process.argv.slice(2)
const port = Number(args[0] || 6001)

const server = http.createServer(async function (req, res) {
  logRequest(req)

  const searchParams = new URLSearchParams(
    req.url ? req.url.split("?")[1] : undefined,
  )
  const template = searchParams.get("template") || undefined
  const quality = Number(searchParams.get("quality") || 1)
  const width = Number(searchParams.get("width") || 500)
  const height = Number(searchParams.get("height") || width * 0.75)

  const mimeType = "image/png" // or "image/jpeg";
  const element = createElement(selectTemplate(template))
  const canvas = renderCanvas(element, width, height, quality)
  const buffer = canvas.toBuffer(mimeType)

  res.writeHead(200, {
    "Content-type": mimeType,
    "Content-length": buffer.byteLength.toString(),
    "Cache-Control": "max-age=0",
    "Content-width": canvas.width,
    "Content-height": canvas.height,
  })

  res.end(buffer)
})

server.listen(port, () => console.log("Server is running at port:", port))

/** @param {string=} template */
function selectTemplate(template = "") {
  switch (template.toLowerCase()) {
    case "basic":
    default:
      return Basic
  }
}

/** @param {http.IncomingMessage} req */
function logRequest(req, showParams = true) {
  const { url: path = "", headers, method } = req
  const { searchParams, pathname } = new URL(path, `http://${headers.host}`)
  const params = Object.fromEntries(searchParams)
  const paramsList = Object.entries(params)
  let maxKeyLength = 0
  paramsList.forEach(
    ([key]) => (maxKeyLength = Math.max(maxKeyLength, key.length)),
  )

  console.log(`\n[${new Date().toLocaleString()}]`, method, pathname)
  if (showParams) {
    paramsList.forEach(([key, value], index) =>
      console.log(
        index === 0 ? "[Params]" : "\t",
        `${key.padEnd(maxKeyLength)}:`,
        JSON.stringify(value),
      ),
    )
  }
}
