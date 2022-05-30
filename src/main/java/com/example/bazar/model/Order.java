package com.example.bazar.model;

import lombok.Data;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(schema = "public")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "buyer_id")
    private Long buyerId;

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
            name = "order_id"
    )
    private List<OrderDetail> orderDetails;

    public Order() {

    }

    public Order(Long buyerId, int buyerAddressId, double totalAmount, @NonNull LocalDate date, @NonNull String status, @NonNull String paymentMethod) {
        this.buyerId = buyerId;
        this.buyerAddressId = buyerAddressId;
        this.totalAmount = totalAmount;
        this.date = date;
        this.status = status;
        this.paymentMethod = paymentMethod;
    }
}
