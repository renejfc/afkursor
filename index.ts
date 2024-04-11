#!/usr/bin/env bun

import { Bunbot, type Coords } from "bunbot"
import { getRandomValues } from "node:crypto"
import c from "picocolors"

const { getMousePosition, moveMouseSmooth, getScreenSize } = new Bunbot()

let { coords, xDir, yDir, speed } = {
  coords: getMousePosition(),
  xDir: randomOpt(["left", "right"]),
  yDir: randomOpt(["up", "down"]),
  speed: 5,
} satisfies Controls

const [{ x: xMax, y: yMax }, xMin, yMin] = [getScreenSize(), 0, 0]

while (true) {
  if (coords.x >= xMax) xDir = "left"; else if (coords.x <= xMin) xDir = "right"
  if (coords.y >= yMax) yDir = "up"; else if (coords.y <= yMin) yDir = "down"
  if (xDir === "right") coords.x++; else coords.x--
  if (yDir === "down") coords.y++; else coords.y--

  moveMouseSmooth(coords.x, coords.y, speed)

  console.clear()
  console.log(
    randomOpt([c.black, c.red, c.green, c.yellow, c.blue, c.magenta, c.cyan, c.white])(
      c.italic(c.bold(`Cursor at\n\nX: ${coords.x}\nY: ${coords.y}`))
    )
  )
}

function randomOpt<T>(arr: T[]): T {
  return arr[getRandomValues(new Uint32Array(1))[0] % arr.length]
}

type Controls = {
  coords: Coords,
  xDir: "left" | "right",
  yDir: "up" | "down",
  speed: number,
}