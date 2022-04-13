package com.example.bazar.repository;

import com.example.bazar.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select c from Category c where c.parentCategoryId is null")
    List<Category> getCategories();
}
