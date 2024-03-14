var header = document.querySelector('header h2')
var cdThumd = document.querySelector('.cd-thumb')
var audio = document.querySelector('#audio')
var playList = document.querySelector('.playlist')
var cd = document.querySelector('.cd')
var playBtn = document.querySelector('.btn-toggle-play')
var player = document.querySelector('.player')
var progress = document.querySelector('#progress')
var nextBtn = document.querySelector('.btn-next')
var prevBtn = document.querySelector('.btn-prev')
var randomBtn = document.querySelector('.btn-random')
var repeatBtn = document.querySelector('.btn-repeat')

var app = {
    currentIndex: 0,
    isplaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
           name: 'Come As You Are',
           singer: 'Nirvana',
           path: './assets/music/Nirvana.mp3',
           image: './assets/image/Nirvana.webp' 
        },        
        {
            name: 'Pho Real',
            singer: 'bbno$, Low G & Anh Phan',
            path: './assets/music/phoreal.mp3',
            image: './assets/image/Bbno.webp' 
         },
         {
            name: 'AI BIET',
            singer: 'Wean',
            path: './assets/music/aibiet.mp3',
            image: './assets/image/wean.webp' 
         }, 
         {
            name: 'Love You Still',
            singer: 'Tyler Shaw',
            path: './assets/music/LoveYouStill.mp3',
            image: './assets/image/TylerShaw.webp' 
         }, 
         {
            name: 'Dear Love',
            singer: 'Hustlang Robber',
            path: './assets/music/DearLove.mp3',
            image: './assets/image/robber.webp' 
         },
         {
            name: 'Come As You Are',
            singer: 'Nirvana',
            path: './assets/music/Nirvana.mp3',
            image: './assets/image/Nirvana.webp' 
         },        
         {
             name: 'Pho Real',
             singer: 'bbno$, Low G & Anh Phan',
             path: './assets/music/phoreal.mp3',
             image: './assets/image/Bbno.webp' 
          },
          {
             name: 'AI BIET',
             singer: 'Wean',
             path: './assets/music/aibiet.mp3',
             image: './assets/image/wean.webp' 
          }, 
          {
             name: 'Love You Still',
             singer: 'Tyler Shaw',
             path: './assets/music/LoveYouStill.mp3',
             image: './assets/image/TylerShaw.webp' 
          }, 
          {
             name: 'Dear Love',
             singer: 'Hustlang Robber',
             path: './assets/music/DearLove.mp3',
             image: './assets/image/robber.webp' 
          }  
    ],
    render: function() {
        var htmls = this.songs.map(function(song, index) {
            return `
                <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join('')

    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function() {
        var cdWidth = cd.offsetWidth 
        document.onscroll = function() {
            var scrollTop  = window.scrollY || document.documentElement.scrollTop
            var newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        var cdThumdAnimation = cdThumd.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumdAnimation.pause()
        playList.onclick = function(e) {
            var songNode = e.target.closest('.song')
            var songActive = e.target.closest('.song.active')
            var options = e.target.closest('.option')
            if(songNode || songActive || options) {
                if(songActive) {
                    audio.play()
                }
                if(songNode) {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }
            }
        }
        playBtn.onclick = function() {
            if(app.isplaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        audio.onplay = function() {
            app.isplaying = true
            player.classList.add('playing')
            cdThumdAnimation.play()
        }
        audio.onpause = function() {
            app.isplaying = false
            player.classList.remove('playing')
            cdThumdAnimation.pause()
        }
        audio.ontimeupdate = function() {
            if(audio.duration) {
                var setProgress = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = setProgress 
            }
        }
        progress.onchange = function(e) {
            var seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        nextBtn.onclick = function() {
            if(app.isRandom) {
                app.randomSong()
            } else {
                app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToTop()
        }
        prevBtn.onclick = function() {
            if(app.isRandom) {
                app.randomSong()
            } else {
                app.prevSong()
            }
            audio.play()
            app.render()
            app.scrollToTop()
        }
        audio.onended = function() {
            if(app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        randomBtn.onclick = function() {
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('active', app.isRandom)
        }
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('active', app.isRepeat)
        }
    },
    scrollToTop: function() {
        setTimeout(() => {
            document.querySelector('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',

            })
        },300)
    },
    loadCurrentSong: function() {
        header.textContent = this.currentSong.name
        cdThumd.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function() {
        var newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        this.defineProperties()
        this.handleEvent()
        this.loadCurrentSong()
        this.render()
    }
}

app.start()