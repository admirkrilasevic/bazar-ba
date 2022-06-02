import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import { ImCart as Cart } from 'react-icons/im';
import { FaUser as Account } from 'react-icons/fa';
import { ImEnter as SignIn } from 'react-icons/im';
import AuthService from '../utils/AuthService';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Header() {

    const noOfCartItems = useSelector((state) => state.cart.value);

    const loggedIn = !!AuthService.getCurrentUser();
    let user = AuthService.getCurrentUser();
    
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    useEffect(() => {
        user = AuthService.getCurrentUser();
    }, [user]);

    return(
        width >= 768 ?
        <div className={styles.header}>
            <NavLink to={"/home"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Home</NavLink>
            <NavLink to={"/shop/0"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Shop</NavLink>
            <SearchBar id={'searchBar'} />
            <NavLink to={"/cart"} className={styles.icons} activeStyle={{color: '#852400'}}>
                <Cart />
                {(noOfCartItems != 0) && <span>{noOfCartItems}</span>}
            </NavLink>
            <NavLink to={loggedIn ? "/account/profile" : "/login"} className={styles.icons} activeStyle={{color: '#852400'}}>{loggedIn ? (user.photo ? <img src={user.photo} className={styles.userImage}></img> : <Account />) : <SignIn />}</NavLink>
        </div> :
        <div className={styles.headerMobile}>
            <Container>
            <Row className={styles.headerMobileTopSection}>
                <Col><NavLink to={"/home"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Home</NavLink></Col>
                <Col><NavLink to={"/shop/0"} className={styles.headerLinks} activeStyle={{color: '#852400'}}>Shop</NavLink></Col>
                <Col><NavLink to={"/cart"} className={styles.icons} activeStyle={{color: '#852400'}}>
                    <Cart />
                    {(noOfCartItems != 0) && <span>{noOfCartItems}</span>}
                </NavLink></Col>
                <Col><NavLink to={loggedIn ? "/account/profile" : "/login"} className={styles.icons} activeStyle={{color: '#852400'}}>{loggedIn ? (user.photo ? <img src={user.photo} className={styles.userImage}></img> : <Account />) : <SignIn />}</NavLink></Col>
            </Row>
            <Row className={styles.mobileSearchBar}>
                <SearchBar id={'searchBar'} />
            </Row>
            </Container>
        </div>
    );
}

export default Header;
