package com.example.bazar.api;

import com.example.bazar.model.Address;
import com.example.bazar.model.Category;
import com.example.bazar.service.AddressService;
import com.example.bazar.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/addresses")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping("/{addressId}")
    public Address getAddressById(@PathVariable("addressId") long addressId) {
        return addressService.getAddressById(addressId);
    }
}
