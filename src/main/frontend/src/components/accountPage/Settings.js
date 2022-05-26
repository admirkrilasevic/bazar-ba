import styles from "./Settings.module.css";
import UserService from "../../utils/UserService";
import AuthService from "../../utils/AuthService";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const Settings = () => {

    const { setToken } = useContext(AuthContext);

    const deactivateAccount = async () => {
        const user = AuthService.getCurrentUser();
        await UserService.deactivate(user.token);
        setToken(false);
        AuthService.logout();
        window.location.replace("/home");
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                    Account
                </div>
                <div className={styles.sectionContent}>
                    Do you want to deactivate your account?
                    <button className={styles.deactivateButton} onClick={() => deactivateAccount()}>DEACTIVATE</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
