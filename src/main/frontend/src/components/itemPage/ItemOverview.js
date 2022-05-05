import { Container, Col, Row } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import PageLayout from '../PageLayout';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import AuthService from '../../utils/AuthService';
import RecommendedProducts from './RecommendedProducts';
import { incrementByAmount, addItem, updateQuantity } from '../../utils/CartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTimeInterval } from '../../utils/TimeInterval';
import { QuantityPicker } from 'react-qty-picker';
import { fetchAddressById } from '../../utils/AddressService';

function ItemOverview({...item}) {

    const { id, name, description, price, categoryId, subcategoryId, photos, quantity, sellerId, dateAdded, addressId } = item;
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [tempQuantity, setTempQuantity] = useState(quantity && quantity); // used to temporarily store quantity when user is adding item to cart
    const [address, setAddress] = useState();

    const { loggedIn } = useContext(AuthContext);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const imagesArray =  photos ? photos.split(",") : [];
    const [currentImage, setCurrentImage] = useState(imagesArray[0]);

    const user = AuthService.getCurrentUser();

    useEffect(() => {
        setCurrentImage(imagesArray[0]);
    }, [photos]);

    useEffect(async () => {
        const addressFromServer = await fetchAddressById(addressId);
        setAddress(addressFromServer);
    }, [addressId]);

    useEffect(() => {
        setTempQuantity(quantity);
    }, [quantity]);

    const handleAddToCart = (selectedQuantity) => {
        dispatch(incrementByAmount(selectedQuantity));
        item.selectedQuantity = selectedQuantity;
        if (cartItems.map(cartItem => cartItem.id).includes(item.id)) {
            const index = cartItems.map(cartItem => cartItem.id).indexOf(item.id);
            const payload = {
                index: index,
                value: selectedQuantity
            }
            dispatch(updateQuantity(payload));
        } else {
            dispatch(addItem(item));
        }
        setTempQuantity(tempQuantity - selectedQuantity);
        window.scrollTo(0, 0);
    }

    return (
        <PageLayout title={name}>
            <Container className={"no-gutters"}>
            <Row className={styles.container}>
                <Col>
                    <img className={styles.coverImage} src={currentImage} alt=""></img>
                    <div className={styles.imagesContainer}>
                        {imagesArray.map((image) => (
                            <img className={styles.optionalImage} src={image} onClick={() => setCurrentImage(image)} alt=""/>
                        ))}
                    </div>
                </Col>
                <Col className={styles.itemInfoContainer}>
                    <h3 className={styles.name}>{name}</h3>
                    <span className={styles.date}>Added {calculateTimeInterval(dateAdded)} ago</span>
                    <p className={styles.location}>Located in {address && address.city}</p>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.quantityContainer}>
                        <p className={styles.price}>{price} KM</p>
                        <QuantityPicker min={0} max={tempQuantity} value={selectedQuantity} onChange={(value) => setSelectedQuantity(value)} />
                    </div>
                    <p className={styles.quantity}>{tempQuantity} remaining</p>
                    <div className={styles.addToCart}>
                        <button onClick={() => handleAddToCart(selectedQuantity)}>ADD TO CART</button>
                    </div>
                </Col>
            </Row>
            </Container>
            {loggedIn && (sellerId === (user && user.id)) && <div>List of orders placed for this item</div>}
            {(sellerId !== (user && user.id)) && <RecommendedProducts categoryId={categoryId} name={name} />}
        </PageLayout>
    );
  }
  
  export default ItemOverview;
