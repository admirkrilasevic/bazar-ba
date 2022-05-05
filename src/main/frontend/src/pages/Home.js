import styles from './Home.module.css';
import {ReactComponent as ReactLogo} from './Logo.svg';
import {ReactComponent as HeroImage} from './Handmade.svg';
import InfiniteScrollComponent from '../components/homePage/InfiniteScrollComponent';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMostPopularCategories } from '../utils/CategoryService';
import Category from '../components/homePage/Category';

function Home(){

    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        const popularCategories = await fetchMostPopularCategories();
        setCategories(popularCategories);
    }, []);

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    return(
        <div>
            {width >= 768 ?
            <div className={styles.heroSection}>
                <Row className={styles.center}>
                    <Col><ReactLogo className={styles.logo} /></Col>
                    <Col><HeroImage className={styles.image}/></Col>
                </Row>
            </div> :
            <div className={styles.heroSectionMobile}>
                <Col className={styles.center}>
                    <Row><ReactLogo className={styles.logo} /></Row>
                    <Row><HeroImage className={styles.image}/></Row>
                </Col>
            </div>}
            <div className={styles.pageSection}>
                <div className={styles.sectionTitle}>Browse by Popular Categories</div>
                <div className="container-fluid">
                    <Row>
                        {categories.map((category) => {
                            return (
                                <Col>
                                    <Category 
                                        key={category.id}
                                        id={category.id}
                                        name={category.name}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
            { width >= 768 ? 
            <div className={styles.becomeSellerSection}>
                <Row>
                    <Col className={styles.textSection}>
                        <p>Share your products with hundreds of online customers</p>
                        <Link to="/sell">Become a Seller -{'>'}</Link>
                    </Col>
                    <Col>
                        <img src='https://i.ibb.co/Zx0sCqW/Sample-image.png' alt=""></img>
                    </Col>
                </Row>
            </div> :
            <div className={styles.becomeSellerSectionMobile}>
                <Col>
                    <Row className={styles.textSection}>
                        <p>Share your products with hundreds of online customers</p>
                        <Link to="/sell" className={styles.becomeSellerButtonMobile}>Become a Seller -{'>'}</Link>
                    </Row>
                    <Row>
                        <img src='https://i.ibb.co/Zx0sCqW/Sample-image.png' alt=""></img>
                    </Row>
                </Col>
            </div>}
            <div className={styles.pageSection}>
                <div className={styles.sectionTitle}>Latest Products</div>
                <InfiniteScrollComponent />
            </div>
        </div>
    );
}

export default Home;
