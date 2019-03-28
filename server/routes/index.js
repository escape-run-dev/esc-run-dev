const express = require('express');
const router  = express.Router();

var Jasmine = require('jasmine');
var jasmine = new Jasmine()

var fs = require('fs');

jasmine.loadConfigFile("../server/spec/support/jasmine.json")

var globalMessage = []

//Custom reporter:
var myReporter = {

  message: [],

  specDone: function(result) {

    this.message.push({description: result.description, status: result.status})
      
    console.log('Spec: ' + result.description + ' was ' + result.status);
    
    for(var i = 0; i < result.failedExpectations.length; i++) {            
            console.log('Failure: ' + result.failedExpectations[i].message)
            console.log(result.failedExpectations[i].stack)
    }
    console.log(result.passedExpectations.length)
  },

  suiteDone: function(result) {

    console.log('Suite: ' + result.description + ' was ' + result.status);
    for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('AfterAll ' + result.failedExpectations[i].message);
        console.log(result.failedExpectations[i].stack);
      }
    },
  
  jasmineDone: function() {
    globalMessage = this.message
    console.log('Finished suite');
  }        
}

jasmine.addReporter(myReporter)

router.get('/', (req, res, next) => {
  res.render('index')
})

router.post("/writeFile", (req,res,next) => {
  
  let {content, id} = req.body

  console.log("Hola")
  console.log(id)

  // fs.writeFile(`lib/games/${id}.js`, content, function (err) {
  //   if (err) console.log(err)
  //   console.log('Lib is created successfully.')
  // })

  let spec = content + `; describe("A ver si funcionase esto...", () => {

    it("debería funcionar", () => {
      expect(suma(2,4)).toEqual(6)
    })
    it("no debería funcionar", () => {
        expect(suma(3,2)).toEqual(4)
    })
  })` 
  
  fs.writeFile(`spec/games/${id}Spec.js`, spec, function (err) {
    if (err) {console.log(err)
    res.status(500).json({msg:err})}
    console.log('Spec is created successfully.')
    res.json({msg:"ok"})
  },)

})

router.post("/runJasmine", (req,res,next) => {

  let {id} = req.body 

  console.log("Hola")
  console.log(id)

  
  jasmine.onComplete(passed => {
    console.log(globalMessage)
    res.json(globalMessage)
  })

  jasmine.execute([`./spec/games/${id}Spec.js`])

})

module.exports = router;
