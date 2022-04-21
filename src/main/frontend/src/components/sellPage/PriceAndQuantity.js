import { SELL_PAGE_SECTIONS } from "../../constants";
import formStyles from "./SectionForms.module.css";
import { validateQuantity, validatePrice } from "../../utils/AddItemValidations";

const PriceAndQuantity = ({setCurrentSection, 
    price, setPrice, 
    quantity, setQuantity,
    setMessage, setMessageStyle}) => {

    const onNextClick = () => {
        if (validatePrice(price, setMessage, setMessageStyle) && validateQuantity(quantity, setMessage, setMessageStyle)) {
            setCurrentSection(SELL_PAGE_SECTIONS.LOCATION);
        }       
    }

    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>SET PRICE AND QUANTITY</p>
            </div>
            <div className={formStyles.formSection}>
                <p>Item price</p>
                <div className={formStyles.inputWithIcon}>
                    <span>$</span>
                    <input value={price} placeholder="eg. 10.5, 5, 20.23" onChange={(e) => setPrice(e.target.value)}></input>
                </div>
            </div>
            <div className={formStyles.formSection}>
                <p>Item quantity</p>
                <div className={formStyles.inputWithIcon}>
                    <span>Q</span>
                    <input value={quantity} placeholder="eg. 1, 5, 10" onChange={(e) => setQuantity(e.target.value)}></input>
                </div>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.backButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.ITEM)}>BACK</button>
                <button className={formStyles.nextButton} onClick={() => onNextClick()}>NEXT</button>
            </div>
      </div>
    );
}

export default PriceAndQuantity;
