package com.example.bazar.service;

import com.example.bazar.model.Category;
import com.example.bazar.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getMostPopularCategories() {
        List<Category> categories = categoryRepository.getCategories();
        return categories.stream()
                .sorted((a,b) -> b.getNoOfItemsInCategory() - a.getNoOfItemsInCategory())
                .limit(4)
                .collect(Collectors.toList());
    }

}
