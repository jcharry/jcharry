const fs = require('fs')

const boxSize = 30
const gutterSize = 0
const gridSize = [20, 4]

const width = gridSize[0] * boxSize + (gridSize[0] - 1) * gutterSize
const height = gridSize[1] * boxSize + (gridSize[1] - 1) * gutterSize

const frameSize = [width, height]

const mainTag = `<svg viewBox="0 0 ${frameSize[0]} ${frameSize[1]}">`
const closingTab = '</svg>'

const makeRandomByteInt = () => Math.floor(Math.random() * 256)
const averageColor = (a, b) => Math.floor((a + b) / 2)

const makeColor = mix => {
  const color = [makeRandomByteInt(), makeRandomByteInt(), makeRandomByteInt()]

  return color.map((c, i) => averageColor(c, mix[i]))
}

const rects = []
const defs = []
for (let i = 0; i < gridSize[0]; i++) {
  for (let j = 0; j < gridSize[1]; j++) {
    const x = i * boxSize + i * (gutterSize - 1)
    const y = j * boxSize + j * (gutterSize - 1)
    const startColor = `rgb(${makeColor([255, 255, 255]).join(',')})`
    const stopColor = `rgb(${makeColor([255, 255, 255]).join(',')})`
    const randomDuration = Math.floor(Math.random() * 1000) + 1000
    rects.push(
      `<rect x="${x}px" y="${y}px" width="${boxSize}px" height="${boxSize}" fill="url(#${x}-${y})" filter="url(#blurMe)"></rect>`
    )

    defs.push(`

<linearGradient id="${x}-${y}">
  <stop offset="0%" stop-color="${startColor}">
    <animate
      attributeName="offset"
      dur="${randomDuration}ms"
      values="0;0.1;0.2;0.3;0.4"
      repeatCount="indefinite"
    />
  </stop>
  <stop offset="100%" stop-color="${stopColor}">
    <animate
      attributeName="offset"
      dur="${randomDuration}ms"
      values="0.3;0.7;0.8;0.9;1"
      repeatCount="indefinite"
    />
  </stop>
</linearGradient>
    `)
  }
}

const svg = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${
  frameSize[0]
}" height="${frameSize[1]}" viewBox="0 0 ${frameSize[0]} ${frameSize[1]}">
  <defs>
    <filter id="blurMe">
     <feGaussianBlur stdDeviation="1"/>
    </filter>
    ${defs.join('\n')}
  </defs>
  ${rects.join('\n')}
</svg>
`
console.log(svg)
fs.writeFileSync('./generated.svg', svg, 'utf8')
