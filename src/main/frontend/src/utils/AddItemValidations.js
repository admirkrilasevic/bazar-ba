import styles from "./Message.module.css";

export const validateLocation = (city, zipCode, state, country, setMessage, setMessageStyle) => {
    const locationComplete = city && zipCode && state && country;

    if (!locationComplete) {
        setMessage("Please fill in all the fields");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else {
        return true;
    }
}

export const validatePrice = (price, setMessage, setMessageStyle) => {
    const validPrice = new RegExp("^\\d+\.?\\d*$");

    if (!price) {
        setMessage("Please fill in all the fields");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validPrice.test(price)){
        setMessage("Price has an invalid format, make sure to follow the given example");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else {
        setMessage();
        setMessageStyle();
        return true;
    }
}

export const validateQuantity = (quantity, setMessage, setMessageStyle) => {
    const validQuantity = new RegExp("^\\d+$");

    if (!quantity) {
        setMessage("Please fill in all the fields");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validQuantity.test(quantity)){
        setMessage("Quantity has an invalid format, make sure to follow the given example");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else {
        setMessage();
        setMessageStyle();
        return true;
    }
}

export const validateItemInfo = (name, category, subcategory, description, photos, setMessage, setMessageStyle) => {
    const validName = new RegExp("^[\\w\\s]+$");
    const validPhotos = photos && photos.length >= 3;
    const itemInfoComplete = name && category && subcategory && description && photos;

    if (!itemInfoComplete) {
        setMessage("Please fill in all the fields");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validName.test(name)){
        setMessage("Item name should not contain any special characters");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validPhotos){
        setMessage("Please add at least 3 photos");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else {
        setMessage();
        setMessageStyle();
        return true;
    }
}
