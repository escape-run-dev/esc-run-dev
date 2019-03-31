var prueba5 = `\ndescribe("La función lastDayIsFriday debe...", function(){

    it("No enredes con la función que te hemos dado...", () => {
        expect(typeof freeFood).toEqual("function")
    })
    it ("La función debe devolver un número", () => {
      expect(typeof(freeFood())).toEqual("number")
    })
    it ("Debe devolver la cantidad que se ha ahorrado en un mes", () => {
      expect(freeFood()).toEqual(21.4); 
    });
    it("El resultado es un número de dos cifras con un decimal", () => {
        expect(freeFood().toString().length).toEqual(4)
        expect(freeFood().toString().charAt(2)).toEqual(".")
    })
  });` 

module.exports = prueba5;