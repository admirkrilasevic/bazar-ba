package com.example.bazar;

import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Component
public class ShopPageTest {

    void testExploreMore(WebDriver webDriver) throws InterruptedException {
        openShopPage(webDriver);

        List<WebElement> listedItems = webDriver.findElements(By.className("Item_itemContainer__YaPqh"));
        int noOfItemsBefore = listedItems.size();

        JavascriptExecutor js = (JavascriptExecutor) webDriver;
        js.executeScript("window.scrollBy(0,500)", "");
        Thread.sleep(2000);

        WebElement exploreMoreButton = webDriver.findElement(By.className("ShopPageItems_exploreMoreButton__+xxZX"));
        exploreMoreButton.click();
        Thread.sleep(2000);

        listedItems = webDriver.findElements(By.className("Item_itemContainer__YaPqh"));
        int noOfItemsAfter = listedItems.size();

        assertTrue(noOfItemsBefore < noOfItemsAfter);
    }

    void testCategoryFilters(WebDriver webDriver) throws InterruptedException {
        openShopPage(webDriver);

        List<WebElement> categories = webDriver.findElements(By.className("Category_collapsibleCategory__B7qga"));

        WebElement currentCategory = categories.get(0);
        String categoryName = currentCategory.getText().split("\\s+")[0];
        currentCategory.click();

        WebElement categoryActiveFilter = webDriver.findElement(By.className("ActiveFilters_filter__5F9v4"));
        String categoryFilterName = categoryActiveFilter.getText().split(" ")[0];
        assertEquals(categoryName, categoryFilterName);

        currentCategory.click();
        categoryActiveFilter.click();

        assertThrows(NoSuchElementException.class,
                () -> {webDriver.findElement(By.className("ActiveFilters_allFiltersContainer__EaBrl"));});
    }

    void testSubcategoryFilters(WebDriver webDriver) throws InterruptedException {
        openShopPage(webDriver);

        WebElement category = webDriver.findElement(By.className("Category_collapsibleCategory__B7qga"));
        String categoryName = category.getText().split("\\s+")[0];
        category.click();

        List<WebElement> subcategories = webDriver.findElements(By.className("Subcategory_subcategoryItem__sJKSE"));

        WebElement currentSubcategory = subcategories.get(0);
        String subcategoryName = currentSubcategory.getText();
        WebElement currentSubcategoryCheckbox = currentSubcategory.findElement(By.tagName("input"));
        currentSubcategoryCheckbox.click();

        WebElement categoryActiveFilter = webDriver.findElement(By.className("ActiveFilters_filter__5F9v4"));
        String categoryFilterName = categoryActiveFilter.getText().split(" ")[0];
        assertEquals(categoryName + "/" + subcategoryName, categoryFilterName);

        categoryActiveFilter.click();
        assertFalse(currentSubcategoryCheckbox.isSelected());

        //assert that there are no active filters
        assertThrows(NoSuchElementException.class,
                () -> {webDriver.findElement(By.className("ActiveFilters_allFiltersContainer__EaBrl"));});
    }

    void testPriceFilter(WebDriver webDriver) throws InterruptedException {
        openShopPage(webDriver);
        selectPrices(webDriver);

        WebElement minPriceFilterInput = webDriver.findElement(By.className("PriceMenu_minPriceInput__fj4ac"));
        WebElement maxPriceFilterInput = webDriver.findElement(By.className("PriceMenu_maxPriceInput__YZvNz"));
        double minPrice = Double.parseDouble(minPriceFilterInput.getAttribute("value"));
        double maxPrice = Double.parseDouble(maxPriceFilterInput.getAttribute("value"));

        WebElement priceRange = webDriver.findElement(By.className("PriceMenu_priceRange__2NpRc"));
        String expectedPriceRange = minPrice + " KM - " + maxPrice + " KM";
        assertEquals(expectedPriceRange, priceRange.getText());

        WebElement averagePrice = webDriver.findElement(By.className("PriceMenu_priceAverage__S-WJC"));
        double avgPriceDouble = ((minPrice + maxPrice) / 2);
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        String avgPrice = "The average price is\n" + decimalFormat.format(avgPriceDouble) + " KM";
        assertEquals(avgPrice, averagePrice.getText());

        WebElement priceActiveFilter = webDriver.findElement(By.className("ActiveFilters_filter__5F9v4"));
        String priceFilterValue = priceActiveFilter.getText().substring(0, priceActiveFilter.getText().length() - 2);
        assertEquals(expectedPriceRange, priceFilterValue);

        Select sortOptions = new Select(webDriver.findElement(By.className("ShopPageItems_sortDropdown__M-dXO")));
        sortOptions.selectByVisibleText("Price: Low to High");
        Thread.sleep(2000);

        List<WebElement> listedItems = webDriver.findElements(By.className("Item_itemContainer__YaPqh"));
        WebElement priceContainerFirst = listedItems.get(0).findElement(By.className("Item_price__S1xQ8"));
        WebElement priceContainerLast = listedItems.get(listedItems.size()-1).findElement(By.className("Item_price__S1xQ8"));
        Double priceFirst = Double.parseDouble(priceContainerFirst.getText().substring(0, priceContainerFirst.getText().length() - 3));
        Double priceLast = Double.parseDouble(priceContainerLast.getText().substring(0, priceContainerLast.getText().length() - 3));

        assertTrue(priceFirst >= minPrice);
        assertTrue(priceLast <= maxPrice);
    }

    void testMultipleFiltersAndClearAll(WebDriver webDriver) throws InterruptedException {
        openShopPage(webDriver);

        List<WebElement> categories = webDriver.findElements(By.className("Category_collapsibleCategory__B7qga"));
        String categoryName1 = categories.get(0).getText().split("\\s+")[0];
        String categoryName2 = categories.get(1).getText().split("\\s+")[0];
        categories.get(0).click();
        categories.get(1).click();

        WebElement subcategory = webDriver.findElement(By.className("Subcategory_subcategoryItem__sJKSE"));
        String subcategoryName = subcategory.getText().split("\\s+")[0];
        WebElement subcategoryCheckbox = subcategory.findElement(By.tagName("input"));
        subcategoryCheckbox.click();

        List<WebElement> allActiveFilters = webDriver.findElements(By.className("ActiveFilters_filter__5F9v4"));
        String[] activeFilterNames = new String[3];
        for (int i = 0; i < allActiveFilters.size(); i++) {
            activeFilterNames[i] = allActiveFilters.get(i).getText().split(" ")[0];
        }

        String expectedCategoryFilterName = categoryName2;
        String expectedSubcategoryFilterName = categoryName1 + "/" + subcategoryName;

        assertEquals(expectedCategoryFilterName, activeFilterNames[0]);
        assertEquals(expectedSubcategoryFilterName, activeFilterNames[1]);

        WebElement clearAllButton = webDriver.findElement(By.className("ActiveFilters_clearAllButton__rH+N9"));
        clearAllButton.click();

        assertThrows(NoSuchElementException.class,
                () -> {webDriver.findElement(By.className("ActiveFilters_allFiltersContainer__EaBrl"));});
    }

    void testMultipleFiltersAndSorting(WebDriver webDriver) throws InterruptedException {
        openShopPage(webDriver);
        selectMultipleFilters(webDriver);

        Select sortOptions = new Select(webDriver.findElement(By.className("ShopPageItems_sortDropdown__M-dXO")));
        sortOptions.selectByVisibleText("Price: Low to High");
        Thread.sleep(2000);

        Double[] prices = new Double[3];
        List<WebElement> listedItems = webDriver.findElements(By.className("Item_itemContainer__YaPqh"));
        for (int i = 0; i < 3; i++) {
            WebElement item = listedItems.get(i);
            WebElement priceContainer = item.findElement(By.className("Item_price__S1xQ8"));
            prices[i] = Double.parseDouble(priceContainer.getText().substring(0, priceContainer.getText().length() - 3));
        }

        assertTrue(prices[0] <= prices[1]);
        assertTrue(prices[1] <= prices[2]);

        sortOptions.selectByVisibleText("Price: High to Low");
        Thread.sleep(2000);

        prices = new Double[3];
        listedItems = webDriver.findElements(By.className("Item_itemContainer__YaPqh"));
        for (int i = 0; i < 3; i++) {
            WebElement item = listedItems.get(i);
            WebElement startingPriceContainer = item.findElement(By.className("Item_price__S1xQ8"));
            prices[i] = Double.parseDouble(startingPriceContainer.getText().substring(0, startingPriceContainer.getText().length() - 3));
        }

        assertTrue(prices[0] >= prices[1]);
        assertTrue(prices[1] >= prices[2]);
    }

    void testMultipleFiltersAndGridListSwitching(WebDriver webDriver) throws InterruptedException {
        openShopPage(webDriver);
        selectMultipleFilters(webDriver);

        List<WebElement> listedItemsGridView = webDriver.findElements(By.className("Item_itemContainer__YaPqh"));
        WebElement firstItemGridView = listedItemsGridView.get(0);
        WebElement secondItemGridView = listedItemsGridView.get(1);
        String firstItemGridViewName = firstItemGridView.findElement(By.className("Item_title__bCbRs")).getText();
        String secondItemGridViewName = secondItemGridView.findElement(By.className("Item_title__bCbRs")).getText();

        WebElement gridViewButton = webDriver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div[2]/div/button[1]"));
        WebElement listViewButton = webDriver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[2]/div[2]/div/button[2]"));

        assertEquals("ShopPageItems_gridListButtonActive__sZGgQ", gridViewButton.getAttribute("class"));

        listViewButton.click();
        assertEquals("ShopPageItems_gridListButtonActive__sZGgQ", listViewButton.getAttribute("class"));

        List<WebElement> listedItemsListView = webDriver.findElements(By.className("ListItem_itemContainer__oxnR9"));
        WebElement firstItemListView = listedItemsListView.get(0);
        WebElement secondItemListView = listedItemsListView.get(1);
        String firstItemListViewName = firstItemListView.findElement(By.className("ListItem_title__1DCg3")).getText();
        String secondItemListViewName = secondItemListView.findElement(By.className("ListItem_title__1DCg3")).getText();

        assertEquals(firstItemGridViewName, firstItemListViewName);
        assertEquals(secondItemGridViewName, secondItemListViewName);

        WebElement description = firstItemListView.findElement(By.className("ListItem_description__eyRMH"));
        WebElement viewButton = firstItemListView.findElement(By.className("ListItem_viewButton__V-dLA"));

        assertTrue(description.isDisplayed());
        assertTrue(viewButton.isDisplayed());
    }

    void selectMultipleFilters(WebDriver webDriver) throws InterruptedException {
        List<WebElement> categories = webDriver.findElements(By.className("Category_collapsibleCategory__B7qga"));
        categories.get(0).click();
        categories.get(1).click();

        WebElement subcategory = webDriver.findElement(By.className("Subcategory_subcategoryItem__sJKSE"));
        WebElement subcategoryCheckbox = subcategory.findElement(By.tagName("input"));
        subcategoryCheckbox.click();

        JavascriptExecutor js = (JavascriptExecutor) webDriver;
        js.executeScript("window.scrollBy(0,300)", "");
        Thread.sleep(2000);

        selectPrices(webDriver);
        js.executeScript("window.scrollBy(0,-300)", "");
        Thread.sleep(2000);
    }

    void selectPrices(WebDriver webDriver) {
        WebElement minPriceSlider = webDriver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[2]/span/span[3]"));
        Actions moveMinSlider = new Actions(webDriver);
        moveMinSlider
                .moveToElement(minPriceSlider)
                .clickAndHold(minPriceSlider)
                .moveByOffset(10, 0)
                .release().perform();

        WebElement maxPriceSlider = webDriver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/div[2]/span/span[4]"));
        Actions moveMaxSlider = new Actions(webDriver);
        moveMaxSlider
                .moveToElement(maxPriceSlider)
                .clickAndHold(maxPriceSlider)
                .moveByOffset(-150, 0)
                .release().perform();
    }

    void openShopPage(WebDriver webDriver) throws InterruptedException {
        webDriver.get("https://bazar-ba.herokuapp.com/shop/0");
        Thread.sleep(2000);
    }
}
