const canvas = document.getElementById("workspace")
const xSlider = document.getElementById('xSlider')
const ySlider = document.getElementById('ySlider')
const dsSlider = document.getElementById('s_density')
const dmSlider = document.getElementById('m_density')
const dlSlider = document.getElementById('l_density')
const seed = document.getElementById('seed')
const gridCheckbox = document.getElementById('showGrid')
const numOfStars = document.getElementById('numOfStars')

const c = canvas.getContext("2d")
const canvasWidth = c.canvas.width
const canvasHeight = c.canvas.height

const draw = e => {
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (gridCheckbox.checked) {
        drawX()
        drawY()
    }
    drawStars()
}

gridCheckbox.addEventListener('input', draw)
xSlider.addEventListener('input', draw)
ySlider.addEventListener('input', draw)
dsSlider.addEventListener('input', draw)
dmSlider.addEventListener('input', draw)
dlSlider.addEventListener('input', draw)
seed.addEventListener('input', draw)

function drawX (e) {
    const lines = xSlider.value
    const spacing = canvasWidth / lines
    c.strokeStyle = "white"
    c.lineWidth = 0.25
    for (let i = 1; i < lines; i++) {
        c.beginPath()
        c.moveTo(i * spacing, 0)
        c.lineTo(i * spacing, canvasWidth)
        c.stroke()
    }
}

function drawY (e) {
    const lines = ySlider.value
    const spacing = canvasHeight / lines
    c.strokeStyle = "white"
    c.lineWidth = 0.25
    for (let i = 1; i < lines; i++) {
        c.beginPath()
        c.moveTo(0, i * spacing)
        c.lineTo(canvasWidth, i * spacing)
        c.stroke()
    }
}

function drawStars (e) {
    const xSliderValue = xSlider.value
    const ySliderValue = ySlider.value
    const xSpacing = canvasWidth / xSliderValue
    const ySpacing = canvasHeight / ySliderValue
    const numOfGrid = xSliderValue * ySliderValue
    const smallStars = dsSlider.value
    const mediumStars = dmSlider.value
    const largeStars = dlSlider.value
    const randomS = new Random(seed.value)
    const randomM = new Random(seed.value * 2)
    const randomL = new Random(seed.value * 3)
    c.fillStyle = "white"
    for (let i = 0; i < numOfGrid; i++) {
        const xStart = (i % xSliderValue) * xSpacing
        const xEnd = ((i % xSliderValue) + 1) * xSpacing
        const yStart = Math.floor((i / xSliderValue)) * ySpacing
        const yEnd = Math.floor(((i / xSliderValue) + 1)) * ySpacing

        for (let j = 0; j < smallStars; j++) {
            const xPosition = (randomS.nextFloat() * (xEnd - xStart)) + xStart
            const yPosition = (randomS.nextFloat() * (yEnd - yStart)) + yStart

            drawSingleStar(xPosition, yPosition, 0.6)
        }

        for (let j = 0; j < mediumStars; j++) {
            const xPosition = (randomM.nextFloat() * (xEnd - xStart)) + xStart
            const yPosition = (randomM.nextFloat() * (yEnd - yStart)) + yStart

            drawSingleStar(xPosition, yPosition, 1.2)
        }

        for (let j = 0; j < largeStars; j++) {
            const xPosition = (randomL.nextFloat() * (xEnd - xStart)) + xStart
            const yPosition = (randomL.nextFloat() * (yEnd - yStart)) + yStart

            drawSingleStar(xPosition, yPosition, 1.8)
        }
    }

    numOfStars.innerHTML = ''
    numOfStars.innerHTML += `<h1>Small stars: ${numOfGrid * smallStars}</h1>`
    numOfStars.innerHTML += `<h1>Medium stars: ${numOfGrid * mediumStars}</h1>`
    numOfStars.innerHTML += `<h1>Large stars: ${numOfGrid * largeStars}</h1>`
}

function drawSingleStar(x, y, size) {
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI);
    c.fill();
}

function Random(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
}

Random.prototype.next = function () {
    return this._seed = this._seed * 16807 % 2147483647;
}

Random.prototype.nextFloat = function () {
    return (this.next() - 1) / 2147483646;
}

draw()

