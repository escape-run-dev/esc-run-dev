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
  
  fs.writeFile(`spec/jasmine_examples/${id}Spec.js`, content, function (err) {
    if (err) console.log(err)
    console.log('File is created successfully.')
  },)

})

router.post("/runJasmine", (req,res,next) => {

  let {id} = req.body 

  console.log("Hola")
  console.log(id)

  jasmine.execute([`./spec/jasmine_examples/${id}Spec.js`])

  jasmine.onComplete(passed => {
    console.log(globalMessage)
    res.json(globalMessage)
  })

})

module.exports = router;
