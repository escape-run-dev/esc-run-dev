var initialCode = ` isCollision = () => {
    return game.obstacles.some(obstacle => {
        return (
        ((this.player.x + this.player.w) >= obstacle.x &&
            this.player.x < (obstacle.x + obstacle.w) &&
            this.player.y + (this.player.h - 20) >= obstacle.y)
        )
    })
}`

export default initialCode
