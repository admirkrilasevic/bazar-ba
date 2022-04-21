package com.example.bazar.service;

import com.example.bazar.model.Address;
import com.example.bazar.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;

    public Address getAddressById(Long id) {
        return addressRepository.findById(id).get();
    }

}
