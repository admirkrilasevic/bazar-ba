package com.example.bazar.model;

import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NonNull
    private String name;

    @Column(name = "parent_category")
    private Long parentCategoryId;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "parent_category"
    )
    private List<Category> subcategories;

    @Formula(value="(SELECT COUNT(i.id) FROM item i WHERE i.category_id=id)")
    private int noOfItemsInCategory;

    public Category(Long id, @NonNull String name, Long parentCategoryId, List<Category> subcategories, int noOfItemsInCategory) {
        this.id = id;
        this.name = name;
        this.parentCategoryId = parentCategoryId;
        this.subcategories = subcategories;
        this.noOfItemsInCategory = noOfItemsInCategory;
    }

    public Category() {
    }
}
