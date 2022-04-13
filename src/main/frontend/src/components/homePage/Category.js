import styles from "./Category.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as CategoryIcon } from "./CategoryIcon.svg";

function Category({ id, name }) {
    return (
      <div className = {styles.categoryContainer}>
        <Link to={`/shop/${id}`}>
            <CategoryIcon />
        </Link>
        <Link to={`/shop/${id}`} className={styles.categoryLink}>
            <h3 className={styles.title}>{name}</h3>
        </Link> 
        <Link to={`/shop/${id}`} className={styles.viewButton}>
            View
        </Link> 
      </div>
    );
}

export default Category;