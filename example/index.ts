import { Canvas } from "canvas"
import express from "express"

import renderBasic from "./Basic"
import renderSocial from "./Social"

const app = express()

app.get("/", async (req, res) => {
  logRequest(req)

  const searchParams = new URLSearchParams(
    req.url ? req.url.split("?")[1] : undefined,
  )
  const dpr = Number(searchParams.get("dpr") || 1)
  const width = Number(searchParams.get("width") || 500)
  const height = Number(searchParams.get("height") || width * 0.75)
  const format = searchParams.get("format") || "png" // or "jpeg";

  const canvas = await renderBasic({ width, height, dpr, searchParams })

  return generateResponse(res, canvas, format)
})

app.get("/social", async (req, res) => {
  logRequest(req)

  const searchParams = new URLSearchParams(
    req.url ? req.url.split("?")[1] : undefined,
  )
  const dpr = Number(searchParams.get("dpr") || 1)
  const format = searchParams.get("format") || "png" // or "jpeg";

  const canvas = await renderSocial({ dpr, searchParams })

  return generateResponse(res, canvas, format)
})

const port = Number(process.argv.slice(2)[0] || 6001)
app.listen(port, () => {
  console.log("Server is running at port:", port)
})

// Helpers

function generateResponse(
  res: express.Response,
  canvas: Canvas,
  format?: string,
) {
  const mimeType = format === "png" ? "image/png" : "image/jpeg"
  const buffer = canvas.toBuffer(mimeType as any)

  res.writeHead(200, {
    "Content-type": mimeType,
    "Content-length": buffer.byteLength.toString(),
    "Cache-Control": "max-age=0",
    "Content-width": canvas.width,
    "Content-height": canvas.height,
  })

  res.end(buffer)
}

function logRequest(req: express.Request, showParams = true) {
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
