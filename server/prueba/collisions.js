 const isCollision = game => {
    return game.obstacles.some(obstacle => {
        return (
        ((game.player.x + game.player.w) >= obstacle.x &&
            game.player.x < (obstacle.x + obstacle.w) &&
            game.player.y + (game.player.h - 20) >= obstacle.y)
        )
    })
}
    