import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios'
import img1 from "../images/img1.png"
import img2 from "../images/img2.webp"
import {useNavigate} from 'react-router-dom'
import PasswordStrengthBar from 'react-password-strength-bar';
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [Username ,setUsername] = useState('');
    const [Password ,setPassword] = useState(''); 
    const [ConfirmPassword ,setConfirmPassword] = useState(''); 
    const [Email ,setEmail] = useState(''); 
    const [RememberMe, setRememberMe] = useState(false);
    const navigate=useNavigate();

    const HandleLogin=async (e)=>{
        e.preventDefault();

        if (!Username.trim() && !Password.trim() ){
            toast.error("Fill the empty fields !")
            return;
        }
        else if (!Username.trim()) {
            toast.error("Username is required!");
            return;
        }
        else if (!Password.trim()){
            toast.error("Password is required!")
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login',{
                username:Username,
                password:Password,
            },{
                headers : {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === "success"){
                
                
                
                
                if (RememberMe){
                    localStorage.setItem('token',response.data.token);
                }
                else{
                    sessionStorage.setItem('token', response.data.token);
                }
                toast.success("You have Succcessfully login !!")
                setTimeout(() => {
                    navigate('/dashboard', { state: { username: Username }, replace: false });

            }, 1500);
                
            }

        }
        catch (error) {
            
    
            const errorMessage = error.response.data.message;
            toast.error(errorMessage || "An error occurred");
            
        }


        
    }

    const HandleSignUp=async (e)=>{
        e.preventDefault();

        if (!Username.trim() && !Password.trim() ){
            toast.error("Fill the empty fields !")
            return;
        }
        else if (!Username.trim()) {
            toast.error("Username is required!");
            return;
        }
        else if (!Email.trim()){
            toast.error("Email is required!")
            return;
        }
        else if (!Password.trim()){
            toast.error("Password is required!")
            return;
        }
        else if (Password !== ConfirmPassword){
            toast.error("Password and Confirm Password are different!")
            return;
        }

        

        try {
            const response = await axios.post('http://localhost:3000/signup',{
                username:Username,
                email:Email,
                password:Password,
            },{
                headers : {
                    'Content-Type': 'application/json'
                }
            });
 
            if (response.data.status === "success"){
                toast.success("Signup successful! Check your email for verification.");
                
                localStorage.setItem("token", response.data.token);
                
                setIsLogin(true);
                
              }
              
    

        }
        catch(error){
            if (error.response.data.message === "Email already exists"){
                toast.error("Email already exists");
            } 
            else if (error.response.data.message === "username already exists"){
                toast.error("username already exists");
            }
            else if (error.response.data.message === "error while loading"){
                toast.error("error while loading");
            }
            else{
                toast.error("error");
            }
        }


        
    }
    return (

        <div className="h-screen flex items-center justify-center">
        <ToastContainer />
            <div className="flex w-[800px] h-[490px] bg-gradient-to-r from-gray-900 to-purple-700 rounded-lg shadow-2xl shadow-purple-500/20">
                {/* Left Section */}
                {isLogin && (

                    

                    
                    <div className="flex-1 p-8 mt-4 ">
                    <h2 className="text-3xl font-bold text-white mb-8">Login</h2>
                    <form className="space-y-6" onSubmit={HandleLogin}>
                        <div className="relative">
                            <input 
                                type="text" 
                                
                                placeholder="Username"
                                value={Username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                                
                                className="w-full bg-transparent border-b-2 border-gray-400 px-2 py-2 text-white outline-none focus:border-pink-500 transition-colors"
                            />
                            
                            <FaUserAlt className="absolute right-2 top-3 text-gray-400" />
                        </div>

                        <div className="relative">
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={Password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                className="w-full bg-transparent border-b-2 border-gray-400 px-2 py-2 text-white outline-none focus:border-pink-500 transition-colors"
                            />
                            
                            <RiLockPasswordFill className="absolute right-2 top-3 text-gray-400" />
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-2 rounded-full hover:opacity-90 transition-opacity">
                            Login
                        </button>
                        
                        <div className="flex justify-between items-center text-white text-sm">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="accent-pink-500" onClick={()=>{setRememberMe(true)}}/>
                                <span>Remember me</span>
                            </div>
                            
                        </div>
                        <p className="cursor-pointer text-white hover:text-pink-500 transition-colors"><Link to="/forgot-password">Forgot Password?</Link></p>


                        <p className="cursor-pointer text-center text-gray-300">
                            Don't have an account? <span className="text-pink-500 cursor-pointer hover:underline" onClick={() => setIsLogin(false)}>Sign Up</span>
                        </p>
                    </form>
                </div>
                )}


                <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#d282a6] to-pink-600 rounded-r-lg p-8 flex-col justify-center items-center text-center">
                    {isLogin ? (
                        <img src={img1} alt="img1"  />
                    ) : (
                        <img src={img2} alt="img2"  />
                    )   }


                </div>


                {!isLogin && (
                    <div className="flex-1 p-8">
                    <h2 className="text-3xl font-bold text-white mb-8">Signup</h2>
                    <form className="space-y-6" onSubmit={HandleSignUp}>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Username"
                                value={Username}
                                onChange={(e)=>setUsername(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-gray-400 px-2 py-2 text-white outline-none focus:border-pink-500 transition-colors"
                            />
                            
                            <FaUserAlt className="absolute right-2 top-3 text-gray-400" />
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Email"
                                value={Email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-gray-400 px-2 py-2 text-white outline-none focus:border-pink-500 transition-colors"
                            />
                            <FaUserAlt className="absolute right-2 top-3 text-gray-400" />
                        </div>

                        <div className="relative">
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={Password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="w-full bg-transparent  text-white outline-none "
                            />
                            <PasswordStrengthBar password={Password}  className="text-white outline-none focus:border-pink-500 transition-colors"/> 

                            <RiLockPasswordFill className="absolute right-2 top-3 text-gray-400" />
                        </div>
                        <div className="relative">
                            <input 
                                type="password" 
                                placeholder="ConfirmPassword"
                                value={ConfirmPassword}
                                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                className="w-full bg-transparent border-b-2 border-gray-400 px-2 py-2  text-white outline-none text-white outline-none focus:border-pink-500 transition-colors"
                            />
                            

                            <RiLockPasswordFill className="absolute right-2 top-3 text-gray-400" />
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-2 rounded-full hover:opacity-90 transition-opacity">
                            SignUp
                        </button>

                        <p className="text-center text-gray-300">
                            Already have an account? <span className="text-pink-500 cursor-pointer hover:underline" onClick={() => setIsLogin(true)}>Login</span>
                        </p>
                    </form>
                </div>
                )}

                
                

                



                
            </div>


            
        </div>

    )
}



export default AuthPage;