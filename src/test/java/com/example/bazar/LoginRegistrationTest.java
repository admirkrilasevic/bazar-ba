package com.example.bazar;

import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@Component
public class LoginRegistrationTest {

    @Autowired
    private WebDriver webDriver;

    void testLoginDisabled() throws InterruptedException {
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

}
