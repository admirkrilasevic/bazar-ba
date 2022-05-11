package com.example.bazar.repository;

import com.example.bazar.model.OrderDetail;
import com.example.bazar.model.OrderDetailPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailPK> {

    List<OrderDetail> findByItemId(long itemIdInt);
}
