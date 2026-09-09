import React from 'react'

const Balance = ({value}) => {
  return (
    <>
    <div className="flex">
        <div className="font-bold text-2xl mt-4 ml-5 "> Your Balance </div>
        <div className="text-xl mt-5 ml-5 font-bold"> Rs {value} </div>
    </div>
    </>
  )
}

export default Balance
