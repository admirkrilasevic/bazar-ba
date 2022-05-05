import styles from "./CartPageItem.module.css";
import { Link } from "react-router-dom";

function CartPageItem({ id, photo, name, price, selectedQuantity }) {
    return (
      <div className={styles.itemContainer}>
        <Link to={`/items/${id}`}>
            <img className={styles.photo} src={photo.split(",")[0]} alt="" />
        </Link>
        <Link to={`/items/${id}`} className={styles.itemLink}>
            <h3 className={styles.title}>{name}</h3>
        </Link> 
        <div className={styles.price} >
          ${price}
        </div> 
        Quantity: <span className={styles.quantity}>{selectedQuantity}</span>
      </div>
    );
}

export default CartPageItem;