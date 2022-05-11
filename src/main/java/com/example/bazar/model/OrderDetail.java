package com.example.bazar.model;

import lombok.Data;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@IdClass(OrderDetailPK.class)
@Table(name = "orderdetail", schema = "public")
public class OrderDetail implements Serializable {

    @Id
    @Column(name = "order_id")
    private Long orderId;

    @Id
    @Column(name = "item_id")
    private Long itemId;

    @NonNull
    @Column
    private double price;

    @NonNull
    @Column
    private int quantity;

    public OrderDetail() {

    }

    public OrderDetail(Long orderId, Long itemId, double price, int quantity) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.price = price;
        this.quantity = quantity;
    }
}
