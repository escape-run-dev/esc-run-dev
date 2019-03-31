function nbaCup(resultSheet, toFind) {
  
    var teamExists = false 
    var errorMessage = ""
  
    teams.split(",").forEach (function (team) {
        if (team.trim() === toFind){
          teamExists = true
        }
      })
  
      var matches = resultSheet.split(",")
  
      var filtered = matches.filter(function (match){
        return match.includes(toFind)
      })
  
      var teamName = toFind.split(" ")[0]
      var teamLetters = toFind.split(" ").length
  
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
      })
  
      var ans = toFind + ":W=" + wins + ";D=" + draws + ";L=" + loses + ";Scored=" + pointsScored + ";Conceded=" + pointsConceded + ";Points=" + points
  
      if (toFind === ""){
        return ""
      }
      else if (errorMessage !== ""){
          return errorMessage
      }
      else if (teamExists){
        return ans
      } else {
        return toFind + ":This team didn't play!"
      }
        
  }
var r1 = "Los Angeles Clippers 104 Dallas Mavericks 88,New York Knicks 101 Atlanta Hawks 112,Indiana Pacers 103 Memphis Grizzlies 112,"
+ "Los Angeles Lakers 111 Minnesota Timberwolves 112,Phoenix Suns 95 Dallas Mavericks 111,Portland Trail Blazers 112 New Orleans Pelicans 94,"
+ "Sacramento Kings 104 Los Angeles Clippers 111,Houston Rockets 85 Denver Nuggets 105,Memphis Grizzlies 76 Cleveland Cavaliers 106,"
+ "Milwaukee Bucks 97 New York Knicks 122,Oklahoma City Thunder 112 San Antonio Spurs 106,Boston Celtics 112 Philadelphia 76ers 95,"
+ "Brooklyn Nets 100 Chicago Bulls 115,Detroit Pistons 92 Utah Jazz 87,Miami Heat 104 Charlotte Hornets 94,"
+ "Toronto Raptors 106 Indiana Pacers 99,Orlando Magic 87 Washington Wizards 88,Golden State Warriors 111 New Orleans Pelicans 95,"
+ "Atlanta Hawks 94 Detroit Pistons 106,Chicago Bulls 97 Cleveland Cavaliers 95,";
var r2 = "San Antonio Spurs 111 Houston Rockets 86,Chicago Bulls 103 Dallas Mavericks 102,Minnesota Timberwolves 112 Milwaukee Bucks 108,"  
+ "New Orleans Pelicans 93 Miami Heat 90,Boston Celtics 81 Philadelphia 76ers 65,Detroit Pistons 115 Atlanta Hawks 87,"  
+ "Toronto Raptors 92 Washington Wizards 82,Orlando Magic 86 Memphis Grizzlies 76,Los Angeles Clippers 115 Portland Trail Blazers 109,"  
+ "Los Angeles Lakers 97 Golden State Warriors 136,Utah Jazz 98 Denver Nuggets 78,Boston Celtics 99 New York Knicks 85,"  
+ "Indiana Pacers 98 Charlotte Hornets 86,Dallas Mavericks 87 Phoenix Suns 99,Atlanta Hawks 81 Memphis Grizzlies 82,"  
+ "Miami Heat 110 Washington Wizards 105,Detroit Pistons 94 Charlotte Hornets 99,Orlando Magic 110 New Orleans Pelicans 107,"  
+ "Los Angeles Clippers 130 Golden State Warriors 95,Utah Jazz 102 Oklahoma City Thunder 113,San Antonio Spurs 84 Phoenix Suns 104,"  
+ "Chicago Bulls 103 Indiana Pacers 94,Milwaukee Bucks 106 Minnesota Timberwolves 88,Los Angeles Lakers 104 Portland Trail Blazers 102,"  
+ "Houston Rockets 120 New Orleans Pelicans 100,Boston Celtics 111 Brooklyn Nets 105,Charlotte Hornets 94 Chicago Bulls 86,Cleveland Cavaliers 103 Dallas Mavericks 97";
var teams = "Los Angeles Clippers,Dallas Mavericks,New York Knicks,NYK,Atlanta Hawks,Indiana Pacers,Memphis Grizzlies,"
+ "Los Angeles Lakers,Minnesota Timberwolves,Phoenix Suns,Portland Trail Blazers,New Orleans Pelicans,"
+ "Sacramento Kings,Los Angeles Clippers,Houston Rockets,Denver Nuggets,Cleveland Cavaliers,Milwaukee Bucks,"
+ "Oklahoma City Thunder, San Antonio Spurs,Boston Celtics,Philadelphia 76ers,Brooklyn Nets,Chicago Bulls,"
+ "Detroit Pistons,Utah Jazz,Miami Heat,Charlotte Hornets,Toronto Raptors,Orlando Magic,Washington Wizards,"
+ "Golden State Warriors,Dallas Maver";
var r = r1 + r2;


describe("Suite",("Calcular los resultados de los Celtics") => {
    it("Test 1",("Debe devolver los resultados cuando el nombre del equipo es correcto") => {    
         expect(nbaCup(r, "Boston Celtics")).toEqual("Boston Celtics:W=4;D=0;L=0;Scored=403;Conceded=350;Points=12")
     })
     it("Test 2", ("Debe devolver 'Team Name:This team didn't play!' cuando el nombre del equipo no es correcto") => {
         expect(nbaCup(r, "Boston Celt")).toEqual("Boston Celt:This team didn't play!")
     })
 })