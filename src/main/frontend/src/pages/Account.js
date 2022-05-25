import AuthService from "../utils/AuthService";
import styles from "./Account.module.css";
import {ACCOUNT_SECTIONS} from "../constants.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../components/accountPage/Profile";
import Seller from "../components/accountPage/Seller";
import Settings from "../components/accountPage/Settings";
import Orders from "../components/accountPage/Orders";

function Account(){

    const { section } = useParams();
    const [selectedSection, setSelectedSection] = useState();
    
    const displaySelection = (selection) => {
        switch (selection) {
            case ACCOUNT_SECTIONS.PROFILE :
                return <Profile />
            case ACCOUNT_SECTIONS.SELLER :
                return <Seller />
            case ACCOUNT_SECTIONS.ORDERS :
                return <Orders />
            case ACCOUNT_SECTIONS.SETTINGS :
                return <Settings />
        }
    }

    const convertToTitleCase = (string) => {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
    }

    useEffect(() => {
        setSelectedSection(convertToTitleCase(section));
    }, [section])

    const loggedIn = !!AuthService.getCurrentUser();

    return(
        loggedIn ? 
        <div>
            <div className={styles.accountContainer}>
                <div className={styles.sectionButtons}>
                    <Link to={"/account/profile"} className={(selectedSection == ACCOUNT_SECTIONS.PROFILE) ? styles.sectionButtonActive : styles.sectionButton}>{ACCOUNT_SECTIONS.PROFILE}</Link>
                    <Link to={"/account/seller"} className={(selectedSection == ACCOUNT_SECTIONS.SELLER) ? styles.sectionButtonActive : styles.sectionButton}>{ACCOUNT_SECTIONS.SELLER}</Link>
                    <Link to={"/account/orders"} className={(selectedSection == ACCOUNT_SECTIONS.ORDERS) ? styles.sectionButtonActive : styles.sectionButton}>{ACCOUNT_SECTIONS.ORDERS}</Link>
                    <Link to={"/account/settings"} className={(selectedSection == ACCOUNT_SECTIONS.SETTINGS) ? styles.sectionButtonActive : styles.sectionButton}>{ACCOUNT_SECTIONS.SETTINGS}</Link>
                    <button className={styles.logOutButton} onClick={() => AuthService.logout()}>LOG OUT</button>
                </div>
                {displaySelection(selectedSection)}
            </div>
        </div> :
        <div>
            <h3>You are not logged in!</h3>
        </div>
    );
}

export default Account;
