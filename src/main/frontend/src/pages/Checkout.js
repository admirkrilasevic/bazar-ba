import AddressSection from "../components/checkoutPage/AddressSection";
import PaymentSection from "../components/checkoutPage/PaymentSection";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Checkout() {

    const cartItems = useSelector((state) => state.cart.items);

    const itemTotals = cartItems.map((item) => {
        return {
            id: item.id,
            total: item.price * item.selectedQuantity
        }
    });
    const total = itemTotals.reduce((previous, item) => previous + item.total, 0);

    return (
        <div className={styles.checkoutContainer}>
            <AddressSection />
            <PaymentSection />
            <div className={styles.totalContainer}>
                <div className={styles.total}>
                    <span>Total: </span>${total}
                </div>
                <Link to={"/payment"}> PLACE ORDER </Link>
            </div>
        </div>
    );
}

export default Checkout;