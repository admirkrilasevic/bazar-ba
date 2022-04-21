package com.example.bazar.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private String description;

    @NotNull
    @Column
    private Double price;

    @NotNull
    @Column(name = "category_id")
    private Long categoryId;

    @NotNull
    @Column(name = "subcategory_id")
    private Long subcategoryId;

    @NotNull
    @Column
    private String photos;

    @NotNull
    @Column
    private int quantity;

    @NotNull
    @Column(name = "seller_id")
    private Long sellerId;

    @Column(name = "date_added")
    private LocalDate dateAdded;

    @NotNull
    @Column(name = "address_id")
    private Long addressId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private Address address;

    public Item(Long id, String name, String description, Double price, Long categoryId, Long subcategoryId, String photos, int quantity, Long sellerId, LocalDate dateAdded, Address address) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.photos = photos;
        this.quantity = quantity;
        this.sellerId = sellerId;
        this.dateAdded = dateAdded;
        this.address = address;
    }

    public Item(String name, String description, Double price, Long categoryId, Long subcategoryId, String photos, int quantity, Long sellerId, LocalDate dateAdded, Long addressId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.photos = photos;
        this.quantity = quantity;
        this.sellerId = sellerId;
        this.dateAdded = dateAdded;
        this.addressId = addressId;
    }

    public Item() {

    }
}
