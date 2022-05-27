package com.example.bazar.api;

import com.example.bazar.enumeration.ItemSort;
import com.example.bazar.model.Item;
import com.example.bazar.payload.AddItemRequest;
import com.example.bazar.payload.ItemUpdateRequest;
import com.example.bazar.payload.UserUpdateRequest;
import com.example.bazar.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RequestMapping("api/v1/items")
@RestController
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/search")
    public Page<Item> getItems(@RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") ItemSort sort, @RequestParam("direction") Sort.Direction direction) {
        return itemService.getItems(page, size, sort, direction);
    }

    @GetMapping("/{itemId}")
    public Item getItemById(@PathVariable("itemId") long itemId){
        return itemService.getItemById(itemId).get();
    }

    @GetMapping("/recommended/{categoryId}/{name}")
    public List<Item> getRecommendedProducts(@PathVariable("categoryId") Long categoryId, @PathVariable("name") String name) {
        return itemService.getRecommendedProducts(categoryId, name);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(HttpServletRequest httpServletRequest, @RequestBody AddItemRequest addItemRequest) {
        return itemService.addItem(httpServletRequest, addItemRequest);
    }

    @GetMapping("/filtered")
    public Page<Item> getFilteredItems(
            @RequestParam("search") String search,
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam("sort") ItemSort sort,
            @RequestParam("direction") Sort.Direction direction,
            @RequestParam("categoryIds") Long[] categoryIds,
            @RequestParam("subcategoryIds") long[] subcategoryIds,
            @RequestParam("minPrice") double minPrice,
            @RequestParam("maxPrice") double maxPrice){
        return itemService.getFilteredItems(search, page, size, sort, direction, categoryIds, subcategoryIds, minPrice, maxPrice);
    }
    @GetMapping("/suggestions/{searchText}")
    public Set<String> getSearchSuggestions(@PathVariable("searchText") String searchText){
        return itemService.getSearchSuggestions(searchText);
    }

    @GetMapping("/user/{sellerId}")
    public List<Item> getItemsBySellerId(@PathVariable("sellerId") Long sellerId){
        return itemService.getItemsBySellerId(sellerId);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateItem(@RequestBody ItemUpdateRequest itemUpdateRequest) {
        return itemService.updateItem(itemUpdateRequest);
    }

    @PutMapping("/delete/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable("itemId") Long itemId) {
        return itemService.deleteItem(itemId);
    }

}
