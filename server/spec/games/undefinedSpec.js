undefined; describe("A ver si funcionase esto...", () => {

    it("La suma de 2 y 4 es 6", () => {
      expect(suma(2,4)).toEqual(6)
    })
    it("La suma de 3 y 2 no es 4", () => {
        expect(suma(3,2)).toEqual(4)
    })
  })