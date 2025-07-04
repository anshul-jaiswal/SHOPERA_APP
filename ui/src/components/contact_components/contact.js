import './contact.css';
function Contact() {
    return (<>
        {/* About Start */}
        <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5 align-items-center">
                    <div class="col-lg mb-4">
                        <h6 class="section-title text-start text-primary text-uppercase">contact Us</h6>
                        <h1 class="mb-4  mt-3">Welcome to <span class="text-primary text-uppercase">contact</span></h1>
                        <section id="contact" class="contact-section">
                            <div class="contact-container">
                                <h2 class="contact-title">Need Help? We’re Here for You!</h2>
                                <p class="contact-subtitle">
                                    Questions about an order, product details, or returns?
                                    Reach out to our customer support team and we’ll get back to you ASAP.
                                </p>
                                <ul class="contact-details">
                                    <li>
                                        <strong>Address:</strong><br />
                                        143, Rajwada, Indore, Madhya Pradesh
                                        <span class="support-hours"> (Mon–Sat, 9am–7pm IST)</span>
                                    </li>
                                    <li>
                                        <strong>Phone:</strong><br />
                                        <a href="tel:XXX-XXX-XXX">XXX-XXX-XXX</a>
                                    </li>
                                    <li>
                                        <strong>Email:</strong><br />
                                        <a href="mailto:info@example.com">info@example.com</a>
                                    </li>
                                </ul>
                            </div>
                        </section>


                    </div>

                </div>
            </div>
        </div>
        {/* About End */}</>)
}
export default Contact;