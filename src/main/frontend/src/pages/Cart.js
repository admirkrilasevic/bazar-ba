import { useSelector, useDispatch } from 'react-redux';
import { clear } from '../utils/CartSlice.js';

function Cart() {

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    
    const handleClear = () => {
        dispatch(clear());
    }

    return(
        <div>
            <h1>Cart</h1>
            <button onClick={() => handleClear()}>Empty Cart</button>
            {JSON.parse(JSON.stringify(cartItems)).map((item) => (
                <div>
                    <h3>{item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.selectedQuantity}</p>
                </div>
            ))}
        </div>
    );
}

export default Cart;
