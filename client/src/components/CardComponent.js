import React from 'react'

const CardComponent = (props) => {
    
  let containerCard = props.containerCard


  return (
    <section className="card">
      
      {containerCard.imageUrl ? <div><p>imageUrl</p><img src={containerCard.imageUrl}/></div> : null}
      {containerCard.img = <img src={containerCard.img}/>}
      {containerCard.Img ? <div><p>Image</p><img src={containerCard.Img}/></div> : null}
      {containerCard.Start ? <p>Start: {containerCard.Start}</p> : null}
      {containerCard.r1 ? <p>Ruta 1: {containerCard.r1}</p> : null}
      {containerCard.r1 ? <p>Ruta 2: {containerCard.r2}</p> : null}
      {containerCard.r1 ? <p>Ruta 3: {containerCard.r3}</p> : null}
      {containerCard.r1 ? <p>Ruta 4: {containerCard.r4}</p> : null}
      {containerCard.msg ? <p>{containerCard.msg}</p> : null}
      {containerCard.foodName ? <p>foodName: {containerCard.foodName}</p> : null}
      {containerCard.foodOwner ? <p>foodOwner: {containerCard.foodOwner}</p> : null}
      {containerCard.foodQuality ? <p>foodQuality: {containerCard.Quality}</p> : null}
      {containerCard.foodDescription ? <p>foodDescription:{containerCard.foodDescription}</p> : null}
      {containerCard.foodDrink ? <p>foodDrink: {containerCard.foodDrink}</p> : null}
      {containerCard.foodCover ? <p>foodCover: {containerCard.foodCover}</p> : null}
      {containerCard.foodTaste ? <p>foodTaste: {containerCard.foodTaste}</p> : null}
      {containerCard.foodColor ? <p>foodColor: {containerCard.foodColor}</p> : null}
      {containerCard.foodFromOutside ? <p>foodFromOutside: {containerCard.foodFromOutside}</p> : null}
      {containerCard.Description ? <p>Description: {containerCard.Description}</p> : null}
      {containerCard.Name ? <p>Name: {containerCard.Name}</p> : null}

    </section>
  )
}

export default CardComponent