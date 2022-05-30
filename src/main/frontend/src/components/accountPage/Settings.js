import styles from "./Settings.module.css";
import formStyles from "../Forms.module.css";
import UserService from "../../utils/UserService";
import AuthService from "../../utils/AuthService";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";

const Settings = ({setMessage, setMessageStyle}) => {

    const { setToken } = useContext(AuthContext);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const user = AuthService.getCurrentUser();

    const deactivateAccount = async () => {
        await UserService.deactivate(user.token);
        setToken(false);
        AuthService.logout();
        window.location.replace("/home");
    }

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
            return;
        }
        const response = await AuthService.changePassword(user.id, newPassword, confirmPassword, user.token);
        if (response.status === 200) {
            setMessage("Password changed successfully");
            setMessageStyle(styles.headerMessageSuccess);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                    Account
                </div>
                <div className={styles.sectionContent}>
                    Do you want to deactivate your account?
                    <button className={styles.button} onClick={() => deactivateAccount()}>DEACTIVATE</button>
                </div>
            </div>
            <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                    Password
                </div>
                <div className={styles.sectionContent}>
                    Do you want to change your password?
                    <div className={formStyles.formSection}>
                        <p>New password</p>
                        <input type="password" className={formStyles.formInput} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                    </div>
                    <div className={formStyles.formSection}>
                        <p>Confirm password</p>
                        <input type="password" className={formStyles.formInput} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>
                    <button className={styles.button} onClick={() => changePassword()}>CHANGE</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
