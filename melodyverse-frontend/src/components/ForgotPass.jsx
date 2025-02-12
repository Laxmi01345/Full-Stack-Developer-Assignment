import react from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {Link} from "react-router-dom"
import {useState} from "react"
const ForgotPass = () => {

  const [Email ,setEmail] = useState('');
  const [NewPassword ,setNewPassword] = useState('');

  const HandleSubmit= async(e)=>{
    e.preventDefault();

    if (!Email.trim() || !NewPassword.trim() ){
      toast.error("Fill the empty fields !")
      return;
    }

    try{
      const response = await axios.patch('http://localhost:3000/reset-password', {
        email:Email,
        password:NewPassword
      },
      {
        headers : {
            'Content-Type': 'application/json'
        }
    });

    if (response.data.status === "ok"){
      toast.success("Password reset successfully");
      toast.success("You can now login ");
      return;
    }
    }
    catch(error){
      const errorMessage = error.response.data.message;
      console.log(errorMessage)
      toast.error(errorMessage || "An error occurred");
  }
  }
  return (
    <>
      <div className=" mt-20 border-4 border-purple-400 x-40 p-4 rounded-md bg-gray-400">
      <ToastContainer />

        <h1 className="text-3xl font-bold text-black mb-8">Forgot Password</h1>

        <form onSubmit={HandleSubmit}>
        <div className="m-2">

        <label>Email : </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="h-full p-2 text-black rounded-md"
            
            required 
          />
        
        </div>
        <div>
          <label>Password : </label>
          <input type="password" placeholder="Enter your new Password " className="rounded-md h-full p-2" value={NewPassword}
            onChange={(e)=>{setNewPassword(e.target.value)}} />
         </div>
          <button type="submit" className="p-2 m-4 bg-green-800 text-white rounded-md">Reset Password</button>
        </form>

        <br/>

        <button  type="submit" className="bg-black text-white p-2" > <Link to="/">Back</Link>  </button>
        
      </div>
    </>
  );
};

export default ForgotPass;
