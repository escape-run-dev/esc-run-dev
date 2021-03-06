const express = require('express');
const router  = express.Router();

var Jasmine = require('jasmine');

var fs = require('fs');

var validateCss = require('css-validator');
var assert = require('assert')


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
  
  let {content, id, prueba} = req.body
  // fs.writeFile(`lib/games/${id}.js`, content, function (err) {
  //   if (err) console.log(err)
  //   console.log('Lib is created successfully.')
  // })

  runJasmine = id => {

    var jasmine = new Jasmine()
    jasmine.loadConfigFile("./spec/support/jasmine.json")
    jasmine.addReporter(myReporter)
  
    console.log("Ejecutando Jasmine")

    // jasmine.onComplete(passed => {
    //   console.log("Mensaje: " + globalMessage)
    //   res.json(globalMessage)
    // })
    try {
      jasmine.execute([`./spec/games/${id}${randomizer}Spec.js`])
    }
    catch (err) {
      fs.unlink(`spec/games/${id}${randomizer}Spec.js`, (err) => {
        if (err) console.log(err)
        console.log('File deleted')
      });
      globalMessage.push({description: "Hay algún error gordo en tu código que hace que ni siquiera podamos testearlo (mira a ver esos paréntesis, llaves, etc.)", status: "failed"})
      res.status(200).json({globalMessage, passed: false})
      globalMessage = []
    }

    // while (!finished) {
    //   console.log("Bucle")
    // }

    // res.json(globalMessage)

    jasmine.onComplete(passed => {
      fs.unlink(`./spec/games/${id}${randomizer}Spec.js`, (err) => {
        if (err) console.log(err)
        console.log('File deleted')
      });
      res.json({globalMessage, passed})
      globalMessage = []
    })
  }


  function getRandom() {
    return Math.floor((Math.random() * (897876 - 10) + 10))
  }

  // writeFirst = (id,content,prueba) => {

    let currentGame = require(`../lib/games/game${prueba}`)
    let spec = content + currentGame
    let randomizer = getRandom()

    fs.writeFile(`./spec/games/${id}${randomizer}Spec.js`, spec, (err) => {
      if (err) console.log(err)
      console.log("File created")
      runJasmine(id,randomizer)
    },)
 
  
})

router.post("/writeCss", (req,res,next) => {

  let {content, validator} = req.body
  
  if (validator) {
    validateCss({text: content}, (err, data) => {

      if (!data.errors.length) {
        fs.writeFile(`./public/puzzle-css/user.css`, content, (err) => {
          if (err) console.log(err)
          console.log("File created or updated")
          res.json({msg: "El CSS está poppy"})
        },)
      } else {
        console.log("No he escrito una mierda")
        res.status(200).json({errorMsg: "El CSS que has introducido no pasa la validación"})
      }
    })
  } else {
    fs.writeFile(`./public/puzzle-css/user.css`, content, (err) => {
      if (err) console.log(err)
      console.log("File created or updated")
      res.json({msg: "Pues como no lo he validado, ¡para dentro!"})
    },)
  }

})

router.post("/writeCollisions", (req,res,next) => {

  let {content} = req.body
  console.log(req.user)
  // console.log(content)
  let newContent = content.replace(/(export default isCollision;)/g, "module.exports = isCollision")
  // fs.writeFile(`../client/src/components/canvas/collisions.js`, content, (err) => {
  fs.writeFile(`./prueba/collisions.js`, newContent, (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({msg: "Algo ha ido mal"});
      return
    }
    console.log("Prueba created or updated")
    try {
      delete require.cache[require.resolve('./prueba/collisions')]
      let prueba = require(`./prueba/collisions`)
      // console.log(prueba.toString());
      prueba({
        obstacles:[
          {x:10, y:10, h:10, w:10},
          {x:10, y:10, h:10, w:10},
          {x:10, y:10, h:10, w:10},
          {x:10, y:10, h:10, w:10},
        ],
        player:{x:10,y:10,h:10, w:10}
      })
      fs.writeFile(`./public/canvas/collisions.js`, content, (err) => {
        if(err) {
          console.log(err)
          res.status(500).json({msg: "Algo ha ido mal"});
          return
        }
        console.log("File created or updated")
        res.status(200).json({msg: "ok"})
      })
    } catch {
      console.log("Ha petado")
      res.status(500).json({msg:"ERROR"})
    }
  },)


})

// router.post("/runJasmine", (req,res,next) => {

//   let {id} = req.body 

//   console.log("Hola")
//   console.log(id)

  



// })

module.exports = router;
