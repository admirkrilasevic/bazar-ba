import { useState } from "react";
import styles from "./PaymentSection.module.css";

function PaymentSection() {

    const [paymentMethod, setPaymentMethod] = useState("card");
    
    return (
        <div className={styles.paymentSection}>
            <div className={styles.selectPayment}>
                <p>Select payment method:</p>
            </div>
            <div className={styles.radioButton}>
                <input checked={paymentMethod === "paypal"} type="radio" value="paypal" name="paypal" onChange={() => setPaymentMethod("paypal")}/> &ensp; PayPal
            </div>
            <div className={styles.radioButton}>
                <input checked={paymentMethod === "card"} type="radio" value="card" name="card" onChange={() => setPaymentMethod("card")}/> &ensp; Credit Card
            </div>
        </div>
    );
}

export default PaymentSection;
