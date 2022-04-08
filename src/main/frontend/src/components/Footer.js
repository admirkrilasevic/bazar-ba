import styles from "./Footer.module.css";
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.footer}>
      <Container className={"no-gutters"}>
        <Row className={styles.footerContent}>
          <Col>
            <div className={styles.footerColumn}>
              <p>{new Date().getFullYear()}</p>
              <p>© Bazar.ba</p>
              <p><Link to="/home"><img src="https://i.ibb.co/D9YW3Kw/Logo-icon-2.png" alt="Logo" className={styles.logoIcon}></img></Link></p>
            </div>
          </Col>
          <Col>
            <div className={styles.footerColumn}>
              <p><Link to="/about">About Us</Link></p>
              <p><Link to="/contact">Contact</Link></p>
              <p><Link to="/impressum">Impressum</Link></p>
            </div>
          </Col>
          <Col>
            <div className={styles.footerColumn}>
              <p><Link to="/privacy">Privacy Policy</Link></p>
              <p><Link to="/terms">Terms and Conditions</Link></p>
              <p><Link to="/guidelines">Seller Guidelines</Link></p>
            </div>
          </Col>
        </Row>
      </Container>    
    </div>
  );
}

export default Footer;
