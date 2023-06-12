export class AudioPlayer {
	// массив песен
	songs = [`Asia`, `Ptichka`, `VdolDorog`, `Danse`, `Ysoldat`]
	// Индекс
	songIndex = 0
	constructor(player, audio, playerImage, playerSong, progressContainer, progress, btnPrev, btnPlay, btnNext) {
		Object.assign(this, { player, audio, playerImage, playerSong, progressContainer, progress, btnPrev, btnPlay, btnNext })

		// load
		this.loadSong(this.songs[this.songIndex])

		// play
		this.btnPlay.addEventListener('click', () => {
			const isPlaing = this.player.classList.contains('play')
			if (isPlaing) {
				this.pauseSong()
			} else {
				this.playSong()
			}
		})

		// next
		this.btnNext.addEventListener('click', () => {
			this.nextSong()
		})

		// prev
		this.btnPrev.addEventListener('click', () => {
			this.prevSong()
		})

		// progress
		this.audio.addEventListener('timeupdate', this.updateProgress)

		// set progress(перемотка)
		this.progressContainer.addEventListener('click', (e) => {
			this.setProgress(e)
		})

		// autoplay
		this.audio.addEventListener('ended', () => {
			this.nextSong()
		})
	}
	
	// load
	loadSong(song) {
		this.playerSong.textContent = song
		this.audio.src = `audio/${song}.mp3`
		this.playerImage.src = `img/${song}${this.songIndex + 1}.jpeg`
	}

	// play
	playSong() {
		this.player.classList.add('play')
		this.audio.play()
	}

	// pause
	pauseSong() {
		this.player.classList.remove('play')
		this.audio.pause()
	}

	// next song
	nextSong() {
		this.songIndex++
		if (this.songIndex > this.songs.length - 1) {
			this.songIndex = 0
		}
		this.loadSong(this.songs[this.songIndex])
		this.playSong()
	}

	// prev song
	prevSong() {
		this.songIndex--
		if (this.songIndex == 0) {
			this.songIndex = this.songs.length - 1
		}
		this.loadSong(this.songs[this.songIndex])
		this.playSong()
	}

	// progressBar
	updateProgress(e) {
		const { duration, currentTime } = e.srcElement
		const progressPercent = (currentTime / duration) * 100
		progress.style.width = `${progressPercent}%`
	}

	// set progress(перемотка);
	setProgress(e) {
		const width = e.target.clientWidth
		const clickX = e.offsetX
		const duration = audio.duration
		this.audio.currentTime = (clickX / width) * duration
	}
}
