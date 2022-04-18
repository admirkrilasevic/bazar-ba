import { useSelector, useDispatch } from 'react-redux';
import { clear } from '../utils/CartSlice.js';

function Cart() {

    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return(
        <div>
            <h1>Cart</h1>
            <button onClick={() => dispatch(clear())}>Empty Cart</button>
            {items}
        </div>
    );
}

export default Cart;
