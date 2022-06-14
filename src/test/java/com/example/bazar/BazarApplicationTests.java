package com.example.bazar;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BazarApplicationTests {

    @Autowired
    private LoginRegistrationTest loginRegistrationTest;

    @Test
    void testLoginDisabled() throws InterruptedException {
        loginRegistrationTest.testLoginDisabled();
    }


}
