import { countryCodes, SELL_PAGE_SECTIONS } from "../../constants";
import formStyles from "./SectionForms.module.css";
import { validateLocation } from "../../utils/AddItemValidations";

const LocationAndShipping = ({setCurrentSection, 
    city, setCity, 
    zipCode, setZipCode, 
    state, setState, 
    country, setCountry, 
    setMessage, setMessageStyle,
    saveItem}) => {

    const onDoneClick = () => {
        if (validateLocation(city, zipCode, state, country, setMessage, setMessageStyle)) {
            saveItem();
        }
    }

    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>SET ITEM LOCATION</p>
            </div>
            <div className={formStyles.formSection}>
                <p>City</p>
                <input className={formStyles.mediumInputField} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>
            <div className={formStyles.formSection}>
                <p>Zip Code</p>
                <input className={formStyles.mediumInputField} placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
            </div>
            <div className={formStyles.formSection}>
                <p>State</p>
                <input className={formStyles.formInput} placeholder="State" value={state} onChange={(e) => setState(e.target.value)}/>
            </div>
            <div className={formStyles.formSection}>
                <p>Country</p>
                <select className={formStyles.countrySelect} value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option disabled selected hidden>Country</option>
                    {countryCodes.map((country) => <option value={country.code}>{country.name}</option>)}
                </select>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.backButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.PRICE)}>BACK</button>
                <button className={formStyles.doneButton} onClick={() => onDoneClick()}>DONE</button>
            </div>
      </div>
    );
}

export default LocationAndShipping;
