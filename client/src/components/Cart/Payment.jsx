import React,{Fragment,useEffect,useRef} from 'react';
import CheckOutSteps from './CheckOutSteps';
import {useSelector,useDispatch} from 'react-redux';
import MetaData from '../layout/metadata';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EventIcon from '@material-ui/icons/Event';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    const payBtn = useRef(null);
    const {shippingInfo,cartItems} = useSelector(state=>state.cart);
    const {user} = useSelector(state=>state.user);
    // const {error} = useSelector(state=>state.newOrder);

    const paymentData = {
        amount:Math.round(orderInfo.totalPrice*100),
    }

    const submitHandler = async(e)=>{
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            
            const config = {
                headers:{
                    "content-type": "application/json",
                },
            };
            const {data} = await axios.post("/api/v1/process/payment",paymentData,config);

            const client_secret = data.client_secret;

            if(!stripe||!elements) return;

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pincode,
                            country:shippingInfo.country
                        }
                    }
                }
            });

            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    navigate("/success");
                }else{
                    alert.error("There was some issue while processing the payment.")
                }
            }

        } catch (error) {
            console.log(error);
            payBtn.current.disabled = false;
        }
    }


  return (
    <Fragment>
        <MetaData title="Payment"/>
        <CheckOutSteps activeSteps={2}/>
        <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e)=>submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className = "paymentInput"/>
            </div>
            <div>
                <VpnKeyIcon/>
                <CardCvcElement className = "paymentInput"/>
            </div>
            <div>
                <EventIcon/>
                <CardExpiryElement className = "paymentInput"/>
            </div>

            <input type="submit" value={`Pay-${orderInfo && orderInfo.totalPrice}`} ref ={payBtn} className = "paymentFormBtn"/>
        </form>
        </div>
    </Fragment>
  )
}

export default Payment