package com.example.bazar.service;

import com.example.bazar.model.Order;
import com.example.bazar.payload.AddOrderRequest;
import com.example.bazar.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public ResponseEntity<?> addOrder(HttpServletRequest httpServletRequest, AddOrderRequest addOrderRequest) {
        Order order = new Order(
                addOrderRequest.getBuyerId(),
                addOrderRequest.getBuyerAddressId(),
                addOrderRequest.getTotalAmount(),
                LocalDate.now(),
                "created",
                addOrderRequest.getPaymentMethod()
        );
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok().body("Order with id " + savedOrder.getId() + " created successfully");
    }
}
