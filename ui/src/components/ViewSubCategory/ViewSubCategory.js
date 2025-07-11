import './ViewSubCategory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __subcategoryapiurl } from '../../Apiurl';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewSubCategory() {
  const [sDetail, setSDetail] = useState([]);
  const param = useParams();

  useEffect(() => {
    axios.get(__subcategoryapiurl + "fetch?catnm=" + param.catnm).then((response) => {
      setSDetail(response.data);
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
                {sDetail.length > 0 ? (
                  sDetail?.map((row) => (
                    <div class="item" key={row._id}>
                      <Link to={`/viewp/${row.Subcatnm}`}>
                        <img src={row.subcaticonnm}
                          onError={(e) => { e.target.src = "/assets/img/default_image.png" }}
                          height={130} width={150} className='mx-2 p-2' />
                        <p style={{ marginLeft: '15px' }}>{row.Subcatnm}</p>
                      </Link>
                    </div>
                  ))) : (
                    <div className='text-center w-100'><p>No Subcategory found for this Category.</p></div>
                )
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