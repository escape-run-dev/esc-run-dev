const reduceDuration = (movies) => {
    // Aquí tu código.

const movies = require("../../lib/games/movies")

describe("Reducir la duración debe ser vuestra misión", () => {
  it("No enredes con la función que te hemos dado...", () => {
    expect(typeof reduceDuration).toEqual("function")
  })
  it("El resultado debe ser un número", () => {
    expect(typeof reduceDuration(movies)).toEqual("number")
  })
  it("Los minutos del array se acumulan", () => {
    expect(reduceDuration(movies)).toEqual(3231)
  })
  it("El resultado debe tener cuatro cifras", () => {
    expect(reduceDuration(movies).toString().length).toEqual(4)
  })
  it("El resultado no debe ser un decimal", () => {
    expect(reduceDuration(movies) % 1).toEqual(0)
  })
})