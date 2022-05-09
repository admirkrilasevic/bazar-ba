import { useState } from "react";
import AuthService from "../../utils/AuthService";
import styles from "./AddressSection.module.css";
import { Container, Row, Col } from "react-bootstrap";

function AddressSection() {

    const user = AuthService.getCurrentUser();

    const [addressId, setAddressId] = useState(user.address ? user.address.id : null);
    const [street, setStreet] = useState(user.address ? user.address.street : "");
    const [city, setCity] = useState(user.address ? user.address.city : "");
    const [zipCode, setZipCode] = useState(user.address ? user.address.zipCode : "");
    const [country, setCountry] = useState(user.address ? user.address.country : null);
    const [state, setState] = useState(user.address ? user.address.state : "");

    const [selectedAddress, setSelectedAddress] = useState(addressId != null ? addressId : null);
    
    return (
        <div className={styles.addressSection}>
            <div className={styles.selectAddress}>
                <p>Select shipping address:</p>
            </div>
            <div className={styles.addressContainer}>
                <Container className={styles.address}>
                    <Row className={styles.addressTitle}>
                        <p>Address 1</p>
                    </Row>
                    <Row className={styles.addressContent}>
                        <Col className={styles.selectAddressButton}>
                            <input type="radio" name="address" value={addressId} onChange={() => setSelectedAddress(addressId)} checked={selectedAddress === addressId} />
                        </Col>
                        <Col className={styles.addressLine}>
                            <p>{street}</p>
                            <p>{city}</p>
                            <p>{zipCode}</p>
                            <p>{country}</p>
                            <p>{state}</p>
                        </Col>
                    </Row>    
                </Container>
            </div>
        </div>
    );
}

export default AddressSection;
