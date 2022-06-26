package com.example.bazar;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BazarApplicationTests {

    @Autowired
    private WebDriver webDriver;

    @Autowired
    private LoginRegistrationTest loginRegistrationTest;

    @Autowired
    private ShopPageTest shopPageTest;

    @Test
    void testLoginDisabled() throws InterruptedException {
        loginRegistrationTest.testLoginDisabled(webDriver);
    }

    @Test
    void testLoginUnauthorized() throws InterruptedException {
        loginRegistrationTest.testLoginUnauthorized(webDriver);
    }

    @Test
    void testLoginSuccessful() throws InterruptedException {
        loginRegistrationTest.testLoginSuccessful(webDriver);
    }

    @Test
    void testLogout() throws InterruptedException {
        loginRegistrationTest.testLogout(webDriver);
    }

    @Test
    void testExploreMore() throws InterruptedException {
        shopPageTest.testExploreMore(webDriver);
    }

    @Test
    void testCategoryFilters() throws InterruptedException {
        shopPageTest.testCategoryFilters(webDriver);
    }

    @Test
    void testSubcategoryFilters() throws InterruptedException {
        shopPageTest.testSubcategoryFilters(webDriver);
    }

    @Test
    void testPriceFilter() throws InterruptedException {
        shopPageTest.testPriceFilter(webDriver);
    }

    @Test
    void testMultipleFiltersAndClearAll() throws InterruptedException {
        shopPageTest.testMultipleFiltersAndClearAll(webDriver);
    }

    @Test
    void testMultipleFiltersAndSorting() throws InterruptedException {
        shopPageTest.testMultipleFiltersAndSorting(webDriver);
    }

    @Test
    void testMultipleFiltersAndGridListSwitching() throws InterruptedException {
        shopPageTest.testMultipleFiltersAndGridListSwitching(webDriver);
    }


}
