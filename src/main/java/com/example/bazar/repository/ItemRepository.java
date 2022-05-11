package com.example.bazar.repository;

import com.example.bazar.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("select i from Item i")
    Page<Item> getItems(Pageable pageable);

    @Query(value = "select * from item i where i.category_id = :categoryId and i.name != :name limit 3", nativeQuery = true)
    List<Item> getRecommendedProducts(@Param("categoryId") Long categoryId, @Param("name") String name);

    @Query("select i from Item i where (i.categoryId in :categoryIds or i.subcategoryId in :subcategoryIds) and i.price between :minPrice and :maxPrice")
    Page<Item> getFilteredItems(@Param("categoryIds") Long[] categoryIds, @Param("subcategoryIds") long[] subcategoryIds, @Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice, Pageable pageable);

    @Query("select i from Item i where (i.categoryId in :categoryIds or i.subcategoryId in :subcategoryIds) and i.price between :minPrice and :maxPrice and " +
            "(lower(i.name) like %:search% or lower(i.description) like %:search%)")
    Page<Item> getFilteredItemsWithSearch(@Param("search") String search, @Param("categoryIds") Long[] categoryIds, @Param("subcategoryIds") long[] subcategoryIds, @Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice, Pageable pageable);


}
