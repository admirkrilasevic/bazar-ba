import AddressSection from "../components/checkoutPage/AddressSection";
import PaymentSection from "../components/checkoutPage/PaymentSection";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";

function Checkout() {
    return (
        <div className={styles.checkoutContainer}>
            <AddressSection />
            <PaymentSection />
            <div className={styles.placeOrderButton}>
                <Link to={"/payment"}> PLACE ORDER </Link>
            </div>
        </div>
    );
}

export default Checkout;