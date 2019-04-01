class Player {

    constructor (game) {
        this.game = game
        this.x = this.game.canvas.width * 0.08
        this.y0 = this.game.canvas.height * 0.8
        this.y = this.y

        this.img = new Image()
        this.img.src = 'img/player.png'
        this.img.frames = 3
        this.img.frameIndex = 0
        this.w = 50
        this.h = 75

        this.vy = 1
        this.bullets = []

        this.setListeners()
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
  
        this.bullets = this.bullets.filter(bullet => bullet.x < this.game.canvas.width)
      
        this.bullets.forEach(bullet => {
          bullet.draw()
          bullet.move()
        })
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


    
  
  
  

  