import AddressSection from "../components/checkoutPage/AddressSection";
import PaymentSection from "../components/checkoutPage/PaymentSection";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, addOrderDetail } from "../utils/OrderService";
import AuthService from "../utils/AuthService";
import { setOrderId } from "../utils/CartSlice";
import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/AuthContext";

function Checkout() {

    const user = AuthService.getCurrentUser();

    const { loggedIn } = useContext(AuthContext);

    if (!loggedIn) {
        window.location.replace("/login");
    }

    const cartItems = useSelector((state) => state.cart.items);
    const selectedAddress = useSelector((state) => state.cart.addressId);
    const selectedPaymentMethod = useSelector((state) => state.cart.paymentMethod);

    const itemTotals = cartItems.map((item) => {
        return {
            id: item.id,
            total: item.price * item.selectedQuantity
        }
    });
    const total = itemTotals.reduce((previous, item) => previous + item.total, 0);

    const dispatch = useDispatch();

    const handlePlaceOrder = async () => {
        const response = await addOrder(user.token, user.id, selectedAddress, total, selectedPaymentMethod);
        dispatch(setOrderId(response));
        cartItems.forEach(async (item) => {
            const detailResponse = await addOrderDetail(user.token, response, item.id, item.price, item.selectedQuantity);
        });
    }

    return (
        <div className={styles.checkoutContainer}>
            <AddressSection />
            <PaymentSection />
            <div className={styles.totalContainer}>
                <div className={styles.total}>
                    <span>Total: </span>{total} KM
                </div>
                <Link to={"/payment"} onClick={() => handlePlaceOrder()}> PLACE ORDER </Link>
            </div>
        </div>
    );
}

export default Checkout;