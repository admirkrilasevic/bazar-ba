import styles from "./SellPage.module.css";
import { useEffect, useState } from "react";
import ItemInfo from "../components/sellPage/ItemInfo";
import { SELL_PAGE_SECTIONS } from "../constants";
import { FaCircle } from "react-icons/fa";
import PriceAndQuantity from "../components/sellPage/PriceAndQuantity";
import LocationAndShipping from "../components/sellPage/LocationAndShipping";
import { addItem } from "../utils/ItemService";
import AuthService from "../utils/AuthService";
import PageLayout from "../components/PageLayout";

function SellPage(){

    const [currentSection, setCurrentSection] = useState(SELL_PAGE_SECTIONS.ITEM);

    const user = AuthService.getCurrentUser();

    useEffect(() => {
        if (!user) {
            window.location.replace("/login");
        }
    }, [user]);

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [description, setDescription] = useState();
    const [photos, setPhotos] = useState([]);
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const currentDate = new Date();
    const [city, setCity] = useState(user && user.address ? user.address.city : null);
    const [zipCode, setZipCode] = useState(user && user.address ? user.address.zipCode : null);
    const [state, setState] = useState(user && user.address ? user.address.state : null);
    const [country, setCountry] = useState(user && user.address ? user.address.country : null);

    const [message, setMessage] = useState();
    const [messageStyle, setMessageStyle] = useState();

    const saveItem = () => {
         addItem(user.token, name, description, price, category, subcategory, photos.join(","), quantity, user.id, currentDate, 
            user.addressId ? user.addressId : null, city, zipCode, state, country)
            .then((response) => {
                setMessage(response + " successfully added");
                setMessageStyle(styles.headerMessageSuccess);
                window.scrollTo(0, 0);
            }); 
    }

    const displaySection = (selection) => {
        switch (selection) {
            case SELL_PAGE_SECTIONS.ITEM :
                return <ItemInfo 
                    setCurrentSection={setCurrentSection}
                    name={name}
                    setName={setName}
                    category={category}
                    setCategory={setCategory}
                    subcategory={subcategory}
                    setSubcategory={setSubcategory}
                    description={description}
                    setDescription={setDescription}
                    photos={photos}
                    setPhotos={setPhotos}
                    setMessage={setMessage}
                    setMessageStyle={setMessageStyle}
                />
            case SELL_PAGE_SECTIONS.PRICE :
                return <PriceAndQuantity 
                    setCurrentSection={setCurrentSection}
                    price={price}
                    setPrice={setPrice}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    setMessage={setMessage}
                    setMessageStyle={setMessageStyle}
                />
            case SELL_PAGE_SECTIONS.LOCATION :
                return <LocationAndShipping 
                    setCurrentSection={setCurrentSection}
                    city={city}
                    setCity={setCity}
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                    state={state}
                    setState={setState}
                    country={country}
                    setCountry={setCountry}
                    setMessage={setMessage}
                    setMessageStyle={setMessageStyle}
                    saveItem={saveItem}
                />
        }
    };

    return (
        <PageLayout message={message} messageStyle={messageStyle}>
            <div className={styles.sellPageContainer}>
                <div className={styles.switchContainer}>
                    <ul>
                        <li className={currentSection === SELL_PAGE_SECTIONS.ITEM ? styles.activeSection : ""}><FaCircle/></li>
                        <li className={currentSection === SELL_PAGE_SECTIONS.PRICE ? styles.activeSection : ""}><FaCircle/></li>
                        <li className={currentSection === SELL_PAGE_SECTIONS.LOCATION ? styles.activeSection : ""}><FaCircle/></li>
                    </ul>
                </div>
                {displaySection(currentSection)}
            </div>
        </PageLayout>
    );
}

export default SellPage;
