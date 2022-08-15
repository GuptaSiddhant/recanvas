import http from "http";
import { createElement } from "react";

import { renderCanvas, Text, View } from "../dist/index.js";

// @todo : remove
getCanvas();

const server = http.createServer(function (req, res) {
  const { params } = renderRequestLog(req, false);
  const canvas = getCanvas(params);

  res.writeHead(200, {
    "Content-type": "image/png",
    width: canvas.width,
    height: canvas.height,
  });
  res.end(canvas.toBuffer());
});

const port = process.env.PORT || 6001;
server.listen(port, () => console.log("Server is running at port:", port));

/** @param {http.IncomingMessage} req */
function renderRequestLog(req, showParams = true) {
  const { url: path, headers, method } = req;
  const { searchParams, pathname } = new URL(path, `http://${headers.host}`);
  const params = Object.fromEntries(searchParams);
  const paramsList = Object.entries(params);
  const maxKeyLength = paramsList.reduce(
    (max, [key]) => Math.max(max, key.length),
    0
  );

  console.log(`\n[${new Date().toLocaleString()}]`, method, pathname);
  if (showParams) {
    paramsList.forEach(([key, value], index) =>
      console.log(
        index === 0 ? "[Params]" : "\t",
        `${key.padEnd(maxKeyLength)}:`,
        `"${value}"`
      )
    );
  }

  return { params };
}

/**
 * Edit canvas here
 * @param {{[k: string]: string}} params
 * */
function getCanvas(params) {
  const width = 800;
  const height = width / (16 / 9);

  const element = createElement(
    View,
    {
      style: {
        flexDirection: "column",
        // backgroundColor: "green",
        justifyContent: "space-around",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
      },
    },
    createElement(
      View,
      {
        style: {
          backgroundColor: "blue",
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          alignItems: "center",
          justifyContent: "center",
        },
      },
      createElement(
        Text,
        {
          style: {
            color: "white",
            backgroundColor: "grey",
            flexGrow: 0,
          },
        },
        "Hello World"
      )
    ),
    createElement(
      View,
      {
        style: {
          backgroundColor: "red",
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          flexDirection: "column",
        },
      },
      createElement(
        Text,
        {
          style: { color: "black", backgroundColor: "grey" },
          font: { size: 32 },
        },

        "Hello World from the land of Canvas. It is a beautiful day today."
      )
    )
  );

  return renderCanvas(element, { width, height });
}
