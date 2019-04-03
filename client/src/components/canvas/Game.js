import gameImg1 from "./img/background.jpg"
import gameImg2 from "./img/spaceship.png"
import gameImg3 from "./img/aestroid_dark.png"
// import buttonUp from "./img/button_up.png"
// import buttonDown from "./img/button_down.png"
// import wasCollision from '%PUBLIC_URL%/canvas/collisions.js'

class Background {

    constructor (game) {
        this.game = game
      
        this.img = new Image()
        this.img.src = gameImg1
      
        this.x = 0
        this.y = 0
      
    }
      
    draw = () => {
        this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height)
        // this.game.ctx.drawImage(this.img, this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height)
    }
      
}


class Obstacle {

    constructor (game) {
        this.game = game
  
        this.w = 25
        this.h = 25

        this.img = new Image()
        this.img.src = gameImg3
      
        this.dx = 2
        
        this.getRandom = () => {
            return Math.floor(Math.random() * (this.game.canvas.height - this.h))
        }

        this.x = this.game.canvas.width
        this.y = this.getRandom()
    }

    
    
    draw = () => {
    
        this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        // this.game.ctx.fillStyle = "black"
        // this.game.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    
    move = () => {
        this.x -= this.dx
    }
    
}

class Player {

    constructor (game) {
        this.game = game
    
        this.img = new Image()
        this.img.src = gameImg2
        this.img.frames = 3
        this.img.frameIndex = 0
        this.w = 80
        this.h = 100

        this.x = this.game.canvas.width * 0.08
        this.y0 = this.game.canvas.height * 0.5 - (this.h / 2)
        this.y = this.y0

        this.vy = 1
        // this.bullets = []
        this.dx = 0.5
    }

    draw = () => {
        this.game.ctx.drawImage(
          this.img,
          this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
          0,
          Math.floor(this.img.width / this.img.frames),
          this.img.height,
          this.x,
          this.y,
          this.w,
          this.h
        )

        this.animateImg()
  
        // this.bullets = this.bullets.filter(bullet => bullet.x < this.game.canvas.width)
      
        // this.bullets.forEach(bullet => {
        //   bullet.draw()
        //   bullet.move()
        // })
    }

    animateImg = () => {
        if (this.game.framesCounter % 6 === 0) {
            this.img.frameIndex += 1      
            if (this.img.frameIndex > 2) this.img.frameIndex = 0;
        }
    }

    //COSAS SOBRE LAS QUE PODRÍAMOS MANIPULAR: 

    // controlPlayer = () => {
    //     // document.onkeydown = event => {
    //     //   if (event.keyCode === this.game.keys.TOP_KEY && this.y === this.y0) {
    //     //     this.y -= 5
    //     //     this.vy -= 10
    //     //   } else if (event.keyCode === this.game.keys.SPACE) {
    //     //     this.shoot()
    //     //   }
    //     // }
    // }

    jump = () => {
        // Aumenta la velocidad en el eje y.
        var gravity = 0.4;
      
        // solo salta cuando el personaje está en el suelo
        if (this.y >= this.y0) {
          this.vy = 1;
          this.y = this.y0;
        } else {
          this.vy += gravity;
          this.y += this.vy;
        }
    }

    // move = () => {
    //     this.x += this.dx
    // }
      
      

    // shoot = () => {
    //     let bullet = new Bullet(this.game, this.x + this.w, this.y + this.h / 2)
    //     this.bullets.push(bullet)
    // }


    // //Movimiento de las balas:
    // move = () => {
    //     var gravity = 0.4
      
    //     if (this.y >= this.y0) {
    //       this.vy = 1;
    //       this.y = this.y0;
    //     } else {
    //       this.vy += gravity;
    //       this.y += this.vy;
    //     }
    //   }
   
}

// class Button {
//     constructor(game,type){
//         this.game = game
//         this.type = type
//         this.img = new Image()

//         this.w = 40
//         this.h = 40

//         if(this.type === "up"){
//             this.img.src = buttonUp
//             this.x = this.game.canvas.width - 50
//             this.y = this.game.canvas.height - 100
//         } 

//         if(this.type === "down"){
//             this.img.src = buttonDown
//             this.x = this.game.canvas.width - 50
//             this.y = this.game.canvas.height - 50
//         }


//     }

//     draw = () => {
//         this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
//     }

// }


class Game {
    constructor (canvas) {
      this.canvas = canvas
      this.ctx = this.canvas.getContext("2d")
      this.w = 600
      this.h = 400
      this.canvas.width = this.w
      this.canvas.height = this.h
      this.fps = 60
      this.framesCounter = 0
      this.obstacles = []
      this.result = ""
      this.started = false
    }

    checkCollision = () => {

    }

    start =  () => {
        this.started = true
        this.reset()
        // this.setListeners()

        this.interval = setInterval( () => {

            this.clear()
            
            this.framesCounter++
            // if (this.framesCounter > 1000) this.framesCounter = 0
            if (this.framesCounter % 100 === 0) this.generateObstacle()
            if (this.framesCounter % 1800 === 0) this.youWin()
          
            // this.player.move()
            this.obstacles.forEach(obstacle => obstacle.move())
            this.drawAll()
      
            this.clearObstacles();
      
            if (this.isCollision()) this.gameOver()
            
          }, 1000 / this.fps)
        }
    
    clear = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    stop = () => {
        clearInterval(this.interval)
        this.started = false
    }

    gameOver = () => {
        this.result = "lose"
        this.stop()

        // if (confirm("GAME OVER. Play again?")) 
        //     this.reset()
        //     this.start()
        // }
    }

    youWin = () => {
        this.result = "win"
        this.stop()
    }

    reset = () => {
        this.background = new Background(this)
        this.player = new Player(this)
        // this.buttonUp = new Button(this,"up")
        // this.buttonDown = new Button(this,"down")
        this.framesCounter = 0
        this.obstacles = []
        this.result = ""
        // this.framesCounter = 0
        // this.score = 0;
        // this.buttonUp.setListeners()
    }
    
    
    // setListeners = () => {
    //     window.onclick = (e) => {
    //         console.log(e.clientX,e.clientY)
    //         if (this.player.y > 0){
    //             if (e.clientX > 880 && e.clientX < 945 && e.clientY > 340 && e.clientY < 390) this.player.y -= 10
    //         }
    //         if (this.player.y < (this.canvas.height - this.player.h)){
    //             if (e.clientX > 880 && e.clientX < 945 && e.clientY > 490 && e.clientY < 392) this.player.y += 10
    //         }    
    //     }
    // }

    isCollision = () => {
        console.log("En componentDidMount", this.checkCollision, typeof this.checkCollision)
        console.log("What is this", this)
        return eval(this.checkCollision(this))
    }

    // isCollision = () => {
    //     return this.obstacles.some(obstacle => {
    //         return (
    //         ((this.player.x + this.player.w) >= obstacle.x &&
    //             this.player.x < (obstacle.x + obstacle.w) &&
    //             this.player.y + (this.player.h - 20) >= obstacle.y)
    //         )
    //     })
    // }

    clearObstacles = () => {
        this.obstacles = this.obstacles.filter(function (obstacle) {
          return obstacle.x >= 0;
        })
    }

    generateObstacle = () => {
        this.obstacles.push(new Obstacle(this));
    }

    drawAll = () => {
        this.background.draw()
        this.player.draw()
        // this.buttonUp.draw()
        // this.buttonDown.draw()
        this.obstacles.forEach(obstacle => obstacle.draw())
    }

    // moveAll = () => {
    //     this.background.move()
    //     this.player.move()
        
    // }

    // this.start()

}


    // generateObstacle: function () {
    // this.obstacles.push(new Obstacle(this));
    // },

export {Game}