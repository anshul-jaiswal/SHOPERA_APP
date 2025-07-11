import './VerifyUser.css'
import { Navigate,useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import {__userApi} from '../../Apiurl';
import axios from 'axios';

function VerifyUser()
{
    const params = useParams();
    const [verified, setVerified] = useState(false);
    
    useEffect(()=>{
     axios.get(__userApi+"fetch?email="+params.email).then((response)=>{
        if(response.data[0]?.__v==0)
        {
            var updateDetails={"condition_obj":{"email":params.email},"content_obj":{"status":1,"__v":1}}; 
            axios.patch(__userApi+"update",updateDetails).then((response)=>{
            setVerified(true);    
            });    
        } 
        else{
            setVerified(true)
        }      
     });
    },[]);


    if(verified){
        return  <Navigate to='/login' />
    }

    return(
        <div>
           <h3 className='verification'>Verifying your account</h3>
        </div>
    )
}

export default VerifyUser