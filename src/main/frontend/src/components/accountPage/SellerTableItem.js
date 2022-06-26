import { deleteItem, updateItem } from "../../utils/ItemService";
import tableStyles from "./Table.module.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const SellerTableItem = ({ id, name, photos, price, quantity, items, setItems }) => {

    const [itemPrice, setItemPrice] = useState(price);
    const [itemQuantity, setItemQuantity] = useState(quantity);

    const handleUpdateItem = async () => {
        const response = await updateItem(id, itemPrice, itemQuantity);
        const updatedItems = items.map((item) => {
            if (item.id === response.id) {
                item.price = itemPrice;
                item.quantity = itemQuantity;
            }
            return item;
        });
        setItems(updatedItems);
    }

    const handleDeleteItem = async () => {
        const response = await deleteItem(id);
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    }

    return(
    <Row className={tableStyles.contentRow}>
        <Col className={tableStyles.verticalCenter}><img src={photos.split(",")[0]} className={tableStyles.tableImages}/></Col>
        <Col className={tableStyles.verticalCenter}><Link to={`/items/${id}`} className={tableStyles.nameLink}>{name}</Link></Col>
        <Col className={tableStyles.verticalCenter}><span><input className={tableStyles.input} value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}></input>&ensp; KM</span></Col>
        <Col className={tableStyles.verticalCenter}><input className={tableStyles.input} value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}></input></Col>
        <Col className={tableStyles.verticalCenter}><button className={tableStyles.tableButton} onClick={() => handleUpdateItem()}>UPDATE</button></Col>
        <Col className={tableStyles.verticalCenter}><button className={tableStyles.tableButton} onClick={() => handleDeleteItem()}>DELETE</button></Col>
    </Row>
    );
}

export default SellerTableItem;