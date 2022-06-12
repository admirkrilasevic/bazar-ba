import AddressSection from "../components/checkoutPage/AddressSection";
import PaymentSection from "../components/checkoutPage/PaymentSection";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, addOrderDetail } from "../utils/OrderService";
import AuthService from "../utils/AuthService";
import { setOrderId } from "../utils/CartSlice";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { checkForQuantity } from "../utils/ItemService";

function Checkout() {

    const user = AuthService.getCurrentUser();

    const { loggedIn } = useContext(AuthContext);

    if (!loggedIn) {
        window.location.replace("/login");
    }

    const cartItems = useSelector((state) => state.cart.items);
    const selectedAddress = useSelector((state) => state.cart.addressId);
    const selectedPaymentMethod = useSelector((state) => state.cart.paymentMethod);
    const [quantityChecks, setQuantityChecks] = useState([]);

    const itemTotals = cartItems.map((item) => {
        return {
            id: item.id,
            total: item.price * item.selectedQuantity
        }
    });
    const total = itemTotals.reduce((previous, item) => previous + item.total, 0);

    const dispatch = useDispatch();

    useEffect(() => {
        cartItems.forEach(async (item) => {
            const check = await checkForQuantity(user.token, item.id, item.selectedQuantity);
            setQuantityChecks((prev) => [...prev, check]);
        }
        );
    }, [cartItems]);

    const handlePlaceOrder = async () => {
        console.log(quantityChecks);
         if (quantityChecks.every((check) => check == true)) {
            const response = await addOrder(user.token, user.id, selectedAddress, total, selectedPaymentMethod);
            dispatch(setOrderId(response));
            cartItems.forEach(async (item) => {
                const detailResponse = await addOrderDetail(user.token, response, item.id, item.price, item.selectedQuantity);
            });
        } else {
            window.location.replace("/cart");
            alert("One or more items are out of stock");
        } 
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