import { useEffect, useState } from 'react';
import { getRecommendedProducts } from '../../utils/ItemService';
import Item from '../homePage/Item';
import styles from './RecommendedProducts.module.css';
import { Container, Row, Col } from 'react-bootstrap';

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
            <Container className={"no-gutters"}>
            <Row className={styles.recommendedProductsContainer}>
                {recommendedProducts.map((item) => {
                    return (
                        <Col>
                            <Item 
                                key={item.id}
                                id={item.id}
                                photo={item.photos}
                                name={item.name}
                                price={item.price}
                            />
                        </Col>
                    );
                })}
            </Row>
            </Container>
        </div>
    );
}

export default RecommendedProducts;