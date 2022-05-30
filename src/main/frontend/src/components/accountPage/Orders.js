import { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import tableStyles from "./Table.module.css";
import AuthService from "../../utils/AuthService";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchOrdersByBuyerId } from "../../utils/OrderService";

const Orders = () => {

    const [orders, setOrders] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userOrders = await fetchOrdersByBuyerId(user.token, user.id);
        setOrders(userOrders);
        console.log(userOrders)
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
                {orders.sort((a, b) => a.id - b.id).map((order) =>
                <Row className={tableStyles.contentRow} key={order.id}>
                    <Col className={tableStyles.verticalCenter}>#{order.id}</Col>
                    <Col className={tableStyles.verticalCenter}>{order.orderDetails.map((orderDetail) => orderDetail.itemName).join(", ")}</Col>
                    <Col className={tableStyles.verticalCenter}>{order.orderDetails.map((orderDetail) => orderDetail.quantity).reduce((a, b) => a + b)}</Col>
                    <Col className={tableStyles.verticalCenter}>{order.orderDetails.map((orderDetail) => orderDetail.price).reduce((a, b) => a + b)} KM</Col>
                    <Col className={tableStyles.verticalCenter}>{order.orderDetails.map((orderDetail) => orderDetail.orderDate)[0]}</Col>
                    <Col className={tableStyles.statusCol}>{order.status.toUpperCase()}</Col>
                </Row>)}
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
