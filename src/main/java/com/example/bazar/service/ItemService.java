package com.example.bazar.service;

import com.example.bazar.enumeration.ItemSort;
import com.example.bazar.model.Address;
import com.example.bazar.model.Category;
import com.example.bazar.model.Item;
import com.example.bazar.model.User;
import com.example.bazar.payload.AddItemRequest;
import com.example.bazar.payload.ItemUpdateRequest;
import com.example.bazar.payload.UserUpdateRequest;
import com.example.bazar.repository.AddressRepository;
import com.example.bazar.repository.ItemRepository;
import com.example.bazar.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.jline.utils.Levenshtein;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserService userService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    AddressRepository addressRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

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

    private Long[] getCategoryIds() {
        Long[] categoryIds;
        List<Category> categories = categoryService.getAllCategories();
        List<Long> categoryIdList = new ArrayList<>();
        for (Category category : categories) {
            categoryIdList.add(category.getId());
        }
        categoryIds = categoryIdList.toArray(new Long[categoryIdList.size()]);
        return categoryIds;
    }

    public Page<Item> getFilteredItems(String search, int page, int size, ItemSort sort, Sort.Direction direction, Long[] categoryIds, long[] subcategoryIds, double minPrice, double maxPrice) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sort.toString()));
        if (categoryIds.length == 1 && subcategoryIds.length == 0){
            if (categoryIds[0] == 0) {
                categoryIds = getCategoryIds();
            }
        } else if (categoryIds.length == 0 && subcategoryIds.length == 0){
            categoryIds = getCategoryIds();
        }
        if (search.isBlank()) {
            return itemRepository.getFilteredItems(categoryIds, subcategoryIds, minPrice, maxPrice, pageable);
        } else {
            return itemRepository.getFilteredItemsWithSearch(search.toLowerCase(), categoryIds, subcategoryIds, minPrice, maxPrice, pageable);
        }
    }

    public Set<String> getSearchSuggestions(String searchText) {
        List<Item> allItems = getAllItems();
        Set<String> suggestions = allItems.stream()
                .map(item -> item.getName())
                .filter(names -> Arrays.stream(names.split(" "))
                        .anyMatch(name -> isSimilarName(name, searchText)))
                .limit(3)
                .collect(Collectors.toSet());
        return suggestions;
    }

    private boolean isSimilarName(String name, String searchString) {
        int distance = Levenshtein.distance(name.toLowerCase(), searchString.toLowerCase());
        return distance > 0 && distance < 2;
    }

    public List<Item> getItemsBySellerId(Long sellerId) {
        return itemRepository.getItemsBySellerId(sellerId);
    }

    public ResponseEntity<?> updateItem(ItemUpdateRequest itemUpdateRequest) {
        Item item = itemRepository.getById(itemUpdateRequest.getId());
        item.setPrice(itemUpdateRequest.getPrice());
        item.setQuantity(itemUpdateRequest.getQuantity());
        Item updatedItem = itemRepository.save(item);
        return ResponseEntity.ok().body(updatedItem);
    }
    public ResponseEntity<?> deleteItem(Long id) {
        Item item = itemRepository.getById(id);
        item.setDeleted(true);
        itemRepository.save(item);
        return ResponseEntity.ok("Item deleted");
    }

    public boolean checkForQuantity(Long id, int quantity) {
        Item item = itemRepository.getById(id);
        if (item.getQuantity() >= quantity) {
            return true;
        } else {
            return false;
        }
    }

}
