package com.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Payment;
import com.web.repo.PaymentRepo;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepo repo;

    // Add payment
    public Payment addPayment(Payment payment) {
        return repo.save(payment);
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return repo.findAll();
    }

    // Get payment by ID
    public Payment getPaymentById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Update payment
    public Payment updatePayment(Long id, Payment payment) {

        Payment existing = repo.findById(id).orElse(null);

        if (existing != null) {

            existing.setOrderId(payment.getOrderId());
            existing.setAmount(payment.getAmount());
            existing.setPaymentMethod(payment.getPaymentMethod());
            existing.setPaymentStatus(payment.getPaymentStatus());

            return repo.save(existing);
        }

        return null;
    }

    // Delete payment
    public void deletePayment(Long id) {
        repo.deleteById(id);
    }
}