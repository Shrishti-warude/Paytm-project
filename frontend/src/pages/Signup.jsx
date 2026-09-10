import React, { useState } from 'react'
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Signup = () => {
  const [UserName , setUserName] = useState("");
  const [Password , setPassword] = useState("");
  const [FirstName , setFirstName] = useState("");
  const [LastName , setLastName] = useState("");
  const navigate = useNavigate();

  return (
  <>
   <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white text-center w-80 p-2 h-max px-4">
        <Heading label={"Signup"} />  

        <SubHeading label={"Enter you information to create an account"} />

        <InputBox  placeholder={"John"} label={"First Name"} onChange={e => {
          setFirstName(e.target.value);
        }} />

        <InputBox placeholder={"Deo"} label={"Last Name"} onChange={e => {
          setLastName(e.target.value);
        }}/>

        <InputBox placeholder={"abc@gmail.com"} label={"User Name"} onChange={e => {
          setUserName(e.target.value);
        }}/>

        <InputBox placeholder={"12345"} label={"Password"} onChange={e => {
          setPassword(e.target.value);
        }}/>

        <div className="pt-4">
          <Button label={"SignUp"} onClick={async() => {
             const response = await axios.post("http://localhost:5000/user/signup" , {
              UserName , 
              Password,
              FirstName,
              LastName
             });
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
          }}/>
        </div>

        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
      </div>
    </div>
   </div>
  </>
  )
}

export default Signup
