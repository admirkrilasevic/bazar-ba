package com.example.bazar.payload;

public class AddOrderDetailRequest {

    private Long orderId;
    private Long itemId;
    private double price;
    private int quantity;

    public AddOrderDetailRequest(Long orderId, Long itemId, double price, int quantity) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.price = price;
        this.quantity = quantity;
    }

    public AddOrderDetailRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
