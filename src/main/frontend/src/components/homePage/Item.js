import styles from "./Item.module.css";
import { Link } from "react-router-dom";

function Item({ id, photo, name, price }) {
    return (
      <div className = {styles.itemContainer}>
        <Link to={`/items/${id}`}>
            <img className={styles.photo} src={photo.split(",")[0]} alt="" />
        </Link>
        <Link to={`/items/${id}`} className={styles.itemLink}>
            <h3 className={styles.title}>{name}</h3>
        </Link> 
        <div className={styles.price} >
          ${price}
        </div>
        <Link to={`/items/${id}`} className={styles.viewButton}>
            View
        </Link> 
      </div>
    );
}

export default Item;