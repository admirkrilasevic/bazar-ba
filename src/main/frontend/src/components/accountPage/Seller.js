import { useEffect, useState } from "react";
import styles from "./Seller.module.css";
import tableStyles from "./Table.module.css";
import { fetchItemsBySellerId } from "../../utils/ItemService";
import AuthService from "../../utils/AuthService";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Seller = () => {

    const [items, setItems] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userItems = await fetchItemsBySellerId(user.id);
        setItems(userItems);
    }, []);

    return (
        <div className={styles.sellerContainer}>
            {(items && items.length > 0) ? 
            <Container className={tableStyles.table}>
                <Row className={tableStyles.headerRow}>
                    <Col>Item</Col>
                    <Col>Name</Col>
                    <Col>Price</Col>
                    <Col>Quantity</Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                {items.map((item) => 
                <Row className={tableStyles.contentRow}>
                    <Col className={tableStyles.verticalCenter}><img src={item.photos.split(",")[0]} className={tableStyles.tableImages}/></Col>
                    <Col className={tableStyles.verticalCenter}><Link to={`/items/${item.id}`} className={tableStyles.nameLink}>{item.name}</Link></Col>
                    <Col className={tableStyles.verticalCenter}>{item.price} KM</Col>
                    <Col className={tableStyles.verticalCenter}>{item.quantity}</Col>
                    <Col className={tableStyles.verticalCenter}><button className={tableStyles.viewItemLink}>UPDATE</button></Col>
                    <Col className={tableStyles.verticalCenter}><button className={tableStyles.viewItemLink}>DELETE</button></Col>
                </Row>
                )}
            </Container> :
            <div className={styles.noItemsContainer}>
                <div className={styles.title}>
                    SELL
                </div>
                <IconContext.Provider value={{className: "cart-icon", size: "100px"}}>
                    <FiShoppingCart/>
                </IconContext.Provider>
                You do not have any items for sale.
                <Link to="/sell" className={styles.startSellingButton}>START SELLING</Link>
            </div>}
        </div>
    );
}

export default Seller;
