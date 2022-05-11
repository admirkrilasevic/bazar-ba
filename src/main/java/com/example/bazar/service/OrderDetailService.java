package com.example.bazar.service;

import com.example.bazar.model.Order;
import com.example.bazar.model.OrderDetail;
import com.example.bazar.payload.AddOrderDetailRequest;
import com.example.bazar.payload.AddOrderRequest;
import com.example.bazar.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    public ResponseEntity<?> addOrderDetail(HttpServletRequest httpServletRequest, AddOrderDetailRequest addOrderDetailRequest) {
        OrderDetail orderDetail = new OrderDetail(
                addOrderDetailRequest.getOrderId(),
                addOrderDetailRequest.getItemId(),
                addOrderDetailRequest.getPrice(),
                addOrderDetailRequest.getQuantity()
        );
        OrderDetail savedOrderDetail = orderDetailRepository.save(orderDetail);
        return ResponseEntity.ok().body("Order: " + savedOrderDetail.getOrderId() + " Item: " + savedOrderDetail.getItemId());
    }
}
