import styles from './Home.module.css';
import {ReactComponent as ReactLogo} from './Logo.svg';
import {ReactComponent as HeroImage} from './Handmade.svg';
import InfiniteScrollComponent from '../components/homePage/InfiniteScrollComponent';

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
        </div>
    );
}

export default Home;
