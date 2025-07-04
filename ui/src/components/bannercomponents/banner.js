import './banner.css';
import { useState, useEffect } from 'react';
function Banner() {
    const [bannercomponents, setbannercomponents] = useState();
    useEffect(() => {
        setInterval(() => {
            if (localStorage.getItem("role") == "admin") {
                setbannercomponents(
                    <>
                    </>
                )
            }
            else if (localStorage.getItem("role") == "user") {
                setbannercomponents(<>
                </>)
            }
            else {
                setbannercomponents(
                    <>
                        {/* Carousel Start */}
                        <div class="container-fluid p-0 mb-5">
                            <div id="header-carousel" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="w-100" src="./assets/img/carousel-1.jpg" alt="Image" />
                                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div class="p-3" style={{ "max-width": "700px" }}>
                                                <h6 class="section-title text-white text-uppercase mb-3 animated slideInDown">Refined by Design</h6>
                                                <h1 class="display-3 text-white mb-4 animated slideInDown">Discover Products</h1>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="w-100" src="./assets/img/carousel-2.jpg" alt="Image" />
                                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div class="p-3" style={{ "max-width": " 700px" }}>
                                                <h6 class="section-title text-white text-uppercase mb-3 animated slideInDown">Refined by Design</h6>
                                                <h1 class="display-3 text-white mb-4 animated slideInDown">Discover Products</h1>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="w-100" src="./assets/img/carousel-3.jpg" alt="Image" />
                                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div class="p-3" style={{ "max-width": " 700px" }}>
                                                <h6 class="section-title text-white text-uppercase mb-3 animated slideInDown">Refined by Design</h6>
                                                <h1 class="display-3 text-white mb-4 animated slideInDown">Discover Products</h1>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="w-100" src="./assets/img/carousel-4.jpg" alt="Image" />
                                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div class="p-3" style={{ "max-width": " 700px" }}>
                                                <h6 class="section-title text-white text-uppercase mb-3 animated slideInDown">Refined by Design</h6>
                                                <h1 class="display-3 text-white mb-4 animated slideInDown">Discover Products</h1>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        {/* Carousel End */}
                    </>
                )
            }
        }, 1)

    })
    return (<>
        {
            bannercomponents
        }

    </>)
}
export default Banner;