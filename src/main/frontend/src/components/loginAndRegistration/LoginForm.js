import styles from "./Forms.module.css"
import AuthService from "../../utils/AuthService";
import { useState } from "react";
import PageLayout from "../PageLayout";

function LoginForm() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [message, setMessage] = useState();
  const [messageStyle, setMessageStyle] = useState();
  
  const handleLogin = (e) => {
    AuthService.login(email, password).then(
      (response) => {
        window.location.replace("/home");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setMessageStyle(styles.headerMessageSuccess);
        window.scrollTo(0,0);
      }
    );
  };

  return (
    <PageLayout message={message} messageStyle={messageStyle}>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>
          <p>LOGIN</p>
        </div>
        <div className={styles.formSection}>
          <p>Email</p>
          <input className={styles.formInput} value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className={styles.formSection}>
          <p>Password</p>
          <input className={styles.formInput} value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.formSubmitButton} onClick={() => handleLogin()}>LOGIN</button>
        </div>
      </div>
    </PageLayout>
  );
}

export default LoginForm;
