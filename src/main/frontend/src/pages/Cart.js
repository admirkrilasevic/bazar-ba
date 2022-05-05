import { useSelector, useDispatch } from 'react-redux';
import { clear } from '../utils/CartSlice.js';
import styles from './Cart.module.css';
import { Container, Col, Row } from 'react-bootstrap';
import CartPageItem from '../components/cartPage/CartPageItem.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    return(
        <Container>
            <Row>
                <h3 className={styles.cartTitle}>My Cart</h3>
                <Col className={styles.itemsContainer} xs={9}>
                    {cartItems.map((item) => (
                        <CartPageItem 
                            key={item.id}
                            photo={item.photos}
                            name={item.name}
                            price={item.price}
                            selectedQuantity={item.selectedQuantity}
                        />
                    ))}
                    <button onClick={() => handleClear()} className={styles.emptyCartButton}>EMPTY CART</button>
                </Col>
                <Col className={styles.subtotalContainer}>
                    <span>
                        <span className={styles.subtotalTitle}>Subtotal: </span>
                        ${itemTotals.reduce((previous, item) => previous + item.total, 0)}
                    </span>
                    { itemTotals.length > 0 && <Link className={styles.checkoutButton} to={'/checkout'}>PROCEED TO CHECKOUT</Link> }
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
