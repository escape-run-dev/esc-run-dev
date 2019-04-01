import gameImg1 from "./img/background.jpg"
import gameImg2 from "./img/spaceship.png"



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
        this.game.ctx.drawImage(this.img, this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height)
    }
      
}

class Obstacle {

    constructor (game) {
        this.game = game
  
        this.w = 15
        this.h = this.w * 3
      
        this.dx = 10
      
        this.x = this.game.canvas.width
        this.y = this.game.player.y0 + this.game.player.h - this.h - 5
    }
  
    // TENGO QUE CREAR NUEVA IMAGEN Y PINTAR LA IMAGEN EN VEZ DE UN RECTÁNGULO
  draw = () => {
    this.game.ctx.fillStyle = "black"
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  
  move = () => {
    this.x -= this.dx
  }
  
}

class Player {

    constructor (game) {
        this.game = game
        this.x = this.game.canvas.width * 0.08
        this.y0 = this.game.canvas.height * 0.5
        this.y = this.y0

        this.img = new Image()
        this.img.src = gameImg2
        this.img.frames = 3
        this.img.frameIndex = 0
        this.w = 100
        this.h = 100

        this.vy = 1
        // this.bullets = []
        this.dx = 0.5

        // this.setListeners()
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

    controlPlayer = () => {
        // document.onkeydown = event => {
        //   if (event.keyCode === this.game.keys.TOP_KEY && this.y === this.y0) {
        //     this.y -= 5
        //     this.vy -= 10
        //   } else if (event.keyCode === this.game.keys.SPACE) {
        //     this.shoot()
        //   }
        // }
    }

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

    move = () => {
        this.x += this.dx
    }
      
      

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
    }

    start =  () => {
        this.reset()

        console.log(this.player)

        this.interval = setInterval( () => {

            this.clear()
    
            this.framesCounter++
            // if (this.framesCounter > 1000) this.framesCounter = 0
            if (this.framesCounter % 50 === 0) this.generateObstacle()
          
            this.player.move()
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
    }

    gameOver = () => {
        this.stop()

        // if (confirm("GAME OVER. Play again?")) 
        //     this.reset()
        //     this.start()
        // }
    }

    reset = () => {
        this.background = new Background(this)
        this.player = new Player(this)
        // this.framesCounter = 0
        this.obstacles = []
        // this.score = 0;
    }

    isCollision = () => {
        return this.obstacles.some(obstacle => {
            return (
            ((this.player.x + this.player.w) >= obstacle.x &&
                this.player.x < (obstacle.x + obstacle.w) &&
                this.player.y + (this.player.h - 20) >= obstacle.y)
            )
        })
    }

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