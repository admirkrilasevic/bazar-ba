package com.example.bazar.service;

import com.example.bazar.enumeration.ItemSort;
import com.example.bazar.model.Address;
import com.example.bazar.model.Item;
import com.example.bazar.model.User;
import com.example.bazar.payload.AddItemRequest;
import com.example.bazar.repository.AddressRepository;
import com.example.bazar.repository.ItemRepository;
import com.example.bazar.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserService userService;

    @Autowired
    AddressRepository addressRepository;


    public Page<Item> getItems(int page, int size, ItemSort sort, Sort.Direction direction) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        return itemRepository.getItems(pageable);
    }

    public Optional<Item> getItemById(long id) {
        Optional<Item> optional = itemRepository.findById(id);
        if (optional.isPresent()){
            return optional;
        } else {
            throw new NoSuchElementException("No such item exists");
        }
    }

    public ResponseEntity<?> addItem(HttpServletRequest httpServletRequest, AddItemRequest addItemRequest) {
        String token = jwtUtils.getToken(httpServletRequest);
        User user = (User) userService.loadUserByEmail(jwtUtils.getEmailFromJwtToken(token));
        Long addressId;
        if (addItemRequest.getAddressId() == null) {
            Address address = new Address(user.getId(), null, addItemRequest.getCity(),
                    addItemRequest.getZipCode(), addItemRequest.getState(), addItemRequest.getCountry());
            Address savedAddress = addressRepository.save(address);
            addressId = savedAddress.getId();
        } else {
            addressId = addItemRequest.getAddressId();
        }
        Item item = new Item(
                addItemRequest.getName(),
                addItemRequest.getDescription(),
                addItemRequest.getPrice(),
                addItemRequest.getCategoryId(),
                addItemRequest.getSubcategoryId(),
                addItemRequest.getPhotos(),
                addItemRequest.getQuantity(),
                user.getId(),
                LocalDate.now(),
                addressId);
        Item savedItem = itemRepository.save(item);
        return ResponseEntity.ok().body(savedItem.getName());
    }

    public List<Item> getRecommendedProducts(Long categoryId, String name) {
        return itemRepository.getRecommendedProducts(categoryId, name);
    }
}
