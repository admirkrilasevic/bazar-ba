import styles from './Home.module.css';
import {ReactComponent as ReactLogo} from './Logo.svg';
import {ReactComponent as HeroImage} from './Handmade.svg';

function Home(){
    return(
        <div>
            <div className={styles.heroSection}>
                <ReactLogo className={styles.logo} />
                <HeroImage className={styles.image}/>
            </div>
        </div>
    );
}

export default Home;
