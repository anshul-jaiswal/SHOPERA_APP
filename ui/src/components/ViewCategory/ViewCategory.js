import './ViewCategory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __categoryApiurl } from '../../Apiurl';
import { Link } from 'react-router-dom';
function ViewCategory() {
  const [cDetail, setCDetail] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(__categoryApiurl + "fetch").then((response) => {
      setCDetail(response.data);
      setError('');
    }).catch((error) => {
      console.error(error);
      setError("Failed to load categories. Please try again later.");
    });

  },[])
  return (
    <>
      {/* About Start */}
      <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
        <div className="container about px-lg-0">
          <div className="row g-0 mx-lg-0">
            <div className="col-lg-12 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
              <h1>ViewCategory Here!!!!!</h1>
              {error && <p className='text-danger'>{error}</p>}
              <div id="main">
                {cDetail.length > 0 ? (
                  cDetail?.map((row) => (
                    <div classNameName="item" key={row._id}>
                      <Link to={`/viewsc/${row.catnm}`}>
                        <img src={row.caticonname}
                          onError={(e) => { e.target.src = "/assets/img/default_image.png" }}
                          height={130} width={150} className='mx-2 p-2' />
                        <p style={{ marginLeft: '15px' }}>{row.catnm}</p>
                      </Link>
                    </div>
                  ))) : (
                    <div className='text-center w-100'>
                      <p>No Category found .</p>
                    </div>
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

export default ViewCategory;