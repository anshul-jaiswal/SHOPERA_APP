import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config({path:'./.env'});




const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
});


const rozarpay_secret = process.env.RAZORPAY_KEY_SECRET;

export const createOrder = async (req, res) => {
  // console.log(req.body)
  const { amount} = req.body;

  try {
    const options = {
      amount: amount , // Razorpay works in paisa
       currency :"INR", receipt :"order_rcptid_11" 
    };

    const order = await razorpay.orders.create(options);
    // console.log("order",order)
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed", details: error });
  }
};



export const verifyPayment = async (req, res) => {
  // console.log(req.body)
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto
    .createHmac("sha256", rozarpay_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

    // console.log("hmac",hmac)
  if (hmac == razorpay_signature) {
    res.status(200).json({ msg: "Payment verified successfully" });
  } else {
    res.status(400).json({ msg: "Payment verification failed" });
  }
};