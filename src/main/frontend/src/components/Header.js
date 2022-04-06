import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import { BsCart4 as Cart } from 'react-icons/bs';
import { FaUser as Account } from 'react-icons/fa';

function Header() {
    return(
        <div className={styles.header}>
            <NavLink to={"/home"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Home</NavLink>
            <NavLink to={"/shop"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Shop</NavLink>
            <SearchBar />
            <NavLink to={"/cart"} className={styles.headerLinks} activeStyle={{color: '#852400'}}><Cart className={styles.icons}/></NavLink>
            <NavLink to={"/account"} className={styles.headerLinks} activeStyle={{color: '#852400'}}><Account className={styles.icons}/></NavLink>
        </div>
    );
}

export default Header;
