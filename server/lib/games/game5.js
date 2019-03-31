var prueba5 = `\ndescribe("La función lastDayIsFriday debe...", function(){

    it ("La función debe devolver un número", () => {
      expect(typeof(lastDayIsFriday(1901, 2000))).toEqual("number")
    })
  
    it ("Debe devolver 171 entre 1901 y 2000", () => {
      expect(lastDayIsFriday(1901, 2000)).toEqual(171); 
    });
    
    it ("Debe devolver 200 entre 1991 y 2017", () => {
      expect(lastDayIsFriday(1901, 2017)).toEqual(200); 
    });
    
    it ("Debe devolver 1 en 1991", () => {
      expect(lastDayIsFriday(1991)).toEqual(1); 
    });
    
    it ("Debe devolver 2 en 2017", () => {
      expect(lastDayIsFriday(2017)).toEqual(2); 
    });
  });` 

module.exports = prueba5;