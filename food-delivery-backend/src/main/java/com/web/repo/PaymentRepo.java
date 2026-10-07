package com.web.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Long> {

}