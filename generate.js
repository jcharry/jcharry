const fs = require('fs')

const boxSize = 5
const gutterSize = 0
const gridSize = [20, 5]
// const center =

const width = 400
const height = 150

const frameSize = [width, height]

const mainTag = `<svg viewBox="0 0 ${frameSize[0]} ${frameSize[1]}">`
const closingTab = '</svg>'

// const makeRandomByteInt = () => Math.floor(Math.random() * 256)
// const averageColor = (a, b) => Math.floor((a + b) / 2)

const makeColor = (i, j) => {
  const baseColor = [224, 141, 0]
  return [baseColor[0] + i, baseColor[1] + j, 0]

  // return color.map((c, i) => averageColor(c, mix[i]))
}

// function duplicate(v, times) {
//   let res = []
//   for (let i = 0; i < times; i++) {
//     res = res.concat(v)
//   }
//   return res
// }
// let c = duplicate(
//   [
//     '#00429d',
//     '#2e59a8',
//     '#4771b2',
//     '#5d8abd',
//     '#73a2c6',
//     '#8abccf',
//     '#a5d5d8',
//     '#c5eddf',
//     '#ffffe0'
//   ],
//   10
// )

const rects = []
const defs = []
for (let r = 5, theta = 0; r < 100; r += 1, theta += Math.PI / 12) {
  let x = r * Math.cos(theta)
  let y = r * Math.sin(theta)
  // const x = i * boxSize + i * (gutterSize - 1)
  // const y = j * boxSize + j * (gutterSize - 1)
  const startColor = `rgb(${makeColor(x, y).join(',')}, 0.5)`
  // const stopColor = `rgb(${makeColor(i, j).join(',')}, 0.5)`
  // const randomDuration = 2000
  const begin = r * 100
  // rects.push(
  //   `<rect width="${boxSize}px" height="${boxSize}px" x="${x}px" y="${y}px" fill="${startColor}" filter="url(#blurMe)">
  //     <animateTransform attributeName="transform" type="scale" values="1;1.5;1" begin="${begin}ms" dur="2000ms" repeatCount="indefinite"/>
  //   </rect>`
  // )
  rects.push(
    `<circle r="${r / 10}" cx="${x + width / 2}" cy="${y + height / 2}" fill="${
      r % 2 === 0 ? 'black' : 'lightgray'
    }" filter="url(#blurMe)">
        <animateTransform attributeName="transform" type="scale" values="1;1.05;1" begin="${begin}ms" dur="2000ms" repeatCount="indefinite"/>
      </circle>`
  )
  // rects.push(
  //   `<circle r="${boxSize /
  //     2}px" cx="${x}px" cy="${y}px" fill="${startColor}" filter="url(#blurMe)">
  //     <animateTransform attributeName="transform" type="scale" values="1;1.5;1" begin="${begin}ms" dur="2000ms" repeatCount="indefinite"/>
  //   </circle>`
  // )

  //     defs.push(`
  //
  // <linearGradient id="${x}-${y}">
  //   <stop offset="0%" stop-color="${startColor}">
  //     <animate
  //       attributeName="offset"
  //       dur="${randomDuration}ms"
  //       values="0;0.1;0.2;0.3;0.4"
  //       repeatCount="indefinite"
  //     />
  //   </stop>
  //   <stop offset="100%" stop-color="${stopColor}">
  //     <animate
  //       attributeName="offset"
  //       dur="${randomDuration}ms"
  //       values="0.3;0.7;0.8;0.9;1"
  //       repeatCount="indefinite"
  //     />
  //   </stop>
  // </linearGradient>
  //     `)
  // }
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
