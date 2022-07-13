import styles from "./Footer.module.css";
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Footer() {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  return (
    width >= 768 ?
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
              <p><a href="mailto:bazar.ba@gmail.com">Contact</a></p>
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
    </div> : 
    <div className={styles.mobileFooter}>
      <Container className={"no-gutters"}>
        <Col>
          <p>{new Date().getFullYear()} &ensp; © Bazar.ba</p>
          <p><Link to="/home"><img src="https://i.ibb.co/D9YW3Kw/Logo-icon-2.png" alt="Logo" className={styles.logoIcon}></img></Link></p>
          <p><Link to="/about">About Us</Link></p>
          <p><a href="mailto:bazar.ba@gmail.com">Contact</a></p>
          <p><Link to="/impressum">Impressum</Link></p>
          <p><Link to="/privacy">Privacy Policy</Link></p>
          <p><Link to="/terms">Terms and Conditions</Link></p>
          <p><Link to="/guidelines">Seller Guidelines</Link></p>
        </Col>
      </Container>    
    </div>
  );
}

export default Footer;
