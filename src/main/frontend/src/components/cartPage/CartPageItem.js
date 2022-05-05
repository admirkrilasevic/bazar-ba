import styles from "./CartPageItem.module.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { remove } from "../../utils/CartSlice";

function CartPageItem({ id, photo, name, price, selectedQuantity }) {

  const dispatch = useDispatch();
  
  return (
    <Container>
      <Row className={styles.itemContainer}>
        <Col xs={5}>
          <Link to={`/items/${id}`}>
            <img className={styles.photo} src={photo.split(",")[0]} alt="" />
          </Link>
        </Col>
        <Col xs={2}>
          <Link to={`/items/${id}`} className={styles.itemLink}>
            <h3 className={styles.title}>{name}</h3>
          </Link> 
        </Col>
        <Col className={styles.price} xs={2}>
          ${price}
        </Col>
        <Col xs={3}>
          Quantity:
          <span className={styles.quantity}> {selectedQuantity}</span>
          <span className={styles.removeButton} onClick={() => dispatch(remove(id))}>x</span>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPageItem;