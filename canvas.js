const canvas = document.getElementById("workspace")
const xSlider = document.getElementById('xSlider')
const ySlider = document.getElementById('ySlider')
const gridCheckbox = document.getElementById('showGrid')
const densitySliders = [ document.getElementById('s_density'), document.getElementById('m_density'), document.getElementById('l_density') ]
const seed = document.getElementById('seed')

const c = canvas.getContext("2d")
const canvasWidth = c.canvas.width
const canvasHeight = c.canvas.height

gridCheckbox.addEventListener('input', draw)
xSlider.addEventListener('input', draw)
ySlider.addEventListener('input', draw)
for (let i = 0; i < densitySliders.length; i++)
{
	densitySliders[i].addEventListener('input', draw)
}
seed.addEventListener('input', draw)

function draw (e)
{
	c.fillStyle = "black"
	c.fillRect (0, 0, canvas.width, canvas.height)

	if (gridCheckbox.checked)
	{
		drawGrid ()
	}
	drawStars ()
}

function drawGrid ()
{
	const xlines = xSlider.value
	const xspacing = canvasWidth / xlines
	const ylines = ySlider.value
	const yspacing = canvasHeight / ylines
	c.strokeStyle = "white"
	c.lineWidth = 0.5

	for (let i = 1; i < xlines; i++)
	{
		c.beginPath ()
		c.moveTo (Math.round(i * xspacing), 0)
		c.lineTo (Math.round(i * xspacing), canvasWidth)
		c.stroke ()
	}

	for (let i = 1; i < ylines; i++)
	{
		c.beginPath ()
		c.moveTo (0, Math.round(i * yspacing))
		c.lineTo (canvasWidth, Math.round(i * yspacing))
		c.stroke ()
	}
}

function drawStars ()
{
	const xSliderValue = xSlider.value
	const ySliderValue = ySlider.value

	xSlider.nextSibling.innerHTML = `${xSlider.value}`
	ySlider.nextSibling.innerHTML = `${ySlider.value}`

	const xSpacing = canvasWidth / xSliderValue
	const ySpacing = canvasHeight / ySliderValue
	const numOfGrid = xSliderValue * ySliderValue
	const random = [ new Random(seed.value), new Random(seed.value * 2), new Random(seed.value * 3) ]

	c.fillStyle = "white"

	for (let i = 0; i < numOfGrid; i++)
	{
		const xStart = (i % xSliderValue) * xSpacing
		const xEnd = ((i % xSliderValue) + 1) * xSpacing
		const yStart = Math.floor((i / xSliderValue)) * ySpacing
		const yEnd = Math.floor(((i / xSliderValue) + 1)) * ySpacing

		for (let j = 0; j < densitySliders.length; j++)
		{
			for (let k = 0; k < densitySliders[j].value; k++)
			{
				const xPosition = (random[j].nextFloat() * (xEnd - xStart)) + xStart
				const yPosition = (random[j].nextFloat() * (yEnd - yStart)) + yStart

				drawSingleStar(xPosition, yPosition, j * 0.6 + 0.6)
			}
		}
	}

	const	names = [ "Small", "Medium", "Large" ]
	for (let i = 0; i < densitySliders.length; i++)
	{
		densitySliders[i].nextSibling.innerHTML = `${names[i]}: ${numOfGrid * densitySliders[i].value}`
	}

	seed.nextSibling.innerHTML = `${seed.value}`
}

function drawSingleStar(x, y, size) {
	c.beginPath();
	c.arc(x, y, size, 0, 2 * Math.PI);
	c.fill();
}

function Random(seed) {
	this._seed = (seed * 3145279) % 2147483647;
	if (this._seed <= 0) this._seed += 2147483646;
}

Random.prototype.next = function () {
	return this._seed = this._seed * 16807 % 2147483647;
}

Random.prototype.nextFloat = function () {
	return (this.next() - 1) / 2147483646;
}

draw()
