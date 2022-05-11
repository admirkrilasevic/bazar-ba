import styles from "./PaymentSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../../utils/CartSlice";

function PaymentSection() {

    const dispatch = useDispatch();
    const selectedPaymentMethod = useSelector((state) => state.cart.paymentMethod);
    
    return (
        <div className={styles.paymentSection}>
            <div className={styles.selectPayment}>
                <p>Select payment method:</p>
            </div>
            <div className={styles.radioButton}>
                <input checked={selectedPaymentMethod === "cash"} type="radio" value="cash" name="cash" onChange={() => dispatch(setPaymentMethod("cash"))}/> &ensp; Cash on delivery
            </div>
            <div className={styles.radioButton}>
                <input checked={selectedPaymentMethod === "card"} type="radio" value="card" name="card" onChange={() => dispatch(setPaymentMethod("card"))}/> &ensp; Credit card
            </div>

            {console.log(selectedPaymentMethod)}
        </div>
    );
}

export default PaymentSection;
