package com.web.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

}