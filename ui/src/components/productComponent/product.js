import './product.css'
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { __Productapiurl } from '../../Apiurl';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Product() {
    const { addToCart } = useCart();
    const [productDetails, setProductDetails] = useState([]);
    const navigate=useNavigate()


    useEffect(() => {
        axios.get(__Productapiurl + "fetch").then((response) => {
            setProductDetails(response.data);
            // console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });

    }, [])
    return (<>


        {/* About Start */}
        <div class="container-xxl py-5 mb-4">
            <div class="container">
                <div class=" mb-5">
                    <div class="mb-4">
                        <div>

                            <h1 class="mb-4 text-center ">Product <span class="text-primary text-uppercase">Page</span></h1>


                        </div>
                       <div className='row g-4 mb-4'>
                       { productDetails.length>0?(productDetails?.map((Product) => (
                            <div className='shadow col-lg-4 col-md-6 col-sm-12 text-center justify-content-center bg-body-tertiary rounded mb-5'>
                                <img src={Product.producticonnm} className='product-image mx-2 p-2 mt-2' alt={Product.title} />
                                <h1>{Product.title}</h1>
                               {Product.size &&<p>Size:{Product.size}</p>}

                                <p>Price: ₹{Product.price}<span className='mx-2 '><button onClick={() => addToCart(Product)} type="button" className="btn btn-success rounded-3">
                                    Add to cart
                                </button></span></p>
                                

                                <button className='btn btn-primary mb-3 w-100' onClick={()=>navigate("/cart")} >Buy now</button>
                            </div>
                        ))):(

                            <p>No Product found</p>
                        )
                    }
                       </div>


                    </div>
                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default Product;