import styles from './SearchBar.module.css';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function SearchBar() {

    const search = new URLSearchParams(useLocation().search).get("searchText");
    const [searchText, setSearchText] = useState(search ? search : "");

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
    }

    const onEnterPressed = (e) => {
        const keyPressed = e.key;
        if (keyPressed === "Enter")
            window.location.replace(`/shop/0?searchText=${searchText}`);
    }

    return(
        <div className={styles.searchContainer}>
            <input className={styles.searchBar} type="search" onChange={e => onSearchChange(e)} onKeyDown={e => onEnterPressed(e)}></input>
            <SearchIcon onClick={() => window.location.replace(`/shop/0?searchText=${searchText}`)} className={styles.searchIcon}/>
        </div>
    );
}

export default SearchBar;