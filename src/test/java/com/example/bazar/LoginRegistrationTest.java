package com.example.bazar;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.stereotype.Component;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@Component
public class LoginRegistrationTest {


    void testLoginDisabled(WebDriver webDriver) throws InterruptedException {
        webDriver.get("https://bazar-ba.herokuapp.com/login");
        Thread.sleep(1000);

        WebElement email = webDriver.findElement(By.name("email"));
        WebElement password = webDriver.findElement(By.name("password"));
        email.sendKeys("bademail");
        password.sendKeys("wrongpassword");
        WebElement invalidEmailField = webDriver.findElement(By.xpath("/html/body/div/div/form/div[2]/div/div"));
        assertEquals("This is not a valid email.", invalidEmailField.getText());

        WebElement loginButton = webDriver.findElement(By.xpath("/html/body/div/div/form/button"));
        assertFalse(loginButton.isEnabled());
    }

    void testLoginUnauthorized(WebDriver webDriver) throws InterruptedException {
        webDriver.get("https://bazar-ba.herokuapp.com/login");
        Thread.sleep(1000);

        WebElement email = webDriver.findElement(By.name("email"));
        WebElement password = webDriver.findElement(By.name("password"));
        email.sendKeys("admirkrilasevic@gmail.com");
        password.sendKeys("wrongpassword");

        WebElement loginButton = webDriver.findElement(By.xpath("/html/body/div/div/form/button"));
        loginButton.click();
        Thread.sleep(2000);

        WebElement unauthorizedAlert = webDriver.findElement(By.xpath("/html/body/div/div/form/div[4]/div"));
        assertEquals("Invalid Credentials", unauthorizedAlert.getText());
    }

    void testLoginSuccessful(WebDriver webDriver) throws InterruptedException {
        webDriver.get("https://bazar-ba.herokuapp.com/login");
        Thread.sleep(1000);

        WebElement email = webDriver.findElement(By.name("email"));
        WebElement password = webDriver.findElement(By.name("password"));
        email.sendKeys("admirkrilasevic@gmail.com");
        password.sendKeys("admir");
        Thread.sleep(2000);

        WebElement loginButton = webDriver.findElement(By.xpath("/html/body/div/div/form/button"));
        loginButton.click();
        Thread.sleep(2000);
        assertEquals("https://bazar-ba.herokuapp.com/home", webDriver.getCurrentUrl());
    }

    void testLogout(WebDriver webDriver) throws InterruptedException {
        webDriver.get("https://bazar-ba.herokuapp.com/login");
        Thread.sleep(1000);

        WebElement email = webDriver.findElement(By.name("email"));
        WebElement password = webDriver.findElement(By.name("password"));
        email.sendKeys("admirkrilasevic@gmail.com");
        password.sendKeys("admir");
        Thread.sleep(2000);

        WebElement loginButton = webDriver.findElement(By.xpath("/html/body/div/div/form/button"));
        loginButton.click();
        Thread.sleep(2000);

        webDriver.get("https://bazar-ba.herokuapp.com/account/profile");
        Thread.sleep(2000);

        WebElement logoutButton = webDriver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div[1]/button"));
        logoutButton.click();
        Thread.sleep(2000);

        webDriver.get("https://bazar-ba.herokuapp.com/account/profile");
        Thread.sleep(2000);

        WebElement message = webDriver.findElement(By.xpath("/html/body/div/div/div[2]"));
        assertEquals("You are not logged in!", message.getText());
    }

}
