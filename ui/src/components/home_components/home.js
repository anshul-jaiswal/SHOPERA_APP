import './home.css'
import Banner from '../bannercomponents/banner';
import { useEffect, useState } from 'react';
import { __Productapiurl } from '../../Apiurl';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home({ product }) {

    const [productDetails, setProductDetails] = useState([]);
    const [output, setoutput] = useState('')



    useEffect(() => {
        axios.get(__Productapiurl + "fetch").then((response) => {
            setProductDetails(response.data);
            // console.log(response.data)
        }).catch((error) => {

            setoutput("Error: " + (error.response?.data?.msg || error.message));
            setTimeout(() => setoutput(""), 3000);
        });

    }, [])

    return (<>

        <Banner />

        {/* About Start */}
        <div class="container-lg py-5 mb-5">
            <div class="container">
                <div class="row align-items-center mb-4">

                    <section className="hero-section text-center py-5 bg-light">
                        <div className="container">
                            <h1 className="display-4 fw-bold">Welcome to <span className="text-primary">SHOPERA</span></h1>
                            <p className="lead">Your one-stop shop for everything you need.</p>
                            <Link to="/product" className="btn btn-primary mt-3 px-4 py-2">Explore Products</Link>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="about-section py-5">
                        <div className="container text-center">
                            <h2 className="mb-4">Why Choose <span className="text-primary">Us?</span></h2>
                            <p className="mb-4">
                                SHOPERA offers a seamless and secure online shopping experience, bringing you top-quality products and fast delivery, all under one roof.
                            </p>
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <h5>🛒 Vast Product Range</h5>
                                    <p>Explore thousands of products from trusted categories.</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>💳 Secure Payments</h5>
                                    <p>Razorpay-powered payment gateway for safe checkouts.</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>🚀 Fast Delivery</h5>
                                    <p>Quick and reliable delivery across multiple locations.</p>
                                </div>
                            </div>
                        </div>
                    </section>




                    <section className="container-lg py-5 mb-5">
                        <div className="container">
                            <h2 className="text-center mb-4">Featured Products</h2>

                            {output && <p className="text-danger text-center">{output}</p>}

                            <div className="row g-4">
                                {productDetails.length > 0 ? (
                                    productDetails.slice(0, 6).map((Product) => (
                                        <div key={Product._id} className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="shadow text-center justify-content-center bg-body-tertiary rounded p-3 h-100">
                                                <img
                                                    src={Product.producticonnm}
                                                    className="mx-2 p-2 mt-2 img-fluid"
                                                    alt={Product.title}

                                                />
                                                <h5 className="mt-3">{Product.title}</h5>
                                                {Product.size &&  
                                                    <p>Size: {Product.size}</p>
                                                }
                                                <p className="fw-bold">Price: ₹{Product.price}</p>
                                                <Link to="/product" className="btn btn-outline-primary btn-sm mt-2">View More</Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center w-100">
                                        <p className="text-muted">No products available.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
        {/* About End */}


    </>)
}
export default Home;