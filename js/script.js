import { AudioPlayer } from "./AudioPlayer.js"

// AudioPlayer
const player = new AudioPlayer(
	document.getElementById('player'),
	document.getElementById('audio'),
	document.getElementById('player-image'),
	document.getElementById('player-song'),
	document.getElementById('progress-container'),
	document.getElementById('progress'),
	document.getElementById('btn-prev'),
	document.getElementById('btn-play'),
	document.getElementById('btn-next'),
)

// canvas
document.addEventListener('DOMContentLoaded', function (e) {

	const canvas = document.getElementById('canvas')
	const audio = document.getElementById('audio')
	const ctx = canvas.getContext('2d')
	const columnGap = 2
	const columnCount = 256 // Кол-во колонок: 1024, 512, 256, 128, 64

	let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
	let source = audioCtx.createMediaElementSource(audio)
	let analyser = audioCtx.createAnalyser()
	analyser.fftSize = columnCount
	source.connect(analyser) // Подключаем анализатор к элементу audio
	analyser.connect(audioCtx.destination) // Без этой строки нет звука но анализатор работает
	let frequencyData = new Uint8Array(analyser.frequencyBinCount)

	// draws a column
	function drawColumn(x, width, height) {
		const gradient = ctx.createLinearGradient(0, canvas.height - height / 2, 0, canvas.height)
		gradient.addColorStop(1, `rgba(255,255,255,1)`)
		gradient.addColorStop(0.9, `rgba(255,150,0,1)`)
		gradient.addColorStop(0, `rgba(255,0,0,0)`)
		ctx.fillStyle = gradient
		ctx.fillRect(x, canvas.height - height / 2, width, height)
	}

	// render
	function render() {
		analyser.getByteFrequencyData(frequencyData) // Записываем в массив
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		// Ширина колонки
		const columnWidth = (canvas.width / frequencyData.length) - columnGap + (columnGap / frequencyData.length)
		// Масштабный коофицент
		const heightScale = canvas.height / 100
		// Позиция каждой колонки
		let xPos = 0
		for (let i = 0; i < frequencyData.length; i++) {
			let columnHeight = frequencyData[i] * heightScale
			drawColumn(xPos, columnWidth, columnHeight / 2)
			xPos += columnWidth + columnGap
		}
		window.requestAnimationFrame(render)
	}
	window.requestAnimationFrame(render)
})
