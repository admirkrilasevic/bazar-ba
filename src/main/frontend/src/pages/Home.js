import styles from './Home.module.css';
import {ReactComponent as ReactLogo} from './Logo.svg';
import {ReactComponent as HeroImage} from './Handmade.svg';
import InfiniteScrollComponent from '../components/homePage/InfiniteScrollComponent';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home(){
    return(
        <div>
            <div className={styles.heroSection}>
                <ReactLogo className={styles.logo} />
                <HeroImage className={styles.image}/>
            </div>
            <div className={styles.latestProductsSection}>
                <div className={styles.sectionTitle}>Latest Products</div>
                <InfiniteScrollComponent />
            </div>
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
            </div>
        </div>
    );
}

export default Home;
