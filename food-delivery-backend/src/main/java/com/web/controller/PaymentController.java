package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.web.model.Payment;
import com.web.service.PaymentService;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService service;

    // Add payment
    @PostMapping("/add")
    public Payment addPayment(@RequestBody Payment payment) {
        return service.addPayment(payment);
    }

    // Get all payments
    @GetMapping("/all")
    public List<Payment> getAllPayments() {
        return service.getAllPayments();
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return service.getPaymentById(id);
    }

    // Update payment
    @PutMapping("/update/{id}")
    public Payment updatePayment(
            @PathVariable Long id,
            @RequestBody Payment payment) {

        return service.updatePayment(id, payment);
    }

    // Delete payment
    @DeleteMapping("/delete/{id}")
    public String deletePayment(@PathVariable Long id) {

        service.deletePayment(id);

        return "Payment deleted successfully";
    }
}