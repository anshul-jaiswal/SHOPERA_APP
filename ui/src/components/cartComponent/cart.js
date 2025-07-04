import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"
import axios from "axios";
import { __paymentapiUrl, __userApi,__RozarpayURL } from "../../Apiurl";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from 'lucide-react'
import { toast } from "react-hot-toast";


const Cartpage = () => {

    const { cartItems, increaseQuantity,
        decreaseQuantity,
        removeFromCart } = useCart();
    const [userDetils, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const [output, setoutput] = useState();

    useEffect(() => {
        if (cartItems.length === 0) {
            setoutput("🛒 Your cart is empty.")
            toast.error("🛒 Your cart is empty.");
        }
    }, [cartItems]);


    useEffect(() => {
        const email = localStorage.getItem("email");

        if (email) {
            axios.get(__userApi + `fetch?email=${email}`)
                .then((res) => {
                    if (res.data && res.data.length > 0) {
                        setUserDetails(res.data[0]);

                    }
                }).catch((error) => {
                    console.log("Error feching user", error);
                })
        }
    }, []);


    const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)


    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // 🧾 Razorpay payment function
    const handlePayment = async () => {
        const res = await loadRazorpayScript();
        if (!res) {
            toast.error("Failed to load Razorpay SDK.");
            return;
        }

        try {

            // 🔑 Fetch Razorpay Public Key from backend
            const keyResponse = await axios.get(__RozarpayURL + "get-razorpay-key");
            const razorpayKey = keyResponse.data.key;

            const orderResponse = await axios.post(__paymentapiUrl + "create-order", {
                amount: grandTotal * 100, // Razorpay expects amount in paise
            });

            const options = {
                key: razorpayKey, //  Replace with your Razorpay test key/ og key 
                amount: orderResponse.data.amount,
                currency: "INR",
                name: "Shopera",
                description: "Item Purchase",
                order_id: orderResponse.data.id,
                handler: async function (response) {
                    // console.log("🧾 Razorpay Response:", response); // DEBUG LOG

                    try {
                        const verifyRes = await axios.post(__paymentapiUrl + "verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,

                        });

                        // console.log("✅ Backend Verify Response:", verifyRes.data);

                        if (verifyRes.data.msg) {
                            toast.success("✅ Payment Verified!");
                            navigate("/Thankyou");
                        } else {
                            toast.error("❌ Payment verification failed (Invalid Signature)");
                        }
                    } catch (error) {
                        // console.error("❌ Verify Error:", error.response?.data || error.message);
                        toast.error("❌ Error verifying payment.");
                    }
                },

                prefill: {
                    name: userDetils?.name,
                    email: localStorage.getItem("email"),
                    contact: userDetils?.mobile,
                },
                theme: {
                    color: "#228B22",
                },
              
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error(err);
            toast.error("❌ Something went wrong during payment creation.");

        }
    };


    return (

        <div class="container-lg py-5 mb-4">
            <div class="container">
                <div class="row align-items-center mb-4">

                    <div class="col-lg mb-4">
                        <font>{setoutput}</font>
                        <h1 className="mb-4">Shopping <span class="text-primary text-uppercase">Cart</span></h1>

                        {
                            userDetils && userDetils.address && (
                                <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                                    <h5>Delivery Address</h5>
                                    <p>
                                        {userDetils.name},<br />
                                        {userDetils.address},<br />
                                        {userDetils.city},<br />
                                        {userDetils.mobile},<br />
                                    </p>
                                    <button className="btn btn-outline-secondary mt-2" onClick={() => navigate("/epuser")}>Change Address</button>
                                </div>)
                        }

                        {
                            cartItems.length > 0 ? (
                                <div>
                                    {cartItems.map((item) => (
                                        <div key={item._id}
                                            className="cart-item d-flex align-items-center justify-content-between p-3 shadow-sm mb-3"
                                        >
                                            <img src={`./assets/uploads/producticons/${item.producticonnm}`} alt={item.title}
                                                className="cart-image"
                                                style={{ width: "100px", height: "100px", borderRadius: "10px" }} />
                                            <div className="cart-details flex-grow-1 ms-3">
                                                <h5>{item.title}
                                                </h5>
                                                <p className="text-muted mb-1">₹{item.price}*{item.quantity}</p>
                                                <strong>Total: ₹{item.price * item.quantity}</strong>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <button className="btn tn-sm  btn-outline-primary me-2" onClick={() => decreaseQuantity(item._id)} >
                                                    <Minus />
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button className="btn btn-outline-primary me-3" onClick={() => increaseQuantity(item._id)}><Plus /></button>
                                            </div>
                                            <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item._id)}>
                                                <Trash2 />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="mt-4 p-3 bg-light rounded shadow-sm">
                                        <h4 className="text-end">
                                            Grand total : ₹{grandTotal}
                                            <center>
                                                <button className="btn btn-xl  " style={{ background: "blue", color: "white" }}
                                                    onClick={handlePayment}>Buy now</button>
                                            </center>
                                        </h4>
                                    </div>

                                </div>
                            ) : (<h1 className="text-muted">Your Cart is empty.</h1>)
                        }



                    </div>
                </div>
            </div>
        </div>
    )


}

export default Cartpage;