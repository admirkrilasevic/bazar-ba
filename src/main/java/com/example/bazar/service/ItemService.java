package com.example.bazar.service;

import com.example.bazar.enumeration.ItemSort;
import com.example.bazar.model.Item;
import com.example.bazar.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

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

    public List<Item> getRecommendedProducts(Long categoryId, String name) {
        return itemRepository.getRecommendedProducts(categoryId, name);
    }
}
