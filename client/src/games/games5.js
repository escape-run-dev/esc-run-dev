//SIN ERRATAS:

// function lastDayIsFriday(initialYear, endYear) {

//     function lastDayOfMonth (month,year){
//         var lastDay = new Date(year, month + 1, 0);
//         return lastDay.getDay()
//     }
      
//     function lastDaysOfYear (year){
//       var counter = 0
//       for (var i = 0; i < 12; i++){
//         if (lastDayOfMonth(i,year) === 5){
//         counter += 1
//         }
//       }
//       return counter
//     }
      
//     var fridays = 0
//     if (endYear === undefined){
//       fridays += lastDaysOfYear(initialYear)
//     } else {
//       for (var i = initialYear; i <= endYear; i++){
//         fridays += lastDaysOfYear(i)
//       }
//     }  
//     return fridays
//   }

var initialCode = `function lastDayIsFriday(initialYear, endYear) {

    function lastDayOfMonth (month,year){
        var lastDay = new Date(year, month + 1, 0);
        lastDay.getDay()
    }
      
    function lastDaysOfYear (year){
      var counter = 0
      for (var i = 0; i < 12; i++){
        if (lastDayOfMonth(i,year) === 5){
        counter += 1
        }
      }
      return counter
    }
      
    var fridays = 0
    if (endYear = undefined){
      Fridays += lastDaysOfYear(initYear)
    } else {
      for (var i = initialYear; i <= lastYear; i =+ 1){
        fridays += lastDaysOfYear(i)
      }
    }  
    return fridays
  }`

export default initialCode
