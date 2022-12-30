import React from 'react'
import { createContext,useState } from 'react'

const searchContext=createContext();

function ContextPrimary({children}) {
    const [ search,setSearch]=useState("BTC");

  return (
    
    <div>
    
        <searchContext.Provider value={{search,setSearch}}>
          {children}
        </searchContext.Provider>
    </div>
  )
}

export { ContextPrimary}
export { searchContext }