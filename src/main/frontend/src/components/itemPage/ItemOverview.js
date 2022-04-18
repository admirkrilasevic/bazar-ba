import { Container, Col, Row } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import PageLayout from '../PageLayout';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import AuthService from '../../utils/AuthService';
import RecommendedProducts from './RecommendedProducts';
import { incrementByAmount } from '../../utils/CartSlice.js';
import { useDispatch } from 'react-redux';
import { calculateTimeInterval } from '../../utils/TimeInterval';
import { QuantityPicker } from 'react-qty-picker';

function ItemOverview({...item}) {

    const { id, name, description, price, categoryId, subcategoryId, photos, quantity, sellerId, dateAdded } = item;
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const { token, loggedIn } = useContext(AuthContext);

    const dispatch = useDispatch();

    const imagesArray =  photos ? photos.split(",") : [];
    const [currentImage, setCurrentImage] = useState(imagesArray[0]);

    const user = AuthService.getCurrentUser();

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
                        <h3 className={styles.name}>{name}</h3>
                        <p className={styles.date}>Added {calculateTimeInterval(dateAdded)} ago</p>
                        <p className={styles.description}>{description}</p>
                        <div className={styles.quantityContainer}>
                            <p className={styles.price}>{price} KM</p>
                            <QuantityPicker min={1} max={quantity} value={selectedQuantity} onChange={(value) => setSelectedQuantity(value)} />
                        </div>
                        <p className={styles.quantity}>{quantity} remaining</p>
                        <div className={styles.addToCart}>
                            <button onClick={() => dispatch(incrementByAmount(selectedQuantity))}>Add to Cart</button>
                        </div>
                    </Col>
                </Row>
                {loggedIn && (sellerId === (user && user.id)) && <div>List of orders placed for this item</div>}
                {(sellerId !== (user && user.id)) && <RecommendedProducts categoryId={categoryId} name={name} />}
            </Container>
        </PageLayout>
    );
  }
  
  export default ItemOverview;
