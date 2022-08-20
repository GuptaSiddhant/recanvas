// @ts-check
import React from "react"
import { Canvas, loadImage } from "canvas"

export default async function renderTest(): Promise<Canvas> {
  const canvas = new Canvas(800, 500)
  const ctx = canvas.getContext("2d")

  const image = await loadImage(
    "https://images.pexels.com/photos/13248572/pexels-photo-13248572.jpeg?auto=compress&cs=tinysrgb&h=750",
  )

  const ratio = image.width / canvas.width

  ctx.fillStyle = "red"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(
    image,
    0,
    200,
    image.width,
    image.height * ratio,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  ctx.drawImage(
    image,
    200,
    200,
    image.width,
    image.height * ratio,
    100,
    100,
    canvas.width / 2,
    canvas.height / 2,
  )
  return canvas
}
