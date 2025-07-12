import './header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from '../authcomponents/auth';
function Header() {
    const [headercomponents, setheadercomponents] = useState();

    useEffect(() => {
        setInterval(() => {


            if (localStorage.getItem("role") == "admin") {
                setheadercomponents(
                    <>
                        {/* Header Start */}
                        <div class="container-fluid bg-dark px-0">
                            <div class="row gx-0">
                                <div class="col-lg-3 bg-dark d-none d-lg-block">
                                    <a class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                                        <h1 class="m-0 text-primary text-uppercase">Shopera</h1>
                                    </a>
                                </div>
                                <div class="col-lg-9">
                                    <div class="row gx-0 bg-white d-none d-lg-flex">
                                        <div class="col-lg-7 px-5 text-start">
                                            <div class="h-100 d-inline-flex align-items-center py-2 me-4">
                                                <i class="fa fa-envelope text-primary me-2"></i>
                                                <p class="mb-0">{localStorage.getItem('email')}</p>
                                            </div>
                                            
                                        </div>
                                        <div class="col-lg-5 px-5 text-end">
                                            <div class="d-inline-flex align-items-center py-2">
                                                <a class="me-3" ><i class="fab fa-facebook-f"></i></a>
                                                <a class="me-3" ><i class="fab fa-twitter"></i></a>
                                                <a class="me-3" ><i class="fab fa-linkedin-in"></i></a>
                                                <a class="me-3" ><i class="fab fa-instagram"></i></a>
                                                <a class="" ><i class="fab fa-youtube"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <nav class="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                                        <a class="navbar-brand d-block d-lg-none">
                                            <h1 class="m-0 text-primary text-uppercase">Shopera</h1>
                                        </a>
                                        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                            <div class="navbar-nav mr-auto py-0">
                                                <a class="nav-item nav-link active"><Link to="/admin">Adminhome</Link> </a>
                                                <a class="nav-item nav-link"><Link to="/manageuser">Manage User</Link></a>
                                                <div class="nav-item dropdown">
                                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profile setting</a>
                                                    <div class="dropdown-menu rounded-0 m-0">
                                                        <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link> </a>
                                                        <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link> </a>
                                                    </div>
                                                </div>
                                                <div class="nav-item dropdown">
                                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Manage Category</a>
                                                    <div class="dropdown-menu rounded-0 m-0">
                                                        <a class="dropdown-item"><Link to="/addcategory">Add Catagory</Link> </a>
                                                        <a class="dropdown-item"><Link to="/addsubcategory">Add Sub Catagory</Link> </a>
                                                        <a class="dropdown-item"><Link to="/addproduct">Add Product</Link> </a>
                                                    </div>

                                                </div>
                                                <a class="nav-item nav-link"><Link to="/logout">Logout</Link></a>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        {/* Header End */}

                    </>
                )
            }
            else if (localStorage.getItem("role") == "user") {
                setheadercomponents(
                    <>
                        {/* Header Start */}
                        <div class="container-fluid bg-dark px-0">
                            <div class="row gx-0">
                                <div class="col-lg-3 bg-dark d-none d-lg-block">
                                    <a class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                                        <h1 class="m-0 text-primary text-uppercase">Shopera</h1>
                                    </a>
                                </div>
                                <div class="col-lg-9">
                                    <div class="row gx-0 bg-white d-none d-lg-flex">
                                        <div class="col-lg-7 px-5 text-start">
                                            <div class="h-100 d-inline-flex align-items-center py-2 me-4">
                                                <i class="fa fa-envelope text-primary me-2"></i>
                                                <p class="mb-0">{localStorage.getItem('email')}</p>
                                            </div>
                                            
                                        </div>
                                        <div class="col-lg-5 px-5 text-end">
                                            <div class="d-inline-flex align-items-center py-2">
                                                <a class="me-3" ><i class="fab fa-facebook-f"></i></a>
                                                <a class="me-3" ><i class="fab fa-twitter"></i></a>
                                                <a class="me-3" ><i class="fab fa-linkedin-in"></i></a>
                                                <a class="me-3" ><i class="fab fa-instagram"></i></a>
                                                <a class="" ><i class="fab fa-youtube"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <nav class="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                                        <a class="navbar-brand d-block d-lg-none">
                                            <h1 class="m-0 text-primary text-uppercase">Shopera</h1>
                                        </a>
                                        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                            <div class="navbar-nav me-auto  py-0">
                                                <a class="nav-item nav-link active"><Link to="/user">Userhome</Link> </a>
                                                <a class="nav-item nav-link active"><Link to="/viewcategory">ViewCategory</Link> </a>
                                                <a class="nav-item nav-link"><Link to="/product">Product</Link></a>
                                                <div class="nav-item dropdown">
                                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Manage product</a>
                                                    <div class="dropdown-menu rounded-0 m-0">
                                                        <a class="dropdown-item"><Link to="/addproduct">Add Product</Link> </a>
                                                    </div>
                                                </div>
                                                <div class="nav-item dropdown">
                                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profile setting</a>
                                                    <div class="dropdown-menu rounded-0 m-0">
                                                        <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link> </a>
                                                        <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link> </a>
                                                    </div>
                                                </div>
                                                <a class="nav-item nav-link"><Link to="/cart">Cart</Link></a>
                                                <a class="nav-item nav-link"><Link to="/logout">Logout</Link></a>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        {/* Header End */}
                    </>
                )
            }
            else {
                setheadercomponents(
                    <>
                        {/* Header Start */}
                        <div class="container-fluid bg-dark px-0">
                            <div class="row gx-0">
                                <div class="col-lg-3 bg-dark d-none d-lg-block">
                                    <a class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                                        <h1 class="m-0 text-primary text-uppercase">Shopera</h1>
                                    </a>
                                </div>
                                <div class="col-lg-9">
                                    <div class="row gx-0 bg-white d-none d-lg-flex">
                                        <div class="col-lg-7 px-5 text-start">
                                           
                                        </div>
                                        <div class="col-lg-5 px-5 text-end">
                                            <div class="d-inline-flex align-items-center py-2">
                                                <a class="me-3" ><i class="fab fa-facebook-f"></i></a>
                                                <a class="me-3" ><i class="fab fa-twitter"></i></a>
                                                <a class="me-3" ><i class="fab fa-linkedin-in"></i></a>
                                                <a class="me-3" ><i class="fab fa-instagram"></i></a>
                                                <a class="" ><i class="fab fa-youtube"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <nav class="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                                        <a class="navbar-brand d-block d-lg-none">
                                            <h1 class="m-0 text-primary text-uppercase">Shopera</h1>
                                        </a>
                                        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                            <div class="navbar-nav mr-auto py-0">
                                                <a class="nav-item nav-link active"><Link to="/">Home</Link> </a>
                                                <a class="nav-item nav-link"><Link to="/about">About</Link></a>
                                                <a class="nav-item nav-link"><Link to="/services">Services</Link></a>

                                                <a class="nav-item nav-link"><Link to="/contact">Contact</Link></a>
                                                <a class="nav-item nav-link"><Link to="/register">Register</Link></a>
                                                
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        {/* Header End */}

                    </>
                )
            }
        }, 1)
    })

    return (<>
        <Auth />
        {
            headercomponents
        }

    </>)
}
export default Header;