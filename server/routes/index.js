const express = require('express');
const router  = express.Router();

var Jasmine = require('jasmine');

var fs = require('fs');


var globalMessage = []
// var finished = false

//Custom reporter:
var myReporter = {

  // timer: new jasmine.jasmine.Timer(),
  // The `print` function passed the reporter will be called to print its results.
  print: function() {
      process.stdout.write(arguments);
  },

  specDone: function(result) {

    globalMessage.push({description: result.description, status: result.status})
    console.log(result.description,result.status)
    // console.log('Spec: ' + result.description + ' was ' + result.status);
    
  //   for(var i = 0; i < result.failedExpectations.length; i++) {            
  //           console.log('Failure: ' + result.failedExpectations[i].message)
  //           console.log(result.failedExpectations[i].stack)
  //   }
  //   console.log(result.passedExpectations.length)
  },

  // suiteDone: function(result) {

  //   console.log('Suite: ' + result.description + ' was ' + result.status);
  //   for(var i = 0; i < result.failedExpectations.length; i++) {
  //       console.log('AfterAll ' + result.failedExpectations[i].message);
  //       console.log(result.failedExpectations[i].stack);
  //     }
  //   },
  
  jasmineDone: function() {
    // finished = true
    console.log('Finished suite');
  }        
}




router.get('/', (req, res, next) => {
  res.render('index')
})

router.post("/writeFile", (req,res,next) => {
  
  let {content, id} = req.body

  // fs.writeFile(`lib/games/${id}.js`, content, function (err) {
  //   if (err) console.log(err)
  //   console.log('Lib is created successfully.')
  // })

  let spec = content + `; describe("A ver si funcionase esto...", () => {

    it("La suma de 2 y 4 es 6", () => {
      expect(suma(2,4)).toEqual(6)
    })
    it("La suma de 3 y 2 no es 4", () => {
        expect(suma(3,2)).toEqual(4)
    })
  })` 

  runJasmine = id => {
    console.log("Ejecutando Jasmine")

    // jasmine.onComplete(passed => {
    //   console.log("Mensaje: " + globalMessage)
    //   res.json(globalMessage)
    // })

    var jasmine = new Jasmine()
    jasmine.loadConfigFile("../server/spec/support/jasmine.json")
    jasmine.addReporter(myReporter)


    jasmine.execute([`./spec/games/${id}Spec.js`])

    // while (!finished) {
    //   console.log("Bucle")
    // }

    // res.json(globalMessage)

    jasmine.onComplete(passed => {
      console.log(globalMessage)
      res.json({globalMessage})
    })
  }
  
  fs.writeFile(`spec/games/${id}Spec.js`, spec, () => {
    console.log("File created")
    runJasmine(id)
  },)

})

// router.post("/runJasmine", (req,res,next) => {

//   let {id} = req.body 

//   console.log("Hola")
//   console.log(id)

  



// })

module.exports = router;
