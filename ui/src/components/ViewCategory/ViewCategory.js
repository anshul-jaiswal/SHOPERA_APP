import './ViewCategory.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {__categoryApiurl} from '../../Apiurl';
import {Link} from 'react-router-dom';
function ViewCategory() {
const [cDetail,setCDetail]=useState([]);

useEffect(()=>{
   axios.get(__categoryApiurl+"fetch").then((response)=>{
    setCDetail(response.data);
  }).catch((error)=>{
    console.log(error);
  });

})
  return (
    <>
    {/* About Start */}
    <div class="container-fluid bg-light overflow-hidden my-5 px-lg-0">
        <div class="container about px-lg-0">
            <div class="row g-0 mx-lg-0">
                 <div class="col-lg-12 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                <h1>ViewCategory Here!!!!!</h1>
                    <div id="main">
                      {
                        cDetail?.map((row)=>(
                          <div class="item">
                           <Link to ={`/viewsc/${row.catnm}`}> 
                            <img src={`./assets/uploads/caticons/${row.caticonname}`} height={130} width={150} className='mx-2 p-2'/>
                            <p style={{  marginLeft: '15px'}}>{row.catnm}</p>
                          </Link>
                          </div>
                        ))
                      }    
                        
                     </div>
                </div>
            </div>     
        </div>
    </div>
    {/* About End */}

    </>
      
     );
}

export default ViewCategory;