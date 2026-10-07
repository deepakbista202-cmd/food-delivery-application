package com.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.FoodItem;
import com.web.repo.FoodItemRepo;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepo repo;

    // Add food
    public FoodItem addFood(FoodItem food) {
        return repo.save(food);
    }

    // Get all food
    public List<FoodItem> getAllFood() {
        return repo.findAll();
    }

    // Get food by ID
    public FoodItem getFoodById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Update food
    public FoodItem updateFood(Long id, FoodItem food) {

        FoodItem existing = repo.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(food.getName());
            existing.setCategory(food.getCategory());
            existing.setPrice(food.getPrice());
            existing.setDescription(food.getDescription());
            existing.setAvailable(food.isAvailable());

            return repo.save(existing);
        }

        return null;
    }

    // Delete food
    public void deleteFood(Long id) {
        repo.deleteById(id);
    }
}