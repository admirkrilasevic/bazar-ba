import styles from "./CartPageItem.module.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { remove } from "../../utils/CartSlice";

function CartPageItem({ id, photo, name, price, selectedQuantity }) {

  const dispatch = useDispatch();
  
  return (
    <Row className={styles.itemContainer} >
      <Col>
        <Link to={`/items/${id}`}>
          <img className={styles.photo} src={photo.split(",")[0]} alt="" />
        </Link>
      </Col>
      <Col>
        <Link to={`/items/${id}`} className={styles.itemLink}>
          <h3 className={styles.title}>{name}</h3>
        </Link> 
      </Col>
      <Col className={styles.price}>
        ${price}
      </Col>
      <Col>
        <span className={styles.quantity}>{selectedQuantity}</span>
      </Col>
      <Col>
        <span className={styles.removeButton} onClick={() => dispatch(remove(id))}>REMOVE</span>
      </Col>
    </Row>
  );
}

export default CartPageItem;