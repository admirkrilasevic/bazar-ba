import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import { ImCart as Cart } from 'react-icons/im';
import { FaUser as Account } from 'react-icons/fa';
import { ImEnter as SignIn } from 'react-icons/im';
import AuthService from '../utils/AuthService';
import { useSelector } from 'react-redux'

function Header() {

    const noOfCartItems = useSelector((state) => state.cart.value);

    const loggedIn = !!AuthService.getCurrentUser();

    return(
        <div className={styles.header}>
            <NavLink to={"/home"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Home</NavLink>
            <NavLink to={"/shop"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Shop</NavLink>
            <SearchBar id={'searchBar'} />
            <NavLink to={"/cart"} className={styles.icons} activeStyle={{color: '#852400'}}>
                <Cart />
                {(noOfCartItems != 0) && <span>{noOfCartItems}</span>}
            </NavLink>
            <NavLink to={loggedIn ? "/account" : "/login"} className={styles.icons} activeStyle={{color: '#852400'}}>{loggedIn ? <Account /> : <SignIn />}</NavLink>
        </div>
    );
}

export default Header;
