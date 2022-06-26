import tableStyles from "./Table.module.css";
import { Row, Col } from "react-bootstrap";
import { GoPackage } from "react-icons/go";
import { IconContext } from "react-icons";
import { updateOrderStatus } from "../../utils/OrderService";
import AuthService from "../../utils/AuthService";

const OrdersTableItem = ({ id, orderDetails, status, orders, setOrders }) => {

    const user = AuthService.getCurrentUser();

    const markAsReceived = async () => {
        const response = await updateOrderStatus(user.token, id, "received");
        const updatedOrders = orders.map((order) => {
            if (order.id === response.id) {
                order.status = "received";
            }
            return order;
        });
        setOrders(updatedOrders);
    }

    return(
    <Row className={tableStyles.contentRow} key={id}>
        <Col className={tableStyles.verticalCenter}>#{id}</Col>
        <Col className={tableStyles.verticalCenter}>{orderDetails.map((orderDetail) => orderDetail.itemName).join(", ")}</Col>
        <Col className={tableStyles.verticalCenter}>{orderDetails.map((orderDetail) => orderDetail.quantity).reduce((a, b) => a + b)}</Col>
        <Col className={tableStyles.verticalCenter}>{orderDetails.map((orderDetail) => orderDetail.price).reduce((a, b) => a + b)} KM</Col>
        <Col className={tableStyles.verticalCenter}>{orderDetails.map((orderDetail) => orderDetail.orderDate)[0]}</Col>
        <Col className={tableStyles.statusCol}>
            {status.toUpperCase()}
            {status != "received" && <IconContext.Provider value={{className: "package", size: "40px"}}>
                <GoPackage onClick={() => markAsReceived(id)}/>
            </IconContext.Provider>}
        </Col>
    </Row>
    );
}

export default OrdersTableItem;