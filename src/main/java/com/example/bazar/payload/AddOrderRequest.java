package com.example.bazar.payload;

public class AddOrderRequest {

    private int buyerId;
    private int buyerAddressId;
    private double totalAmount;
    private String paymentMethod;

    public AddOrderRequest(int buyerId, int buyerAddressId, double totalAmount, String paymentMethod) {
        this.buyerId = buyerId;
        this.buyerAddressId = buyerAddressId;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
    }

    public AddOrderRequest() {
    }

    public int getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(int buyerId) {
        this.buyerId = buyerId;
    }

    public int getBuyerAddressId() {
        return buyerAddressId;
    }

    public void setBuyerAddressId(int buyerAddressId) {
        this.buyerAddressId = buyerAddressId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
