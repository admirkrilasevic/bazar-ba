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
              <p>2022</p>
              <p>Bazar.ba</p>
              <p><Link to="/home"><img src="https://i.ibb.co/D9YW3Kw/Logo-icon-2.png" alt="Logo" className={styles.logoIcon}></img></Link></p>
            </div>
          </Col>
          <Col>
            <div className={styles.footerColumn}>
              <p>About Us</p>
              <p>Contact</p>
              <p>Impressum</p>
            </div>
          </Col>
          <Col>
            <div className={styles.footerColumn}>
              <p>Privacy Policy</p>
              <p>Terms and Conditions</p>
              <p>Seller Guidelines</p>
            </div>
          </Col>
        </Row>
      </Container>    
    </div>
  );
}

export default Footer;
