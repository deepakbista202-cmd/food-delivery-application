package com.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Order;
import com.web.repo.OrderRepo;

@Service
public class OrderService {

    @Autowired
    private OrderRepo repo;

    // Add order
    public Order addOrder(Order order) {
        return repo.save(order);
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return repo.findAll();
    }

    // Get order by ID
    public Order getOrderById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Update order
    public Order updateOrder(Long id, Order order) {

        Order existing = repo.findById(id).orElse(null);

        if (existing != null) {

            existing.setCustomerId(order.getCustomerId());
            existing.setRestaurantId(order.getRestaurantId());
            existing.setFoodId(order.getFoodId());
            existing.setQuantity(order.getQuantity());
            existing.setTotalPrice(order.getTotalPrice());
            existing.setStatus(order.getStatus());

            return repo.save(existing);
        }

        return null;
    }

    // Delete order
    public void deleteOrder(Long id) {
        repo.deleteById(id);
    }
}