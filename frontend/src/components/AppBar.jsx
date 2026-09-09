import React from 'react'

const AppBar = () => {
  return (
   <>
   <div className="flex shadow justify-between text-xl">

    <div className="text-3xl  font-bold mt-2 ml-2">Payments App</div>
    <div className="flex">
    <div className="mr-4 mt-4 font-medium"> Hello, User </div>
    <div className=" flex mr-3 rounded-full h-12 w-12 bg-amber-600 justify-center mt-2 mb-1"> 
      <div className="flex-col flex h-full justify-center h-full"> U </div>
       </div>
    </div>
   </div>
   </>
  )
}

export default AppBar
