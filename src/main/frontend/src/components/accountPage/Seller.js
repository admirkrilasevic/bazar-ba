import { useEffect, useState } from "react";
import styles from "./Seller.module.css";
import tableStyles from "./Table.module.css";
import { fetchItemsBySellerId } from "../../utils/ItemService";
import AuthService from "../../utils/AuthService";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SellerTableItem from "./SellerTableItem";

const Seller = () => {

    const [items, setItems] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userItems = await fetchItemsBySellerId(user.id);
        setItems(userItems);
    }, [items]);

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
                {items.sort((a, b) => a.name.localeCompare(b.name)).map((item) => 
                <SellerTableItem 
                    key={item.id}
                    id={item.id} 
                    name={item.name}
                    photos={item.photos}
                    price={item.price}
                    quantity={item.quantity}
                />
                )}
            </Container> :
            <div className={styles.noItemsContainer}>
                <div className={styles.title}>
                    SELL
                </div>
                <br></br>
                <br></br>
                <IconContext.Provider value={{className: "cart-icon", size: "10%"}}>
                    <FiShoppingCart/>
                </IconContext.Provider>
                You do not have any items for sale.
                <Link to="/sell" className={styles.startSellingButton}>START SELLING</Link>
            </div>}
        </div>
    );
}

export default Seller;
