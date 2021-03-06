import { useEffect, useState } from 'react';
import styles from './ItemOrders.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchOrderDetailsByItemId } from '../../utils/OrderService';
import AuthService from '../../utils/AuthService';

function ItemOrders({itemId}) {

    const [orderDetails, setOrderDetails] = useState([]);

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        if (itemId) {
            const details = await fetchOrderDetailsByItemId(user.token, itemId);
            setOrderDetails(details);
        }
    }, [itemId]);

    return(
        <div>
            <div className={styles.orderDetailsTitle}>Placed orders</div>
            {(orderDetails && orderDetails.length > 0 ) ? 
            <Container>
                <Row className={styles.orderDetailsContainer}>
                    <Row className={styles.tableHeader}>
                        <Col>   
                            Name
                        </Col>
                        <Col>
                            Quantity
                        </Col>
                        <Col>
                            Date Ordered
                        </Col>
                        <Col>
                            Status
                        </Col>
                    </Row>
                    {orderDetails.map((order) => {
                        return (
                            <Container className={styles.tableContent}>
                                <Row key={order.id}>
                                    <Col className={styles.tableCol}>
                                        {order.userName}
                                    </Col>
                                    <Col className={styles.tableCol}>
                                        {order.quantity}
                                    </Col>
                                    <Col className={styles.tableCol}>
                                        {order.orderDate}
                                    </Col>
                                    <Col className={styles.tableCol}>
                                        {order.status.toUpperCase()}
                                    </Col>
                                </Row>
                            </Container>
                        );
                    })}
                </Row>
            </Container> : 
            <div className={styles.noOrders}>No orders placed so far</div>}
        </div> 
    );
}

export default ItemOrders;