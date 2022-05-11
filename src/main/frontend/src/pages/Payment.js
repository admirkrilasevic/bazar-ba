import styles from "./Payment.module.css";
import formStyles from "../components/Forms.module.css"
import AuthService from "../utils/AuthService";
import { useState } from "react";
import { validateLocation } from "../utils/AddItemValidations";
import { processPayment } from "../utils/PaymentService";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import messageStyles from "../utils/Message.module.css";
import PageLayout from "../components/PageLayout";
import { useSelector, useDispatch } from "react-redux";

function Payment() {
    
    const elements = useElements();
    const stripe = useStripe();

    const dispatch = useDispatch();
    const selectedPaymentMethod = useSelector((state) => state.cart.paymentMethod);
    const cartItems = useSelector((state) => state.cart.items);
    const selectedAddress = useSelector((state) => state.cart.addressId);
    const orderId = useSelector((state) => state.cart.orderId);


    const user = AuthService.getCurrentUser();

    const [street, setStreet] = useState(user ? user.address.street : null);
    const [city, setCity] = useState(user ? user.address.city : null);
    const [zipCode, setZipCode] = useState(user ? user.address.zipCode : null);
    const [state, setState] = useState(user ? user.address.state : null);
    const [country, setCountry] = useState(user ? user.address.country : null);
    const [name, setName] = useState(user ? user.name : null);

    const [message, setMessage] = useState();
    const [messageStyle, setMessageStyle] = useState();

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const itemTotals = cartItems.map((item) => {
        return {
            id: item.id,
            total: item.price * item.selectedQuantity
        }
    });
    const total = itemTotals.reduce((previous, item) => previous + item.total, 0);

    const onDoneClick = async () => {
        if(validateLocation(city, zipCode, state, country, setMessage, setMessageStyle) && name) {

            const cardElement = elements.getElement(CardNumberElement)

            const paymentMethodResponse = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    email: user.email,
                    name: user.name,
                    address: {
                        city: city,
                        country: country,
                        line1: street,
                        postal_code: zipCode,
                        state: state
                    }
                }
            })

            if (paymentMethodResponse) {
                const paymentResponse = await processPayment(user.token, orderId, total, paymentMethodResponse.paymentMethod.id)
                if (paymentResponse === "succeeded") {
                    setMessage("Payment successful!");
                    setMessageStyle(messageStyles.headerMessageSuccess);
                    window.scrollTo(0, 0);
                    setButtonDisabled(true);
                } else {
                    setMessage(paymentResponse);
                    setMessageStyle(messageStyles.headerMessageError);
                    window.scrollTo(0, 0);
                }
            }
        }
    }

    const onUnderstandClick = () => {
        window.location.replace("/");
    }

    return (
        <PageLayout message={message} messageStyle={messageStyle}>
            { selectedPaymentMethod === "card" ?
            <div className={formStyles.formContainer}>
                <div className={formStyles.formTitle}>
                    <p>PAYMENT</p>
                </div>
                <div className={formStyles.formSection}>
                        <p>Name on card</p>
                        <input className={formStyles.formInput} placeholder="Name on card" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={formStyles.formSection}>
                        <p>Card number</p>
                        <CardNumberElement className={styles.cardComponent}/>
                </div>
                <div className={formStyles.formSection}>
                        <p>Expiration Date</p>
                        <CardExpiryElement className={styles.cardComponent}/>
                </div>
                <div className={formStyles.formSection}>
                        <p>CVC/CV</p>
                        <CardCvcElement className={styles.cardComponent}/>
                </div>
                <div>
                    <button disabled={buttonDisabled} className={formStyles.doneButton} onClick={() => onDoneClick()}>PAY {total} KM</button>
                </div>
            </div> :
            <div>
                <div className={formStyles.formContainer}>
                    <div className={formStyles.formTitle}>
                        <p>PAYMENT</p>
                    </div>
                    <div className={formStyles.formSection}>
                        <p>You have successfully placed your order and you will pay the courier {total} KM upon delivery!</p>
                    </div>
                    <div>
                        <button className={formStyles.doneButton} onClick={() => onUnderstandClick()}>I UNDERSTAND</button>
                    </div>
                </div>
            </div>}
        </PageLayout>
    );
}

export default Payment;