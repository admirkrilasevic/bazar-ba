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
            {console.log(cartItems)}
        </div>
    );
}

export default Cart;
