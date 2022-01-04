
function preload() {
  img = loadImage('./niklas-render.jpg');
}


const rows = []

function setup() {
  pixelDensity(1)
  createCanvas(windowWidth, windowHeight);

  image(img, 0, 0, 500, 500)

  // Create 2d array in `rows`
  img.loadPixels()
  for (let rowNumber = 0; rowNumber < img.width; rowNumber++) {
    const cols = []
    for (let colNumber = 0; colNumber < img.height; colNumber++) {
      const index = (colNumber + rowNumber * img.width) * 4
      color = [img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], img.pixels[index + 3]]
      cols.push(color)
    }
    rows.push(cols)
  }
}


function draw() {


  rows.forEach((row, rowNumber) => {
    const a = row.sort((a, b) => {
      return hue(a) - hue(b)
    })
  })



  const newImage = createImage(img.width, img.height)
  newImage.loadPixels()

  rows.forEach((row, rowNumber) => {
    row.forEach((col, colNumber) => {
      const index = (colNumber + rowNumber * newImage.width) * 4
      newImage.pixels[index] = col[0]
      newImage.pixels[index + 1] = col[0 + 1]
      newImage.pixels[index + 2] = col[0 + 2]
      newImage.pixels[index + 3] = col[0 + 3]
    })
  });

  newImage.updatePixels()


  image(newImage, 0, 500, 500, 500)
  noLoop()

}
