import styles from "../Forms.module.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Validations from "../../utils/Validations";
import AuthService from "../../utils/AuthService";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function LoginForm() {

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        (response) => {
          setLoading(false);
          window.location.replace("/home");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (resMessage.includes("Network Error")) {
            setMessage("Network Error");
          } else if (resMessage.includes("400")) {
            setMessage("Invalid Credentials");
          } else if (resMessage.includes("401")) {
            setMessage("Invalid Credentials");
          } else {
            setMessage(resMessage);
          }
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogin} ref={form} className={styles.formContainer}>
      <div className={styles.formTitle}>
        <p>LOGIN</p>
      </div>
      <div className={styles.formSection}>
        <p>Email</p>
        <Input 
          className={styles.formInput}
          type="text"
          name="email"
          value={email}
          onChange={onChangeEmail}
          validations={[Validations.required, Validations.validEmail]}
        />
      </div>
      <div className={styles.formSection}>
        <p>Password</p>
        <Input 
          className={styles.formInput}
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          validations={[Validations.required]}
        />
      </div>
      <CheckButton className={styles.formSubmitButton} disabled={loading} ref={checkBtn}>
        {loading && (
          <span className="spinner-border spinner-border-sm"></span>
        )}
        LOGIN
      </CheckButton>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <div className={styles.registerMessage}>
        <span className={styles.formText}>Don't have an account?</span>
        <Link to={"/register"} className={styles.linkToRegister}>REGISTER</Link>
      </div>
    </Form>
  );
}

export default LoginForm;
