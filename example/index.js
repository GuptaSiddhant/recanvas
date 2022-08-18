// @ts-check

import esbuild from "esbuild"
import { unlinkSync } from "fs"
import http from "http"

createServer()

function getFilenameFromTemplate(template = "") {
  return "Basic"
}

function createServer(defaultPort = 6001) {
  const port = Number(process.argv.slice(2)[0] || defaultPort)

  http.createServer(requestListener).listen(port, () => {
    console.log("Server is running at port:", port)
  })
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
async function requestListener(req, res) {
  logRequest(req)

  const searchParams = new URLSearchParams(
    req.url ? req.url.split("?")[1] : undefined,
  )

  const quality = Number(searchParams.get("quality") || 1)
  const width = Number(searchParams.get("width") || 500)
  const height = Number(searchParams.get("height") || width * 0.75)
  const format = searchParams.get("format") || "png" // or "jpeg";

  const template = searchParams.get("template") || undefined
  const renderCanvas = await buildTemplate(template)
  // @ts-ignore
  const canvas = renderCanvas({ width, height, quality, searchParams })

  const mimeType = format === "png" ? "image/png" : "image/jpeg"
  // @ts-ignore
  const buffer = canvas.toBuffer(mimeType)

  res.writeHead(200, {
    "Content-type": mimeType,
    "Content-length": buffer.byteLength.toString(),
    "Cache-Control": "max-age=0",
    "Content-width": canvas.width,
    "Content-height": canvas.height,
  })

  res.end(buffer)
}

async function buildTemplate(template = "") {
  const filename = getFilenameFromTemplate(template)
  const currentDirPath = "./example"
  const tempFileName = ".template.js"
  const tempFilePath = `${currentDirPath}/${tempFileName}`

  await esbuild
    .build({
      entryPoints: [`${currentDirPath}/${filename}.jsx`],
      color: true,
      logLevel: "info",
      target: "es2019",
      outfile: tempFilePath,
      platform: "browser",
      jsx: "transform",
    })
    .catch(() => process.exit(1))

  const { default: renderCanvas } = await import("./" + tempFileName)

  // Cleanup
  unlinkSync(tempFilePath)

  return renderCanvas
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
