package com.example.bazar.api;

import com.example.bazar.model.Order;
import com.example.bazar.payload.AddOrderDetailRequest;
import com.example.bazar.payload.AddOrderRequest;
import com.example.bazar.service.OrderDetailService;
import com.example.bazar.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetailService orderDetailService;

    @GetMapping("/getAllOrders")
    public List<Order> getAddressById() {
        return orderService.getAllOrders();
    }

    @PostMapping("/addOrder")
    public ResponseEntity<?> addOrder(HttpServletRequest httpServletRequest, @RequestBody AddOrderRequest addOrderRequest) {
        return orderService.addOrder(httpServletRequest, addOrderRequest);
    }

    @PostMapping("/addOrderDetail")
    public ResponseEntity<?> addOrderDetail(HttpServletRequest httpServletRequest, @RequestBody AddOrderDetailRequest addOrderDetailRequest) {
        return orderDetailService.addOrderDetail(httpServletRequest, addOrderDetailRequest);
    }
}