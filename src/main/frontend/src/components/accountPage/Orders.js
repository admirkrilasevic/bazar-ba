import { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import tableStyles from "./Table.module.css";
//import { fetchOrdersByUserId } from "../../utils/ItemService";
import AuthService from "../../utils/AuthService";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Orders = () => {

    const [orders, setOrders] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userOrders = [1]; //await fetchOrdersByUserId(user.id);
        setOrders(userOrders);
    }, []);

    return (
        <div className={styles.ordersContainer}>
            {(orders && orders.length > 0) ? 
            <Container className={tableStyles.table}>
                <Row className={tableStyles.headerRow}>
                    <Col>Order number</Col>
                    <Col>Item(s)</Col>
                    <Col>Total quantity</Col>
                    <Col>Total price </Col>
                    <Col>Date ordered</Col>
                    <Col>Status</Col>
                </Row>
            </Container> :
            <div className={styles.noOrdersContainer}>
                <div className={styles.title}>
                    ORDER
                </div>
                <IconContext.Provider value={{className: "cart-icon", size: "100px"}}>
                    <FiShoppingCart/>
                </IconContext.Provider>
                You do not have any placed orders.
                <Link to="/shop/0" className={styles.startShoppingButton}>START SHOPPING</Link>
            </div>}
        </div>
    );
}

export default Orders;
