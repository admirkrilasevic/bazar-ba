import styles from "./Payment.module.css";
import formStyles from "../components/Forms.module.css"
import AuthService from "../utils/AuthService";
import { useState } from "react";
import { validateLocation } from "../utils/AddItemValidations";
import { processPayment } from "../utils/PaymentService";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import messageStyles from "../utils/Message.module.css";
import PageLayout from "../components/PageLayout";

function Payment() {
    
    const elements = useElements();
    const stripe = useStripe();

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
                const paymentResponse = await processPayment(user.token, 1, 1, paymentMethodResponse.paymentMethod.id)
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

    return (
        <PageLayout message={message} messageStyle={messageStyle}>
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
                    <button disabled={buttonDisabled} className={formStyles.doneButton} onClick={() => onDoneClick()}>PAY</button>
                </div>
        </div>
    </PageLayout>
    );
}

export default Payment;