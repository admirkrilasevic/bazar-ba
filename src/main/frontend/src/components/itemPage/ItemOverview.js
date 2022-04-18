import { Container, Col, Row } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import PageLayout from '../PageLayout';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { getRecommendedProducts } from '../../utils/ItemService';
import AuthService from '../../utils/AuthService';
import Item from '../homePage/Item';

function ItemOverview({...item}) {

    const { id, name, description, price, categoryId, subcategoryId, photos, quantity, sellerId, dateAdded } = item;

    const { token, loggedIn } = useContext(AuthContext);

    const imagesArray =  photos ? photos.split(",") : [];
    const [currentImage, setCurrentImage] = useState(imagesArray[0]);

    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        if (categoryId) {
            const recommended = await getRecommendedProducts(categoryId, name);
            setRecommendedProducts(recommended);
        }
    }, [categoryId]);

    useEffect(() => {
        setCurrentImage(imagesArray[0]);
    }, [photos]);
  
    return (
        <PageLayout title={name} >
            <Container>
                <Row>
                    <Col>
                        <img className={styles.coverImage} src={currentImage}></img>
                        <div className={styles.imagesContainer}>
                            {imagesArray.map((image) => (
                                <img className={styles.optionalImage} src={image} onClick={() => setCurrentImage(image)}/>
                            ))}
                        </div>
                    </Col>
                    <Col className={styles.itemInfoContainer}>
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>Price: {price}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Seller: {sellerId}</p>
                        <p>Date Added: {dateAdded}</p>
                    </Col>
                </Row>
                {loggedIn && (sellerId === (user && user.id)) && <div>MANAGEMENT SECTION</div>}
                {(sellerId !== (user && user.id)) && recommendedProducts &&
                    <div>
                        <div className={styles.recommendedProductsTitle}>Recommended Products</div>
                        <div className={styles.recommendedProductsContainer}>
                            {console.log(recommendedProducts)}
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
                    </div>}
            </Container>
        </PageLayout>
    );
  }
  
  export default ItemOverview;
