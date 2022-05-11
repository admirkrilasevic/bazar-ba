import styles from "./Subcategory.module.css";

function Subcategory({subcategory, isChecked, onSubcategoryClick}) {

    return (
        <div className={styles.subcategoryItem}>
            <input
                className={styles.subcategoryCheckbox}
                type="checkbox"
                value={subcategory.id}
                checked={isChecked(subcategory.id)}
                onChange={() => onSubcategoryClick(subcategory)}
            />
            {subcategory.name}
        </div>
    );
}

export default Subcategory;
