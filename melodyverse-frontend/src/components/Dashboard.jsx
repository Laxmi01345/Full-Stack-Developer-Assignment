import react, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
const Dashboard=()=>{
    const location = useLocation();
    const username = location.state?.username; 

    
    return (
        <>
            <div className='bg-gray-600 text-white text-4xl'>
            <h1>Welcome, {username} !</h1>
            <div className="text-2xl mt-6">
            <p>Enjoy unlimited music for free !!</p></div>
            </div>
        </>
    )
}


export default Dashboard;