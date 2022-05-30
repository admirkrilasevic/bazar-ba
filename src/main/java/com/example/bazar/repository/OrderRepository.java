package com.example.bazar.repository;

import com.example.bazar.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o where o.buyerId = :buyerId")
    List<Order> getOrdersByBuyerId(@Param("buyerId") Long buyerId);
}
