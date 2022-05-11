package com.example.bazar.model;

import lombok.Data;
import org.hibernate.annotations.Formula;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

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

    @Formula(value = "(select i.name from item i where i.id = item_id)")
    private String itemName;

    @Formula(value = "(select o.date from public.order o where o.id = order_id)")
    private LocalDate orderDate;

    @Formula(value = "(select u.name from public.user u where u.id = (select o.buyer_id from public.order o where o.id = order_id))")
    private String userName;

    public OrderDetail() {

    }

    public OrderDetail(Long orderId, Long itemId, double price, int quantity) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.price = price;
        this.quantity = quantity;
    }
}
