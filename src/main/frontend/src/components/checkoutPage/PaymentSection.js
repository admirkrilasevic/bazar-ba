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
                <input checked={paymentMethod === "cash"} type="radio" value="cash" name="cash" onChange={() => setPaymentMethod("paypal")}/> &ensp; Cash on delivery
            </div>
            <div className={styles.radioButton}>
                <input checked={paymentMethod === "card"} type="radio" value="card" name="card" onChange={() => setPaymentMethod("card")}/> &ensp; Credit card
            </div>
        </div>
    );
}

export default PaymentSection;
