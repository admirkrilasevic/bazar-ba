package com.example.bazar.model;

import lombok.Data;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "buyer_id")
    private int buyerId;

    @NonNull
    @Column(name = "buyer_address_id")
    private int buyerAddressId;

    @NonNull
    @Column(name = "total_amount")
    private double totalAmount;

    @NonNull
    @Column
    private LocalDate date;

    @NonNull
    @Column(name = "status")
    private String status;

    @NonNull
    @Column(name = "payment_method")
    private String paymentMethod;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "item_id"
    )
    private List<Item> orderItems;

}
