import { useEffect, useState } from 'react';
import { getRecommendedProducts } from '../../utils/ItemService';
import Item from '../homePage/Item';
import styles from './RecommendedProducts.module.css';

function RecommendedProducts({categoryId, name}) {

    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(async () => {
        if (categoryId) {
            const recommended = await getRecommendedProducts(categoryId, name);
            setRecommendedProducts(recommended);
        }
    }, [categoryId]);

    return(
        <div>
            <div className={styles.recommendedProductsTitle}>Recommended Products</div>
            <div className={styles.recommendedProductsContainer}>
                {recommendedProducts.map((item) => {
                    return (
                            <Item 
                                key={item.id}
                                id={item.id}
                                photo={item.photos}
                                name={item.name}
                                price={item.price}
                            />
                    );
                })}
            </div>
        </div>
    );
}

export default RecommendedProducts;