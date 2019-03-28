const suma = (num1,num2) => {
    return num1 + num2
}; describe("A ver si funcionase esto...", () => {

    it("debería funcionar", () => {
      expect(suma(2,4)).toEqual(6)
    })
    it("no debería funcionar", () => {
        expect(suma(3,2)).toEqual(4)
    })
  })