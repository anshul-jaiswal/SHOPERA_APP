import './ViewSubCategory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {__subcategoryapiurl } from '../../Apiurl';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewSubCategory() {
  const [cDetail, setCDetail] = useState([]);
  const param=useParams();

  useEffect(() => {
    axios.get(__subcategoryapiurl + "fetch?catnm="+param.catnm).then((response) => {
      setCDetail(response.data);
    }).catch((error) => {
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
              <h1>ViewSubCategory Here!!!!!</h1>
              <div id="main">
                {
                  cDetail?.map((row) => (
                    <div class="item">
                      <Link to={`/viewp/${row.Subcatnm}`}>
                        <img src={`../assets/uploads/subcaticons/${row.subcaticonnm}`} height={100} width={100} />
                        <p>{row.Subcatnm}</p>
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

export default ViewSubCategory;