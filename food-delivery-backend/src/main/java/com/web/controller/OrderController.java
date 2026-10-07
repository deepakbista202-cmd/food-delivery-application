package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.web.model.Order;
import com.web.service.OrderService;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService service;

    // Add order
    @PostMapping("/add")
    public Order addOrder(@RequestBody Order order) {
        return service.addOrder(order);
    }

    // Get all orders
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    // Get order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return service.getOrderById(id);
    }

    // Update order
    @PutMapping("/update/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order order) {

        return service.updateOrder(id, order);
    }

    // Delete order
    @DeleteMapping("/delete/{id}")
    public String deleteOrder(@PathVariable Long id) {

        service.deleteOrder(id);

        return "Order deleted successfully";
    }
}