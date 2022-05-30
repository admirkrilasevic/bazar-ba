import { deleteItem, updateItem } from "../../utils/ItemService";
import tableStyles from "./Table.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const SellerTableItem = ({ id, name, photos, price, quantity }) => {

    const [itemPrice, setItemPrice] = useState(price);
    const [itemQuantity, setItemQuantity] = useState(quantity);

    return(
        <Row className={tableStyles.contentRow}>
        <Col className={tableStyles.verticalCenter}><img src={photos.split(",")[0]} className={tableStyles.tableImages}/></Col>
        <Col className={tableStyles.verticalCenter}><Link to={`/items/${id}`} className={tableStyles.nameLink}>{name}</Link></Col>
        <Col className={tableStyles.verticalCenter}><span><input className={tableStyles.input} value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}></input>&ensp; KM</span></Col>
        <Col className={tableStyles.verticalCenter}><input className={tableStyles.input} value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}></input></Col>
        <Col className={tableStyles.verticalCenter}><button className={tableStyles.tableButton} onClick={() => updateItem(id, itemPrice, itemQuantity)}>UPDATE</button></Col>
        <Col className={tableStyles.verticalCenter}><button className={tableStyles.tableButton} onClick={() => deleteItem(id)}>DELETE</button></Col>
    </Row>
    );
}

export default SellerTableItem;