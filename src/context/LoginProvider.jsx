import React, { useState } from 'react'
import { createContext } from 'react';

const LoginContext = createContext();

export default function Quiz(props){
  const [loginData,setLoginData] = useState({});
  
  return (
    <div>
        <LoginContext.Provider value={{loginData,setLoginData}}>
            {props.children}
        </LoginContext.Provider>
    </div>
  )
}

export {LoginContext}