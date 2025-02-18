

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


import "./Common.css";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ImSpinner9 } from "react-icons/im";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ payment }) => {
  
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  const [cardError, setCardError] = useState();

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    

    if (payment?.dollars && payment?.dollars > 0) {
      getClientSecret({ price: payment?.dollars });
    }

    
  }, [payment?.dollars]);

  //get client secret

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post("/create-payment-intent", price);
    
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      
      return;
    }

 
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      
      setCardError("");
    }

    //confirm payment
    const {
      error: confirmError,
      paymentIntent,
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (confirmError) {
      
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      
      const paymentInfo = {
        ...payment,
        paymentId: payment._id,
        transactionId: paymentIntent.id,
        email: user?.email,
        date: new Date(),
        time: Date.now(),
      };
      delete paymentInfo._id;
      
      try {
        
        const res = await axiosSecure.patch(
          `/payment-success/coin-update/${user?.email}`,
          { coins: payment.coins }
        );
        
        if (res.data.modifiedCount) {
          const res1 = await axiosSecure.post("/confirm-payment", paymentInfo);
          queryClient.invalidateQueries(["data"]);
          navigate("/dashboard/payment-history");
          
        }
      } catch (error) {
       
      }
    }

    setProcessing(false);
  };

  return (
    <>
      <form className="md:ml-2 md:w-full md:pl-24" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? (
            <ImSpinner9 size={24} className="animate-spin m-auto" />
          ) : (
            `Pay ${payment.dollars}$`
          )}
        </button>
      </form>
      {cardError && <p className="text-red-500 mt-2 ml-1">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
