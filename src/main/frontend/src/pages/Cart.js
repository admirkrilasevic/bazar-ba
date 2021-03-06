import { useSelector, useDispatch } from 'react-redux';
import { clear } from '../utils/CartSlice.js';
import styles from './Cart.module.css';
import { Container, Col, Row } from 'react-bootstrap';
import CartPageItem from '../components/cartPage/CartPageItem.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/AuthService.js';

function Cart() {

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    
    const handleClear = () => {
        dispatch(clear());
    }

    const [itemTotals, setItemTotals] = useState([]);

    useEffect(() => {
        const itemTotals = cartItems.map((item) => {
            return {
                id: item.id,
                total: item.price * item.selectedQuantity
            }
        });
        setItemTotals(itemTotals);
    }, [cartItems]);

    const loggedIn = !!AuthService.getCurrentUser();

    return(
        cartItems.length > 0 ?
        <Container className={"no-gutters"}>
            <Row className={styles.itemsContainer}>
                <Container className={"no-gutters"}>
                    <Row className={styles.tableTitles}>
                        <Col>
                            Image
                        </Col>
                        <Col>
                            Name
                        </Col>
                        <Col className={styles.price}>
                            Price
                        </Col>
                        <Col> 
                            Quantity
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
                {cartItems.map((item) => (
                    <CartPageItem 
                        key={item.id}
                        id={item.id}
                        photo={item.photos}
                        name={item.name}
                        price={item.price}
                        selectedQuantity={item.selectedQuantity}
                    />
                ))}
                <button onClick={() => handleClear()} className={styles.emptyCartButton}>EMPTY CART</button>
            </Row>
            <Row className={styles.subtotalContainer}>
                <span>
                    <span className={styles.subtotalTitle}>Subtotal: </span>
                    {itemTotals.reduce((previous, item) => previous + item.total, 0)} KM
                </span>
                { itemTotals.length > 0 && <Link className={styles.checkoutButton} to={loggedIn ? '/checkout' : '/login'}>PROCEED TO CHECKOUT</Link> }
            </Row>
        </Container> :
        <Row>
            <span className={styles.emptyCart}>The cart is currently empty</span>
        </Row>
    );
}

export default Cart;
