package com.example.bazar.model;

import lombok.Data;
import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Entity
@Data
@IdClass(OrderDetailPK.class)
public class OrderDetail implements Serializable {

    @Id
    @Column(name = "order_id")
    private int orderId;

    @Id
    @Column(name = "item_id")
    private int itemId;

    @NonNull
    @Column
    private double price;

    @NonNull
    @Column
    private int quantity;

    public OrderDetail() {

    }
}
