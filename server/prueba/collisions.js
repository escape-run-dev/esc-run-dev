 const isCollision = game => {
    return game.obstacles.some(obstacle => {
        return false
    })
}
    module.exports = isCollision