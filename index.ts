import { type Point, mouse, screen } from "@nut-tree/nut-js"
import { getRandomValues} from "node:crypto"
import c from "picocolors"

let { coords, xDir, yDir, speed }: Controls = {
  coords: await mouse.getPosition(),
  xDir: randomOpt(["left", "right"]),
  yDir: randomOpt(["up", "down"]),
  speed: 300,
}

const [xMax, yMax, xMin, yMin] = [await screen.width(), await screen.height(), 0, 0]
mouse.config.mouseSpeed = speed

while (true) {
  if (coords.x >= xMax) xDir = "left"; else if (coords.x <= xMin) xDir = "right"
  if (coords.y >= yMax) yDir = "up"; else if (coords.y <= yMin) yDir = "down"
  if (xDir === "right") coords.x++; else coords.x--
  if (yDir === "down") coords.y++; else coords.y--
  
  await mouse.move([coords])

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
  coords: Point,
  xDir: "left" | "right",
  yDir: "up" | "down",
  speed: number,
}