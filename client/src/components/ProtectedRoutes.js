import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({component: Component, user, getTheGame, setTheGame, roundCompleted, qrRead, checkQr, ...rest}) => { 
    
    return (
        <Route
          {...rest}
          render={ props  => {
              if(user){
                return <Component {...props} user={user} getTheGame={getTheGame} setTheGame={setTheGame} roundCompleted={roundCompleted} qrRead={qrRead} checkQr={checkQr}  />
              } else {
                return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
              }
            }
          }
        />
      )
}

export default ProtectedRoutes