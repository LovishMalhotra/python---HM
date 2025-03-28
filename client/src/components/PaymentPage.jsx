import React from "react";
import "../css/pricing.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");

  // Updated checkoutHandler now takes planName in addition to amount.
  const checkoutHandler = async ({ amount, planName }) => {
    try {
      // Get the Razorpay API key from your backend
      const {
        data: { key },
      } = await axios.get("/payment/getKey");
      
      // Send both amount and plan to backend for validation and order creation
      const {
        data: { order },
      } = await axios.post("https://server-snowy-psi-47.vercel.app/payment/checkout", { amount, plan: planName });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "IMhometutor",
        description: "Home tuition website",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_method: "post",
        callback_url: "https://localhost:8080/payment/paymentVerification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
          // Optionally include plan in notes if needed
          plan: planName,
        },
        theme: {
          color: "#121212",
        },
        handler: async function (response) {
          // Extract response data
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          try {
            // Send payment verification data along with the selected plan to backend
            const res = await axios.post("https://server-snowy-psi-47.vercel.app/payment/paymentVerification", {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              plan: planName,
            });
            if (res.data.success) {
              // Redirect on success; you may include jobId in the redirection if needed
              navigate(`/findJob`);
            } else {
              alert("Payment verification failed, please try again.");
            }
          } catch (error) {
            console.error("Verification failed:", error);
            alert("Payment verification failed, please try again.");
          }
        },
      };

      var razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-3">
        <div className="header d-flex flex-column align-items-center">
          <h2>Pricing Plan</h2>
          <p className="text-muted fw-normal">Choose the best plan that suits your needs</p>
        </div>

        <div className="row">
          {/* Basic Plan */}
          <div className="col-md-6 col-lg-3 pricing-card card m-5 rounded">
            <h3>Basic</h3>
            <div>
              <span className="color-brand-2 fw-bold">₹299</span>
              <span className="text-muted m-2">for 2 months</span>
            </div>
            <span className="align-self-center fs-4 color-brand-2 fw-bold">4 Tuition Leads</span>
            <hr />
            <ul className="list-pricing p-0 mb-5">
              <li className="feature text-muted">No Commission from tuition fees</li>
              <li className="feature text-muted">Contact parents directly</li>
              <li className="feature text-muted">Phone/Whatsapp/Mail Support</li>
            </ul>
            <button
              className="btn btn-primary pt-2 pb-2"
              onClick={() => checkoutHandler({ amount: 299, planName: "basic" })}
            >
              Choose Plan
            </button>
          </div>

          {/* Standard Plan */}
          <div className="col-md-6 col-lg-3 pricing-card m-5 card rounded">
            <h3>Standard</h3>
            <div>
              <span className="color-brand-2 fw-bold">₹499</span>
              <span className="text-muted m-2">for 4 months</span>
            </div>
            <span className="align-self-center fs-4 color-brand-2 fw-bold">8 Tuition Leads</span>
            <hr />
            <ul className="list-pricing p-0 mb-5">
              <li className="feature text-muted">No Commission from tuition fees</li>
              <li className="feature text-muted">Contact parents directly</li>
              <li className="feature text-muted">Phone/Whatsapp/Mail Support</li>
            </ul>
            <button
              className="btn btn-primary pt-2 pb-2"
              onClick={() => checkoutHandler({ amount: 499, planName: "standard" })}
            >
              Choose Plan
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="col-md-6 col-lg-3 pricing-card m-5 card rounded">
            <h3>Enterprise</h3>
            <div>
              <span className="color-brand-2 fw-bold">₹999</span>
              <span className="text-muted m-2">for 6 months</span>
            </div>
            <span className="align-self-center fs-4 color-brand-2 fw-bold">20 Tuition Leads</span>
            <hr />
            <ul className="list-pricing p-0 mb-5">
              <li className="feature text-muted">No Commission from tuition fees</li>
              <li className="feature text-muted">Contact parents directly</li>
              <li className="feature text-muted">Phone/Whatsapp/Mail Support</li>
            </ul>
            <button
              className="btn btn-primary pt-2 pb-2"
              onClick={() => checkoutHandler({ amount: 999, planName: "enterprise" })}
            >
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
