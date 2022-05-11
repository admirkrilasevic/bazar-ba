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
                                </Row>
                            </Container>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default ItemOrders;