import './ViewProduct.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __Productapiurl } from '../../Apiurl';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ViewProduct() {
  const [pDetail, setPDetail] = useState([]);
  const param = useParams();

  useEffect(() => {
    axios.get(__Productapiurl + "fetch?Subcatnm=" + param.Subcatnm).then((response) => {
      setPDetail(response.data);
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
              <h1>ViewProduct Here!!!!!</h1>
              <div id="main" className='row'>
                {pDetail.length > 0 ? (
                  pDetail.map((product) => (
                    <div key={product._id} className="col-md-4 mb-4">
                      <div className="card">
                        <img
                          src={product.producticonnm}
                          onError={(e) => { e.target.src = "/assets/img/default_image.png" }}
                          className="card-img-top"
                          alt={product.title}
                          height="180"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.title}</h5>
                          {product.size &&<p className='card-title'>Size:{product.size}</p>}
                          <p className="card-text">Price: ₹{product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                <div className='text-center w-100'>  <p>No products found for this subcategory.</p></div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

    </>

  );
}

export default ViewProduct;