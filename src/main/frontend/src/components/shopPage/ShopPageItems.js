import { useEffect, useState } from "react";
import Item from "../homePage/Item";
import { Row, Col } from "react-bootstrap";
import { fetchFilteredItems } from '../../utils/ItemService';
import { ITEM_SORT, DIRECTION, SHOP_PAGE_ITEMS, PAGE_VALUES, VIEWS } from "../../constants";
import styles from "./ShopPageItems.module.css";
import ActiveFilters from "./ActiveFilters";
import { BsGrid3X3, BsList } from "react-icons/bs";
import ListItem from "./ListItem";
import { useLocation } from "react-router-dom";

function ShopPageItems(
  {items, 
  setItems, 
  selectedCategories, 
  selectedSubcategories, 
  priceRange, 
  categoriesList, 
  onRemoveCategoryClick, 
  onRemoveSubcategoryClick, 
  onRemovePriceFilterClick, 
  onClearAllClick}) {

  const search = new URLSearchParams(useLocation().search).get("searchText");
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(PAGE_VALUES.INITIAL);
  const [view, setView] = useState(VIEWS.GRID);
  const [sort, setSort] = useState({
    by: ITEM_SORT.ALPHABETICAL,
    direction: DIRECTION.ASCENDING
  });

  const options = [
    {
      value: {
        by: ITEM_SORT.ALPHABETICAL,
        direction: DIRECTION.ASCENDING
      },
      name: "Default Sorting",
    },
    {
      value: {
        by: ITEM_SORT.DATE,
        direction: DIRECTION.DESCENDING
      },
      name: "Added: New to Old",
    },
    {
      value: {
        by: ITEM_SORT.DATE,
        direction: DIRECTION.ASCENDING
      },
      name: "Added: Old to New",
    },
    {
      value: {
        by: ITEM_SORT.PRICE,
        direction: DIRECTION.ASCENDING
      },
      name: "Price: Low to High",
    },
    {
      value: {
        by: ITEM_SORT.PRICE,
        direction: DIRECTION.DESCENDING
      },
      name: "Price: High to Low",
    }
  ];

  const fetchItems = async (newPage) => {
    let itemsFromServer = await fetchFilteredItems(search ? search : "", newPage, SHOP_PAGE_ITEMS.PAGE_SIZE, sort.by, sort.direction, selectedCategories, selectedSubcategories.map(c => c.id), priceRange.min, priceRange.max);
    const oldItems = (newPage == PAGE_VALUES.INITIAL) ? [] : items;
    setItems([...oldItems, ...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }

  useEffect(async () => {
    fetchItems(page)
  }, [page, search]);

  useEffect(() => {
    setItems([]);
    setHasMoreItems(true);
    setPage(PAGE_VALUES.INITIAL);
    fetchItems(PAGE_VALUES.INITIAL);
  }, [selectedCategories, selectedSubcategories, priceRange, sort]);

  const fetchData = async () => {
    setPage(page+1);
  };

  const onSortSelect = (e) => {
    const newSort = e.target.value.split(",");
    setSort({
      by: newSort[0],
      direction: newSort[1]
    })
  };

  const onGridListSwitch = (newView) => {
    setView(newView);
  }

  return (
    <div className="container-fluid">
      <ActiveFilters 
        selectedCategories={selectedCategories} 
        selectedSubcategories={selectedSubcategories}
        priceRange={priceRange}
        categoriesList={categoriesList} 
        onRemoveCategoryClick={onRemoveCategoryClick}
        onRemoveSubcategoryClick={onRemoveSubcategoryClick}
        onRemovePriceFilterClick={onRemovePriceFilterClick}
        onClearAllClick={onClearAllClick}
      />
      <div className={styles.sortAndViewContainer}>
        <select className={styles.sortDropdown} onChange={onSortSelect}>
          {options.map((option) => (
            <option value={[option.value.by, option.value.direction]} key={[option.value.by, option.value.direction]}>{option.name}</option>
          ))}
        </select>
        <div className={styles.gridListSwitch}>
          <button className={(view == VIEWS.GRID) ? styles.gridListButtonActive : styles.gridListButton} onClick={() => onGridListSwitch(VIEWS.GRID)}>
            <BsGrid3X3 className={styles.reactIcons}/>&ensp;{VIEWS.GRID}
          </button>
          <button className={(view == VIEWS.LIST) ? styles.gridListButtonActive : styles.gridListButton} onClick={() => onGridListSwitch(VIEWS.LIST)}>
            <BsList className={styles.reactIcons}/>&ensp;{VIEWS.LIST}
          </button>
        </div>
      </div>
      {
        (view == VIEWS.GRID) ?
          (<Row>
            {items.map((item) => {
              return (
                <Col>
                  <Item 
                    key={item.id}
                    id={item.id}
                    photo={item.photos}
                    name={item.name}
                    price={item.price}
                  />
                </Col>
              );
            })}
          </Row>) :
          (items.map((item) => {
              return (
                <Row>
                  <ListItem 
                    key={item.id}
                    id={item.id}
                    photo={item.photos}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                  />
                </Row>
              );
          }))
      }
      {hasMoreItems && <button onClick={fetchData} className={styles.exploreMoreButton}>EXPLORE MORE</button>}
    </div>
  );
}

export default ShopPageItems;
