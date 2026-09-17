import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

const Users = () => {

  const [filter , setFilter] = useState("");  
  const [users , setUsers] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/user/bulk?filter=" + filter)
    .then(response =>{
      setUsers(response.data.user)
    })
  },[filter])

  return (
   <>
   <div className="w-300 ml-5">
   <div className="font-bold mt-6 text-lg "> Users </div>
   <div>
    <input onChange={(e) => {
      setFilter(e.target.value)
    }} type="text" placeholder="Search user..." className="w-full border rounded border-slate-200 mt-2 px-3 py-1"></input>
   </div>
     <div className='mt-10'>
            {users.map(user => <User user={user} />)}
        </div>
   </div>
   </>
  )
}

function User({user}){
  const navigate = useNavigate();

  return <div className="flex justify-between mt-2">
    <div className="flex">
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {user.firstName[0]}
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
    </div>

      <div className="flex flex-col justify-center h-full">
        <Button label={"Send Money"} onClick={(e) => {
          navigate("/send?id=" + user.id + "&name=" + user.firstName);
        }}/>
      </div>
  </div>
}

export default Users
