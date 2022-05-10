package com.example.bazar.model;

import java.io.Serializable;

public class OrderDetailPK implements Serializable {

    private Long orderId;
    private Long itemId;

    public OrderDetailPK(Long orderId, Long itemId) {
        this.orderId = orderId;
        this.itemId = itemId;
    }

    public OrderDetailPK() {
    }
}
