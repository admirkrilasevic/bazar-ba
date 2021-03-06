import CategoriesMenu from "../components/shopPage/CategoriesMenu";
import styles from "./Shop.module.css";
import ShopPageItems from "../components/shopPage/ShopPageItems";
import { useParams, useLocation } from "react-router-dom";    
import { useState, useEffect } from "react";
import PriceMenu from "../components/shopPage/PriceMenu";
import { PRICE_RANGE } from "../constants";
import PageLayout from "../components/PageLayout";
import { fetchAllCategories, getSearchSuggestions } from "../utils/ItemService";

function Shop(){

    const search = new URLSearchParams(useLocation().search).get("searchText");
    const [suggestions, setSuggestions] = useState([]);
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([parseInt(categoryId)]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [priceRange, setPriceRange] = useState({
        min: PRICE_RANGE.MIN,
        max: PRICE_RANGE.MAX
    });

    useEffect(async () => {
        setCategoriesList(await fetchAllCategories());
        const searchSuggestions = await getSearchSuggestions(search);
        setSuggestions(searchSuggestions);
    }, []);

    const isSelected = (selectedCategory) => {
		return selectedCategories.some((category) => category == selectedCategory);
	}

    const isChecked = (subcategoryId) => {
		return selectedSubcategories.some((subcategory) => subcategory.id === subcategoryId);
	}

    const onCategoryClick = (clickedCategory) => {
        if (!selectedCategories.find((category) => category == clickedCategory)) {
            if (!selectedSubcategories.find((subcategory) => subcategory.parentCategoryId == clickedCategory)){
                setSelectedCategories([...selectedCategories, clickedCategory]);
            }
        }
	}

    const onSubcategoryClick = (clickedSubcategory) => {
        if (!selectedSubcategories.find((subcategory) => subcategory == clickedSubcategory)) {
            onRemoveCategoryClick(clickedSubcategory.parentCategoryId);
            setSelectedSubcategories([...selectedSubcategories, clickedSubcategory]);
        } else {
            if (selectedSubcategories.length == 0) {
                setSelectedCategories([...selectedCategories, clickedSubcategory.parentCategoryId]);
            }
            onRemoveSubcategoryClick(clickedSubcategory);
        }
    }

    const onRemoveCategoryClick = (clickedCategory) => {
        const updatedCategories = selectedCategories.filter((category) => category != clickedCategory);
        setSelectedCategories(updatedCategories);
/*         if (updatedCategories.length == 0)
            window.location.replace("/shop/0"); */
    }

    const onRemoveSubcategoryClick = (clickedSubcategory) => {
        setSelectedSubcategories(selectedSubcategories.filter((subcategory) => subcategory != clickedSubcategory));
    }

    const onRemovePriceFilterClick = () => {
        setPriceRange({
            min: PRICE_RANGE.MIN,
            max: PRICE_RANGE.MAX
        });
    }

    const onClearAllClick = () => {
        setSelectedCategories([]);
        setSelectedSubcategories([]);
        setPriceRange({
            min: PRICE_RANGE.MIN,
            max: PRICE_RANGE.MAX
        });
        //window.location.replace("/shop/0");
    }

    return (
        <PageLayout didYouMean={suggestions}>
            <div className={styles.shopPageElementsContainer}>
                <CategoriesMenu 
                    isSelected={isSelected} 
                    isChecked={isChecked}
                    onCategoryClick={onCategoryClick} 
                    onSubcategoryClick={onSubcategoryClick}
                    categoriesList={categoriesList}
                >
                <PriceMenu
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                />
                </CategoriesMenu>
                <ShopPageItems 
                    items={items}
                    setItems={setItems}
                    selectedCategories={selectedCategories} 
                    selectedSubcategories={selectedSubcategories}
                    priceRange={priceRange}
                    categoriesList={categoriesList} 
                    onRemoveCategoryClick={onRemoveCategoryClick}
                    onRemoveSubcategoryClick={onRemoveSubcategoryClick}
                    onRemovePriceFilterClick={onRemovePriceFilterClick}
                    onClearAllClick={onClearAllClick}
                />
            </div>
        </PageLayout>
    );
}

export default Shop;
