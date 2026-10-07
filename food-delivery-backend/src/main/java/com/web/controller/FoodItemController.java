package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.web.model.FoodItem;
import com.web.service.FoodItemService;

@RestController
@RequestMapping("/food")
@CrossOrigin
public class FoodItemController {

    @Autowired
    private FoodItemService service;

    // Add food
    @PostMapping("/add")
    public FoodItem addFood(@RequestBody FoodItem food) {
        return service.addFood(food);
    }

    // Get all food
    @GetMapping("/all")
    public List<FoodItem> getAllFood() {
        return service.getAllFood();
    }

    // Get food by ID
    @GetMapping("/{id}")
    public FoodItem getFoodById(@PathVariable Long id) {
        return service.getFoodById(id);
    }

    // Update food
    @PutMapping("/update/{id}")
    public FoodItem updateFood(
            @PathVariable Long id,
            @RequestBody FoodItem food) {

        return service.updateFood(id, food);
    }

    // Delete food
    @DeleteMapping("/delete/{id}")
    public String deleteFood(@PathVariable Long id) {

        service.deleteFood(id);

        return "Food deleted successfully";
    }
}