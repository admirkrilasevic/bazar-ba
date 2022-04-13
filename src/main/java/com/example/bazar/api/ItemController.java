package com.example.bazar.api;

import com.example.bazar.enumeration.ItemSort;
import com.example.bazar.model.Item;
import com.example.bazar.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

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

}
