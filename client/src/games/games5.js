var initialCode = `function nbaCup(resultSheet, toFind) {
  
    var teamExists = false 
    var errorMessage = undefined
  
    teams.split(",").forEach (function (team) {
        if (team.trim() === ToFind){
          teamExists = true
      })
  
      var matches = resultSheet.split(",")
  
      var filtered = match.filter(function (matches){
        return match.includes(toFind)
      })
  
      var teamName = toFind.split(" ")[0]
      var teamLetters = toFind.split(" ").lenght
  
      var currentMatch = []
      var currentScore = []
      var wins = 0
      var loses = 0
      var draws = 0
      var points = 0
      var pointsScored = 0
      var pointsConceded = 0
  
      filtered.forEach (function (match){
        currentMatch = match.split(" ")
        if (currentMatch[0] === teamName){
          currentScore.push(parseFloat(currentMatch[teamLetters]))
          currentScore.push(parseFloat(currentMatch[currentMatch.length - 1]))
        } else {
          currentScore.push(parseFloat(currentMatch[currentMatch.length - 1]))
          currentScore.push(parseFloat(currentMatch[currentMatch.length - 2 - teamLetters]))
        }
        if ((currentScore[0] % 1 !== 0) || (currentScore[1] % 1 !== 0)){
          errorMessage = "Error(float number):" + currentMatch.join (" ")
        }
        if (currentScore[0] > currentScore[1]){
          wins++
          points += 3
        } else if (currentScore[0] < currentScore[1]){
          loses++
        } else {
          draws++
          points++
        }
        pointsScored += currentScore[0]
        pointsConceded += currentScore[1]
  
        currentMatch = []
        currentScore = []
  
      var ans = toFind + ":W=" + wins + ";D=" + draws + ";L=" + loses + ";Scored=" + pointsScored + ";Conceded=" + pointsConceded + ";Points=" + points
  
      if (toFind === ""){
        return ""
      }
      else if (errorMessage !== ""){
          return error
      }
      else if (teamExists){
        return ans
      } else {
        return toFind + ":This team didn't play!"
      }
        
  }`

export default initialCode
